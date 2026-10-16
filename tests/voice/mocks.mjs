// Mocks for @capacitor/core (registerPlugin('Voice') = VoicePlugin.java) and the community
// speech plugin (availability and permission only). One start() = one recognition run.
export const state = { starts: [], stops: 0, cancels: 0, listeners: {}, failStart: 0, startResult: { sdk: 34, segmented: true, biasing: true, hints: 0 } };
export function reset() {
  Object.assign(state, { starts: [], stops: 0, cancels: 0, listeners: {}, failStart: 0, startResult: { sdk: 34, segmented: true, biasing: true, hints: 0 } });
}
export const emit = (e, d = {}) => (state.listeners[e] || []).slice().forEach(f => f(d));
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
    if (state.failStart > 0) {
      state.failStart--;
      throw new Error('start failed');
    }
    return { ...state.startResult, language: opts.language, hints: (opts.bias || []).length };
  },
  stop: async () => {
    state.stops++;
  },
  cancel: async () => {
    state.cancels++;
  },
  info: async () => ({ sdk: 34, available: true })
};
export const registerPlugin = name => (name === 'Voice' ? Voice : {});
export const SpeechRecognition = {
  available: async () => ({ available: true }),
  checkPermissions: async () => ({ speechRecognition: 'granted' }),
  requestPermissions: async () => ({ speechRecognition: 'granted' })
};
