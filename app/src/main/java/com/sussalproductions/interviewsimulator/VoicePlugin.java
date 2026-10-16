package com.sussalproductions.interviewsimulator;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import java.util.ArrayList;

/**
 * Speech to text with Android's SpeechRecognizer (the phone's speech service, usually Google).
 * One start() = one recognition session that ends with one final result. The JavaScript voice
 * manager (src/services/voice.js) decides if another session starts, so restarts, the noise gate
 * and duplicate checks live in one tested place.
 *
 *  - Language: EXTRA_LANGUAGE and EXTRA_LANGUAGE_PREFERENCE from the Voice accent setting.
 *    Language detection is off, so the service never switches to Urdu or Hindi on its own.
 *  - Pauses: complete silence 2000 ms, possibly complete 1500 ms, minimum length 2000 ms.
 *    Many recognizers (Google's included) may ignore these; the session length is in the logs.
 *  - Hints: on Android 13+ the profile name and a few tech words are passed with
 *    EXTRA_BIASING_STRINGS.
 *  - Loudness: the highest onRmsChanged level of the session is reported in "end" (maxRms), so
 *    JavaScript can drop text the service invented from silence or noise.
 *  - No beeps: music, notification and system sounds are muted while the mic is on and restored
 *    when the session ends.
 *
 * Events: ready, speech, speechEnd, partial {matches}, final {matches, scores}, level {db},
 * end {reason: done | nomatch | error | stopped, code, ms, maxRms}.
 * No audio is recorded or stored by the app. Only text comes back.
 */
@CapacitorPlugin(name = "Voice", permissions = { @Permission(strings = { Manifest.permission.RECORD_AUDIO }, alias = "microphone") })
public class VoicePlugin extends Plugin {

    private static final int ERR_CLIENT = 5;
    private static final int ERR_SPEECH_TIMEOUT = 6;
    private static final int ERR_NO_MATCH = 7;
    private static final int MAX_HINTS = 100;

    private final Handler main = new Handler(Looper.getMainLooper());
    private SpeechRecognizer rec;
    private int run = 0; // grows with every start(); stale callbacks are ignored
    private boolean active = false;
    private boolean stopping = false;
    private long runStartedAt = 0;
    private long lastLevelAt = 0;
    private float maxRms = -100f;
    private String language = "en-IN";
    private int maxResults = 5;
    private int completeMs = 4000;
    private int possiblyMs = 3000;
    private int minimumMs = 15000;
    private ArrayList<String> bias = new ArrayList<>();
    private final ArrayList<Integer> mutedStreams = new ArrayList<>();
    private static final int[] BEEP_STREAMS = { AudioManager.STREAM_MUSIC, AudioManager.STREAM_NOTIFICATION, AudioManager.STREAM_SYSTEM };

    @PluginMethod
    public void info(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("sdk", Build.VERSION.SDK_INT);
        ret.put("available", SpeechRecognizer.isRecognitionAvailable(getContext()));
        call.resolve(ret);
    }

    /** Opens this app's page in Android Settings (to allow the microphone after "Don't allow"). */
    @PluginMethod
    public void openSettings(PluginCall call) {
        try {
            Intent i = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package", getContext().getPackageName(), null));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
            call.resolve();
        } catch (Exception e) {
            call.reject("settings-unavailable");
        }
    }

