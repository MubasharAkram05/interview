// Mocks for @capacitor/core: registerPlugin('Voice') = VoicePlugin.java. One start() = one
// recognizer session.
export const state = { starts: [], stops: 0, cancels: 0, listeners: {}, failStart: 0, startResult: { sdk: 34, biasing: true, hints: 0 } };
export function reset() {
  Object.assign(state, { starts: [], stops: 0, cancels: 0, listeners: {}, failStart: 0, startResult: { sdk: 34, biasing: true, hints: 0 } });
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
  info: async () => ({ sdk: 34, available: true }),
  checkPermissions: async () => ({ microphone: state.permission || 'granted' }),
  requestPermissions: async () => ({ microphone: state.permission || 'granted' }),
  openSettings: async () => {
    state.settingsOpened = (state.settingsOpened || 0) + 1;
  }
};
export const registerPlugin = name => (name === 'Voice' ? Voice : {});
