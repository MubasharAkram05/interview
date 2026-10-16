// Mocks for @capacitor/core (registerPlugin('Voice') = VoicePlugin.java) and the community
// speech plugin (availability and permission only).
export const state = { starts: [], stops: 0, cancels: 0, listeners: {}, failLang: null };
export function reset() {
  Object.assign(state, { starts: [], stops: 0, cancels: 0, listeners: {}, failLang: null });
}
export const emit = (e, d) => (state.listeners[e] || []).forEach(f => f(d));
export const Capacitor = { isNativePlatform: () => true };
const Voice = {
  addListener: (e, f) => {
    (state.listeners[e] ||= []).push(f);
    return Promise.resolve({
      remove() {
        state.listeners[e] = (state.listeners[e] || []).filter(x => x !== f);
      }
    });
  },
  start: async opts => {
    state.starts.push(opts);
    // Android rejects an unsupported language with error 12 right after start.
    if (opts.language === state.failLang) setTimeout(() => emit('end', { reason: 'error', code: 12 }), 20);
    return { segmented: true };
  },
  stop: async () => {
    state.stops++;
  },
  cancel: async () => {
    state.cancels++;
  }
};
export const registerPlugin = name => (name === 'Voice' ? Voice : {});
export const SpeechRecognition = {
  available: async () => ({ available: true }),
  checkPermissions: async () => ({ speechRecognition: 'granted' }),
  requestPermissions: async () => ({ speechRecognition: 'granted' })
};
