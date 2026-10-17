// Mocks for @capacitor/core, @capacitor/network and @capacitor-community/admob (see loader.mjs).
export const calls = [];
let listeners = {};
export const state = {
  prepareFails: 0, // next N prepares fail with code 3
  prepareHangs: false, // prepare never answers
  prepareSilentLoad: false, // prepare resolves but no Loaded event (event lost)
  online: true,
  adLayout: null, // what BuildInfo.getAdLayout returns
  consent: null, // requestConsentInfo result (null = not required); 'throw' = offline / UMP error
  formResult: null // showConsentForm result
};
export function reset() {
  calls.length = 0;
  listeners = {};
  Object.assign(state, { prepareFails: 0, prepareHangs: false, prepareSilentLoad: false, online: true, adLayout: null, consent: null, formResult: null });
}
export const Capacitor = { isNativePlatform: () => true };
export const registerPlugin = () => ({
  isDebug: async () => ({ debug: true }),
  getInfo: async () => ({ debug: true, versionName: '1.0', versionCode: 1, sdkInt: 36, density: 2.625 }),
  getAdLayout: async () => state.adLayout
});
export const Network = { getStatus: async () => ({ connected: state.online }), addListener: () => {} };
export const AdmobConsentStatus = { REQUIRED: 'REQUIRED' };
export const BannerAdSize = { BANNER: 'BANNER' };
export const BannerAdPosition = { TOP_CENTER: 'TOP_CENTER', BOTTOM_CENTER: 'BOTTOM_CENTER' };
export const BannerAdPluginEvents = { SizeChanged: 'bs', Loaded: 'bl', FailedToLoad: 'bf' };
export const InterstitialAdPluginEvents = { Loaded: 'il', FailedToLoad: 'if', Showed: 'ish', Dismissed: 'id', FailedToShow: 'ifs' };
export const emit = (e, d) => (listeners[e] || []).forEach(f => f(d));
export const AdMob = {
  addListener: (e, f) => {
    (listeners[e] ||= []).push(f);
    return Promise.resolve({ remove() {} });
  },
  requestConsentInfo: async opts => {
    calls.push('consent:' + JSON.stringify(opts || {}));
    if (state.consent === 'throw') throw new Error('offline');
    return state.consent || { status: 'NOT_REQUIRED', canRequestAds: true };
  },
  showConsentForm: async () => {
    calls.push('consentForm');
    return state.formResult || { status: 'OBTAINED', canRequestAds: true };
  },
  initialize: async opts => {
    calls.push('init:' + JSON.stringify(opts || {}));
  },
  showBanner: async opts => {
    calls.push('showBanner:' + opts.margin);
    calls.push('pos:' + opts.position);
  },
  hideBanner: async () => {
    calls.push('hideBanner');
  },
  resumeBanner: async () => {
    calls.push('resumeBanner');
  },
  removeBanner: async () => {
    calls.push('removeBanner');
  },
  prepareInterstitial: async () => {
    calls.push('prepare');
    if (state.prepareHangs) return new Promise(() => {});
    if (state.prepareFails > 0) {
      state.prepareFails--;
      emit('if', { code: 3 });
      throw new Error('no fill');
    }
    if (!state.prepareSilentLoad) emit('il', {});
    return { adUnitId: 'test' };
  },
  showInterstitial: async () => {
    calls.push('show');
    emit('ish');
  },
  showPrivacyOptionsForm: async () => {}
};