    @PluginMethod
    public void start(PluginCall call) {
        language = call.getString("language", "en-IN");
        maxResults = Math.max(1, Math.min(5, call.getInt("maxResults", 5)));
        completeMs = call.getInt("completeMs", 4000);
        possiblyMs = call.getInt("possiblyMs", 3000);
        minimumMs = call.getInt("minimumMs", 15000);
        bias = new ArrayList<>();
        JSArray b = call.getArray("bias", new JSArray());
        try {
            for (int i = 0; i < b.length() && bias.size() < MAX_HINTS; i++) {
                String s = b.getString(i);
                if (s != null && !s.trim().isEmpty() && s.length() <= 40) bias.add(s.trim());
            }
        } catch (Exception ignored) {
            // bad hint list: listen without it
        }
        getActivity()
            .runOnUiThread(() -> {
                if (!SpeechRecognizer.isRecognitionAvailable(getContext())) {
                    call.reject("unavailable");
                    return;
                }
                destroyRecognizer();
                run++;
                active = true;
                stopping = false;
                maxRms = -100f;
                muteBeeps();
                rec = SpeechRecognizer.createSpeechRecognizer(getContext());
                rec.setRecognitionListener(new Listener(run));
                runStartedAt = System.currentTimeMillis();
                try {
                    rec.startListening(buildIntent());
                } catch (Exception e) {
                    main.post(() -> end(run, "error", ERR_CLIENT));
                }
                JSObject ret = new JSObject();
                ret.put("sdk", Build.VERSION.SDK_INT);
                ret.put("biasing", Build.VERSION.SDK_INT >= 33 && !bias.isEmpty());
                ret.put("hints", Build.VERSION.SDK_INT >= 33 ? bias.size() : 0);
                ret.put("language", language);
                call.resolve(ret);
            });
    }

    /** Stop listening; the recognizer still sends the final result for what was already said. */
    @PluginMethod
    public void stop(PluginCall call) {
        final int my = run;
        getActivity()
            .runOnUiThread(() -> {
                stopping = true;
                if (rec != null) {
                    try {
                        rec.stopListening();
                    } catch (Exception ignored) {
                        // already stopped
                    }
                }
                // Some recognizers never answer after stopListening(): end the session anyway.
                main.postDelayed(() -> end(my, "stopped", 0), 1500);
                call.resolve();
            });
    }

    /** Stop now and drop anything not yet delivered. */
    @PluginMethod
    public void cancel(PluginCall call) {
        final int my = run;
        getActivity()
            .runOnUiThread(() -> {
                stopping = true;
                end(my, "stopped", 0);
                call.resolve();
            });
    }

    @Override
    protected void handleOnPause() {
        // App in background: stop listening and give the sound back right away.
        if (rec != null) {
            stopping = true;
            end(run, "stopped", 0);
        }
        unmuteBeeps();
    }

    @Override
    protected void handleOnDestroy() {
        main.removeCallbacksAndMessages(null);
        destroyRecognizer();
        unmuteBeeps();
    }

    private void muteBeeps() {
        if (!mutedStreams.isEmpty()) return;
        try {
            AudioManager am = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
            if (am == null) return;
            for (int st : BEEP_STREAMS) {
                try {
                    if (!am.isStreamMute(st)) {
                        am.adjustStreamVolume(st, AudioManager.ADJUST_MUTE, 0);
                        mutedStreams.add(st);
                    }
                } catch (Exception ignored) {
                    // Do Not Disturb or a device rule: leave this stream alone
                }
            }
        } catch (Exception ignored) {
            // no audio service: beeps stay audible
        }
    }

    private void unmuteBeeps() {
        if (mutedStreams.isEmpty()) return;
        try {
            AudioManager am = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
            if (am != null) {
                for (int st : mutedStreams) {
                    try {
                        am.adjustStreamVolume(st, AudioManager.ADJUST_UNMUTE, 0);
                    } catch (Exception ignored) {
                        // keep going with the other streams
                    }
                }
            }
        } catch (Exception ignored) {
            // nothing to restore
        }
        mutedStreams.clear();
    }

