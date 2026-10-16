// Mock of @capacitor-community/speech-recognition (Android behaviour) for voice.js tests.
export const Capacitor = { isNativePlatform: () => true };
export const registerPlugin = () => ({});
export const state = { starts: [], listening: false, rejectLang: null, listeners: {} };
export function reset() {
  Object.assign(state, { starts: [], listening: false, rejectLang: null, listeners: {} });
}
export const emitPartial = matches => (state.listeners.partialResults || []).forEach(f => f({ matches }));
export const endSpeech = () => {
  state.listening = false;
};
export const SpeechRecognition = {
  available: async () => ({ available: true }),
  checkPermissions: async () => ({ speechRecognition: 'granted' }),
  requestPermissions: async () => ({ speechRecognition: 'granted' }),
  addListener: (e, f) => {
    (state.listeners[e] ||= []).push(f);
    return Promise.resolve({ remove() {} });
  },
  start: async opts => {
    state.starts.push(opts);
    state.listening = true;
    // An unsupported language: Android's recognizer errors and stops right away.
    if (opts.language === state.rejectLang) setTimeout(() => (state.listening = false), 100);
  },
  stop: async () => {
    state.listening = false;
  },
  isListening: async () => ({ listening: state.listening })
};
