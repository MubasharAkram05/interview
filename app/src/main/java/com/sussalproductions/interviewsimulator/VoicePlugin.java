package com.sussalproductions.interviewsimulator;

import android.content.Intent;
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
 * Speech to text with full control over Android's SpeechRecognizer (the community plugin is still
 * used for availability and the mic permission).
 *
 * Why this exists:
 *  - Biasing: on Android 13+ the expected words (the answer being read, tech terms) are passed to the
 *    recognizer, so it picks "JavaScript" or "teamwork" instead of a similar sounding word.
 *  - Continuous listening: on Android 13+ a segmented session keeps one session open through pauses.
 *    On older phones (or if segmented sessions are not supported) the recognizer is restarted at once
 *    inside native code, so far fewer words are lost than with a restart from JavaScript.
 *  - Longer silence before the end of a phrase, and real error codes (language, network, no speech).
 *
 * Events: "partial" {matches}, "segment" {matches}, "level" {db}, "end" {reason, code}.
 * No audio is recorded or stored by the app. Only text comes back.
 */
@CapacitorPlugin(name = "Voice")
public class VoicePlugin extends Plugin {

    // SpeechRecognizer error codes (literals: some constants are newer than minSdk).
    private static final int ERR_NETWORK_TIMEOUT = 1;
    private static final int ERR_NETWORK = 2;
    private static final int ERR_CLIENT = 5;
    private static final int ERR_SPEECH_TIMEOUT = 6;
    private static final int ERR_NO_MATCH = 7;
    private static final int ERR_BUSY = 8;
    private static final int ERR_LANG_NOT_SUPPORTED = 12;
    private static final int ERR_LANG_UNAVAILABLE = 13;

    private static boolean segmentedBroken = false; // this phone rejected segmented sessions once

    private final Handler main = new Handler(Looper.getMainLooper());
    private SpeechRecognizer rec;
    private int session = 0; // grows with every start(); stale callbacks are ignored
    private boolean active = false; // the user wants to keep listening
    private boolean continuous = true;
    private int emptyRuns = 0;
    private int maxEmpty = 2;
    private long runStartedAt = 0;
    private long lastLevelAt = 0;
    private boolean useSegmented = false;
    private String language = "en-IN";
    private int maxResults = 5;
    private long silenceMs = 3000;
    private ArrayList<String> bias = new ArrayList<>();

    @PluginMethod
    public void start(PluginCall call) {
        language = call.getString("language", "en-IN");
        maxResults = call.getInt("maxResults", 5);
        continuous = call.getBoolean("continuous", true);
        maxEmpty = call.getInt("maxEmpty", 2);
        silenceMs = call.getInt("silenceMs", 3000);
        bias = new ArrayList<>();
        JSArray b = call.getArray("bias", new JSArray());
        try {
            for (int i = 0; i < b.length() && bias.size() < 200; i++) {
                String s = b.getString(i);
                if (s != null && !s.trim().isEmpty()) bias.add(s.trim());
            }
        } catch (Exception ignored) {
            // bad bias list: listen without it
        }
        getActivity()
            .runOnUiThread(() -> {
                if (!SpeechRecognizer.isRecognitionAvailable(getContext())) {
                    call.reject("unavailable");
                    return;
                }
                destroyRecognizer();
                session++;
                active = true;
                emptyRuns = 0;
                useSegmented = continuous && Build.VERSION.SDK_INT >= 33 && !segmentedBroken;
                rec = SpeechRecognizer.createSpeechRecognizer(getContext());
                rec.setRecognitionListener(new Listener(session));
                begin();
                JSObject ret = new JSObject();
                ret.put("segmented", useSegmented);
                call.resolve(ret);
            });
    }

    /** Stop listening but keep what was said (final result still arrives). */
    @PluginMethod
    public void stop(PluginCall call) {
        final int my = session;
        getActivity()
            .runOnUiThread(() -> {
                active = false;
                if (rec != null) {
                    try {
                        rec.stopListening();
                    } catch (Exception ignored) {
                        // already stopped
                    }
                }
                // Some recognizers never answer after stop(): end the session anyway.
                main.postDelayed(() -> end(my, "stopped", 0), 1500);
                call.resolve();
            });
    }

    /** Stop now and drop anything not yet delivered. */
    @PluginMethod
    public void cancel(PluginCall call) {
        final int my = session;
        getActivity()
            .runOnUiThread(() -> {
                active = false;
                end(my, "stopped", 0);
                call.resolve();
            });
    }

    @Override
    protected void handleOnDestroy() {
        main.removeCallbacksAndMessages(null);
        destroyRecognizer();
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
            end(session, "error", ERR_CLIENT);
        }
    }

    /** One run finished. Start again at once (continuous) or end the session. */
    private void next(int my) {
        if (my != session) return;
        if (active && continuous && emptyRuns < maxEmpty) {
            main.postDelayed(() -> {
                if (my == session && active) begin();
            }, 40);
        } else {
            end(my, active ? "ended" : "stopped", 0);
        }
    }

    private void end(int my, String reason, int code) {
        if (my != session || rec == null) return;
        active = false;
        destroyRecognizer();
        JSObject ret = new JSObject();
        ret.put("reason", reason);
        ret.put("code", code);
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
        ArrayList<String> m = b == null ? null : b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (m == null || m.isEmpty()) return;
        JSObject ret = new JSObject();
        ret.put("matches", new JSArray(m));
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
        public void onReadyForSpeech(Bundle params) {}

        @Override
        public void onBeginningOfSpeech() {}

        @Override
        public void onRmsChanged(float db) {
            long now = System.currentTimeMillis();
            if (my != session || now - lastLevelAt < 120) return;
            lastLevelAt = now;
            JSObject ret = new JSObject();
            ret.put("db", db);
            notifyListeners("level", ret);
        }

        @Override
        public void onBufferReceived(byte[] buffer) {}

        @Override
        public void onEndOfSpeech() {}

        @Override
        public void onError(int error) {
            if (my != session) return;
            long ran = System.currentTimeMillis() - runStartedAt;
            // Segmented session not supported by this recognizer: retry once in normal mode.
            if (useSegmented && ran < 1500 && error != ERR_NO_MATCH && error != ERR_SPEECH_TIMEOUT && active) {
                segmentedBroken = true;
                useSegmented = false;
                main.postDelayed(() -> {
                    if (my == session && active) begin();
                }, 100);
                return;
            }
            if (error == ERR_NO_MATCH || error == ERR_SPEECH_TIMEOUT) {
                emptyRuns++;
                next(my);
            } else if (error == ERR_BUSY && active) {
                main.postDelayed(() -> {
                    if (my == session && active) begin();
                }, 300);
            } else if (error == ERR_CLIENT && !active) {
                end(my, "stopped", 0);
            } else {
                end(my, "error", error);
            }
        }

        @Override
        public void onResults(Bundle results) {
            if (my != session) return;
            if (hasText(results)) {
                emit("segment", results);
                emptyRuns = 0;
            } else emptyRuns++;
            next(my);
        }

        @Override
        public void onPartialResults(Bundle partialResults) {
            if (my != session) return;
            emit("partial", partialResults);
        }

        // Android 13+: one result per spoken segment inside a single long session.
        @Override
        public void onSegmentResults(Bundle segmentResults) {
            if (my != session) return;
            if (hasText(segmentResults)) {
                emit("segment", segmentResults);
                emptyRuns = 0;
            }
        }

        @Override
        public void onEndOfSegmentedSession() {
            if (my != session) return;
            next(my);
        }

        @Override
        public void onEvent(int eventType, Bundle params) {}
    }
}
