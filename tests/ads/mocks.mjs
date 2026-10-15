export const calls = []; const listeners = {};
export const state = { prepareFails: 0, online: true };
export const Capacitor = { isNativePlatform: () => true };
export const registerPlugin = () => ({ isDebug: async () => ({ debug: true }) });
export const Network = { getStatus: async () => ({ connected: state.online }), addListener: () => {} };
export const AdmobConsentStatus = { REQUIRED: 'REQUIRED' };
export const BannerAdSize = { BANNER: 'BANNER' }; export const BannerAdPosition = { TOP_CENTER: 'TOP_CENTER' };
export const BannerAdPluginEvents = { SizeChanged: 'bs', Loaded: 'bl', FailedToLoad: 'bf' };
export const InterstitialAdPluginEvents = { Loaded: 'il', FailedToLoad: 'if', Showed: 'ish', Dismissed: 'id', FailedToShow: 'ifs' };
export const emit = (e, d) => (listeners[e] || []).forEach(f => f(d));
export const AdMob = {
  addListener: (e, f) => { (listeners[e] ||= []).push(f); return Promise.resolve({ remove() {} }); },
  requestConsentInfo: async () => ({ status: 'OBTAINED', canRequestAds: true }),
  initialize: async () => {}, showBanner: async () => { calls.push('showBanner'); },
  hideBanner: async () => { calls.push('hideBanner'); }, resumeBanner: async () => { calls.push('resumeBanner'); },
  removeBanner: async () => {},
  prepareInterstitial: async () => { calls.push('prepare'); if (state.prepareFails > 0) { state.prepareFails--; emit('if', { code: 3 }); throw new Error('no fill'); } emit('il', {}); },
  showInterstitial: async () => { calls.push('show'); emit('ish'); }
};