    private Intent buildIntent() {
        Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, language);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, language);
        i.putExtra(RecognizerIntent.EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE, false);
        i.putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, false);
        i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, maxResults);
        i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        i.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, getContext().getPackageName());
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, completeMs);
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, possiblyMs);
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS, minimumMs);
        if (Build.VERSION.SDK_INT >= 33 && !bias.isEmpty()) {
            i.putStringArrayListExtra(RecognizerIntent.EXTRA_BIASING_STRINGS, bias);
        }
        if (Build.VERSION.SDK_INT >= 34) {
            i.putExtra(RecognizerIntent.EXTRA_ENABLE_LANGUAGE_DETECTION, false);
        }
        return i;
    }

    private void end(int my, String reason, int code) {
        if (my != run || rec == null) return;
        active = false;
        destroyRecognizer();
        // The JS manager may start the next session at once; keep the sound muted over that gap.
        main.postDelayed(() -> {
            if (!active) unmuteBeeps();
        }, 800);
        JSObject ret = new JSObject();
        ret.put("reason", reason);
        ret.put("code", code);
        ret.put("ms", System.currentTimeMillis() - runStartedAt);
        ret.put("maxRms", (double) maxRms);
        notifyListeners("end", ret);
    }

    private void destroyRecognizer() {
        if (rec == null) return;
        try {
            rec.cancel();
            rec.destroy();
        } catch (Exception ignored) {
            // nothing to clean up
        }
        rec = null;
    }

    private void emit(String event, Bundle b) {
        ArrayList<String> all = b == null ? null : b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (all == null || all.isEmpty()) return;
        // Some Google versions put an empty string first in the final result: keep only real text.
        ArrayList<String> m = new ArrayList<>();
        ArrayList<Integer> keep = new ArrayList<>();
        for (int k = 0; k < all.size(); k++) {
            String t = all.get(k);
            if (t != null && !t.trim().isEmpty()) {
                m.add(t);
                keep.add(k);
            }
        }
        if (m.isEmpty()) return;
        JSObject ret = new JSObject();
        ret.put("matches", new JSArray(m));
        float[] sc = b.getFloatArray(SpeechRecognizer.CONFIDENCE_SCORES);
        if (sc != null) {
            JSArray a = new JSArray();
            for (int k : keep) {
                try {
                    a.put(k < sc.length ? (double) sc[k] : -1d);
                } catch (Exception ignored) {
                    // skip a bad score
                }
            }
            ret.put("scores", a);
        }
        ret.put("maxRms", (double) maxRms);
        notifyListeners(event, ret);
    }

    private void simple(String event) {
        JSObject ret = new JSObject();
        ret.put("ms", System.currentTimeMillis() - runStartedAt);
        notifyListeners(event, ret);
    }

    private static boolean hasText(Bundle b) {
        ArrayList<String> m = b == null ? null : b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (m == null) return false;
        for (String t : m) if (t != null && !t.trim().isEmpty()) return true;
        return false;
    }

    private class Listener implements RecognitionListener {

        private final int my;

        Listener(int my) {
            this.my = my;
        }

        @Override
        public void onReadyForSpeech(Bundle params) {
            if (my == run) simple("ready");
        }

        @Override
        public void onBeginningOfSpeech() {
            if (my == run) simple("speech");
        }

        @Override
        public void onRmsChanged(float db) {
            if (my != run) return;
            if (db > maxRms) maxRms = db;
            long now = System.currentTimeMillis();
            if (now - lastLevelAt < 120) return;
            lastLevelAt = now;
            JSObject ret = new JSObject();
            ret.put("db", db);
            notifyListeners("level", ret);
        }

        @Override
        public void onBufferReceived(byte[] buffer) {}

        @Override
        public void onEndOfSpeech() {
            if (my == run) simple("speechEnd");
        }

        @Override
        public void onError(int error) {
            if (my != run) return;
            if (stopping && error == ERR_CLIENT) end(my, "stopped", 0);
            else if (error == ERR_NO_MATCH || error == ERR_SPEECH_TIMEOUT) end(my, stopping ? "stopped" : "nomatch", error);
            else end(my, stopping ? "stopped" : "error", error);
        }

        @Override
        public void onResults(Bundle results) {
            if (my != run) return;
            if (hasText(results)) emit("final", results);
            end(my, stopping ? "stopped" : (hasText(results) ? "done" : "nomatch"), 0);
        }

        @Override
        public void onPartialResults(Bundle partialResults) {
            if (my == run) emit("partial", partialResults);
        }

        @Override
        public void onEvent(int eventType, Bundle params) {}
    }
}
