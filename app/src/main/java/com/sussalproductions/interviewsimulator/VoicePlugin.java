package com.sussalproductions.interviewsimulator;

import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;

/**
 * Speech to text with Android's SpeechRecognizer. One start() = one recognition run; the
 * JavaScript voice manager (src/services/voice.js) decides when to restart, so restarts, back-off
 * and duplicate checks live in one tested place. (The community plugin is still used for
 * availability and the mic permission.)
 *
 *  - Hints: on Android 13+ a short word list (names, My words, rare terms) is passed with
 *    EXTRA_BIASING_STRINGS.
 *  - Segmented session (Android 13+, if the recognizer accepts it): one run stays open through
 *    pauses and sends one final result per phrase. If the recognizer rejects it, the run is
 *    retried once in normal mode and "segmented-rejected" is reported.
 *  - No beeps: music, notification and system sounds are muted while the mic is on (only streams
 *    that were not already muted) and restored 800 ms after a run ends unless the next run started.
 *
 * Events: ready, speech, speechEnd, partial {matches, scores}, final {matches, scores, segment},
 * level {db}, note {msg}, end {reason: done | nomatch | error | stopped, code, ms}.
 * No audio is recorded or stored by the app. Only text comes back.
 */
@CapacitorPlugin(name = "Voice")
public class VoicePlugin extends Plugin {

    private static final int ERR_CLIENT = 5;
    private static final int ERR_SPEECH_TIMEOUT = 6;
    private static final int ERR_NO_MATCH = 7;

    private static boolean segmentedBroken = false; // this phone rejected segmented sessions once

    private final Handler main = new Handler(Looper.getMainLooper());
    private SpeechRecognizer rec;
    private int run = 0; // grows with every start(); stale callbacks are ignored
    private boolean active = false;
    private boolean stopping = false;
    private boolean useSegmented = false;
    private long runStartedAt = 0;
    private long lastLevelAt = 0;
    private String language = "en-IN";
    private int maxResults = 5;
    private long silenceMs = 3000;
    private ArrayList<String> bias = new ArrayList<>();
    private final ArrayList<Integer> mutedStreams = new ArrayList<>();
    private static final int[] BEEP_STREAMS = { AudioManager.STREAM_MUSIC, AudioManager.STREAM_NOTIFICATION, AudioManager.STREAM_SYSTEM };

    @PluginMethod
    public void info(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("sdk", Build.VERSION.SDK_INT);
        ret.put("available", SpeechRecognizer.isRecognitionAvailable(getContext()));
        ret.put("segmentedBroken", segmentedBroken);
        call.resolve(ret);
    }

    @PluginMethod
    public void start(PluginCall call) {
        language = call.getString("language", "en-IN");
        maxResults = call.getInt("maxResults", 5);
        silenceMs = call.getInt("silenceMs", 3000);
        final boolean wantSegmented = call.getBoolean("segmented", true);
        bias = new ArrayList<>();
        JSArray b = call.getArray("bias", new JSArray());
        try {
            for (int i = 0; i < b.length() && bias.size() < 100; i++) {
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
                useSegmented = wantSegmented && Build.VERSION.SDK_INT >= 33 && !segmentedBroken;
                muteBeeps();
                rec = SpeechRecognizer.createSpeechRecognizer(getContext());
                rec.setRecognitionListener(new Listener(run));
                begin();
                JSObject ret = new JSObject();
                ret.put("sdk", Build.VERSION.SDK_INT);
                ret.put("segmented", useSegmented);
                ret.put("biasing", Build.VERSION.SDK_INT >= 33 && !bias.isEmpty());
                ret.put("hints", bias.size());
                ret.put("language", language);
                call.resolve(ret);
            });
    }

    /** Stop listening but keep what was said (the final result still arrives). */
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
                // Some recognizers never answer after stop(): end the run anyway.
                main.postDelayed(() -> end(my, "stopped", 0), 1500);
                main.postDelayed(() -> {
                    if (!active) unmuteBeeps();
                }, 2500);
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
                unmuteBeeps();
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
        if (!mutedStreams.isEmpty()) return; // already muted (restart within the grace time)
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
        i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, maxResults);
        i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        i.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, getContext().getPackageName());
        i.putExtra("android.speech.extra.DICTATION_MODE", true);
        // Many recognizers (Google's included) ignore these; the run length in the logs shows it.
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, silenceMs);
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, silenceMs);
        if (Build.VERSION.SDK_INT >= 33) {
            if (!bias.isEmpty()) i.putStringArrayListExtra(RecognizerIntent.EXTRA_BIASING_STRINGS, bias);
            if (useSegmented) {
                i.putExtra(RecognizerIntent.EXTRA_SEGMENTED_SESSION, RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS);
            }
        }
        return i;
    }

    private void begin() {
        if (rec == null) return;
        runStartedAt = System.currentTimeMillis();
        try {
            rec.startListening(buildIntent());
        } catch (Exception e) {
            end(run, "error", ERR_CLIENT);
        }
    }

    private void end(int my, String reason, int code) {
        if (my != run || rec == null) return;
        active = false;
        destroyRecognizer();
        // The JS manager restarts within ~300 ms; keep the sound muted over that gap.
        main.postDelayed(() -> {
            if (!active) unmuteBeeps();
        }, 800);
        JSObject ret = new JSObject();
        ret.put("reason", reason);
        ret.put("code", code);
        ret.put("ms", System.currentTimeMillis() - runStartedAt);
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

    private void emit(String event, Bundle b, boolean segment) {
        ArrayList<String> m = b == null ? null : b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (m == null || m.isEmpty()) return;
        JSObject ret = new JSObject();
        ret.put("matches", new JSArray(m));
        float[] sc = b.getFloatArray(SpeechRecognizer.CONFIDENCE_SCORES);
        if (sc != null) {
            JSArray a = new JSArray();
            for (float f : sc) {
                try {
                    a.put((double) f);
                } catch (Exception ignored) {
                    // skip a bad score
                }
            }
            ret.put("scores", a);
        }
        ret.put("segment", segment);
        notifyListeners(event, ret);
    }

    private void simple(String event) {
        JSObject ret = new JSObject();
        ret.put("ms", System.currentTimeMillis() - runStartedAt);
        notifyListeners(event, ret);
    }

    private static boolean hasText(Bundle b) {
        ArrayList<String> m = b == null ? null : b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        return m != null && !m.isEmpty() && m.get(0) != null && !m.get(0).trim().isEmpty();
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
            long now = System.currentTimeMillis();
            if (my != run || now - lastLevelAt < 120) return;
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
            long ran = System.currentTimeMillis() - runStartedAt;
            // Segmented session not supported by this recognizer: retry once in normal mode.
            if (useSegmented && ran < 1500 && error != ERR_NO_MATCH && error != ERR_SPEECH_TIMEOUT && !stopping) {
                segmentedBroken = true;
                useSegmented = false;
                JSObject n = new JSObject();
                n.put("msg", "segmented-rejected code " + error);
                notifyListeners("note", n);
                main.postDelayed(() -> {
                    if (my == run && !stopping) begin();
                }, 150);
                return;
            }
            if (stopping && error == ERR_CLIENT) end(my, "stopped", 0);
            else if (error == ERR_NO_MATCH || error == ERR_SPEECH_TIMEOUT) end(my, stopping ? "stopped" : "nomatch", error);
            else end(my, stopping ? "stopped" : "error", error);
        }

        @Override
        public void onResults(Bundle results) {
            if (my != run) return;
            if (hasText(results)) emit("final", results, false);
            end(my, stopping ? "stopped" : (hasText(results) ? "done" : "nomatch"), 0);
        }

        @Override
        public void onPartialResults(Bundle partialResults) {
            if (my == run) emit("partial", partialResults, false);
        }

        // Android 13+: one result per spoken phrase inside a segmented run.
        @Override
        public void onSegmentResults(Bundle segmentResults) {
            if (my == run && hasText(segmentResults)) emit("final", segmentResults, true);
        }

        @Override
        public void onEndOfSegmentedSession() {
            if (my == run) end(my, stopping ? "stopped" : "done", 0);
        }

        @Override
        public void onEvent(int eventType, Bundle params) {}
    }
}
