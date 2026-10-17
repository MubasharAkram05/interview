import {
  CATS,
  LEVELS,
  ROLE,
  DEF,
  HEAD,
  TAIL,
  MID,
  OV,
  MYH,
  MYT,
  MYM,
  MYOV,
  MYEX,
  LK,
  LVH,
  LVT,
  LVX,
  TIPS,
  PCI
} from './data/questions.js';

import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Share } from '@capacitor/share';
import { AppLauncher } from '@capacitor/app-launcher';
import { marked } from 'marked';
import policyMarkdown from '../PRIVACY_POLICY.md?raw';
import glyphSvg from '../assets/logo/glyph.svg?raw';
import { PRIVACY_POLICY_URL, VOICE_ACCENTS } from './config/app.js';
import {
  initializeAdMob,
  showInterstitialAtBreak,
  skipInterstitialBreak,
  setBannerSuppressed,
  setBannerPlacement,
  requestBannerRelayout,
  needsPrivacyOptions,
  showPrivacyOptions
} from './services/admob.js';
import { requireOnline } from './services/online.js';
import { ADS_CONFIG } from './config/ads.js';
import {
  isVoiceAvailable,
  micPermission,
  requestMicPermission,
  startListening,
  stopListening,
  cancelListening,
  isListening,
  voiceState,
  setVoiceAccent,
  openAppSettings,
  notePractice
} from './services/voice.js';
import { voiceAccent, setAccentPref, corrections, removeCorrection } from './services/voice-prefs.js';
import { rareWords, norm } from './services/vocab.js';
import { alignToExpected, introTemplate, isIntroQuestion, memoryStatus, phraseHits, expandDegree, roleText } from './services/expected.js';
import { ROLES, EXPERIENCE, MAX_SKILLS, ROLE_SKILLS, nameError, cleanTags, buildProfile, setupDone, catToRole, autoWords, LEGACY_DEMO_NAMES } from './services/setup.js';
import { SKILL_SUGGESTIONS } from './data/interview-vocab.js';

import { speak, stopSpeaking, isSpeaking, onSpeakingChange, TTS_MESSAGES } from './services/tts.js';
import { initStorage, getItem, setItem, removeItem } from './services/storage.js';
import { questionOfDay, bumpStreak, streakNow } from './services/qotd.js';
import { nativeAdLayout } from './services/native-info.js';
import { formatSessionDate, formatExportDateTime, calculateStreak } from './services/dates.js';
import { playTapSound, playSuccessChime, playErrorBeep } from './services/sound.js';
import { fireConfetti, fireGrandCelebration } from './services/celebration.js';

const $ = id => document.getElementById(id);

// Safe HTML escaping
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clean = v => String(v).trim().replace(/[.\s]+$/, '');
const nrm = x => String(x).toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]/g, '');
const ini = n => n.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

// SVG Icons mapping
const IC = {
  flame: 'M12 2c1 4.5 5.5 6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.2 1-3.6 2.2-4.8.2 1.8 1 2.8 2 3.2C10.2 8.2 10.5 5 12 2z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  star: 'M12 2l3 6.9 7.4.6-5.6 4.8 1.7 7.2L12 17.8 5.5 21.5l1.7-7.2L1.6 9.5 9 8.9z',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  eyeoff: 'M17.9 17.9A10.1 10.1 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.1-5.9M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2M14.1 14.1a3 3 0 1 1-4.2-4.2M1 1l22 22',
  edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  speaker: 'M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13',
  undo: 'M3 7v6h6M3 13a9 9 0 1 0 3-7',
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18M6 6l12 12',
  left: 'M15 18l-6-6 6-6',
  right: 'M9 18l6-6-6-6',
  mic: 'M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v4',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6',
  plus: 'M12 5v14M5 12h14',
  mute: 'M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6',
  chart: 'M6 20V14M12 20V8M18 20V4',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  shuffle: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4'
};

const svg = n => `<svg viewBox="0 0 24 24"><path d="${IC[n] || ''}"/></svg>`;
function renderIcons() {
  document.querySelectorAll('[data-i]').forEach(b => {
    b.innerHTML = svg(b.dataset.i);
  });
}

// App State
let profiles = {};
let active = '';
let E = {};
let QE = {};
let H = {};
let C = {};
let editing = null;
let cur = [];
let idx = 0;
let answers = [];
let cat = '';
let lv = 'fresher';
let timerOn = true;
let ti = null;
let left = 60;
let P = { list: [], i: 0, cat: '', lv: 'fresher', one: null };
// P.one = id of a single question (Question of the day): practice shows only that one, no swiping.
const plist = () => {
  const l = bank(P.cat, P.lv);
  return P.one == null ? l : l.filter(x => String(x.i) === String(P.one));
};
let pcLv = 'fresher';
let cs = 'home';
let dep = 0;
let exitArm = 0;
let toastT = null;
let leaveOK = false;
let dlgRes = null;
let csC = '';
let favOpen = false;
let PW = [];
let pRv = null;
let rv = null;
let voiceOK = false; // phone has a speech recognition service
let pSpoken = []; // practice read-along: final text of each listening session on this card
let pMicOn = false; // read-along wants to keep listening (auto-restarts after a pause)

const CK = (c, l) => (!l || l === 'fresher' ? c : `${c}@${l}`);
const CL = (c, l) => `${CATS[c]} · ${LEVELS[l || 'fresher']}`;
const FKEEP = (n, m) => {
  const s = new Set();
  for (let i = 0; i < 4; i++) s.add(i);
  for (let i = 4; i < 4 + Math.min(3, m); i++) s.add(i);
  [2, 4, 5].forEach(k => s.add(n - 6 + k));
  return s;
};

const bank = (c, level = 'fresher') => {
  const k0 = CK(c, level);
  const fr = level === 'fresher';
  const L = fr
    ? [...HEAD, ...MID[c], ...TAIL]
    : [...LVH[level], ...MID[c], ...(LVX[level]?.[c] || []), ...LVT[level]];
  const seen = new Set();
  const items = L.map(([q, a], i) => {
    const k = LK[c]?.[q];
    return k ? { i, q: k[0], a: k[1] } : { i, q, a: OV[c]?.[q] || a };
  });
  if (fr) {
    (MYEX[c] || []).forEach(([q, a], j) => items.push({ i: L.length + j, q, a }));
  }
  return items
    .filter(x => {
      if (seen.has(x.q)) return false;
      seen.add(x.q);
      return true;
    })
    .filter(x => !fr || FKEEP(L.length, MID[c].length).has(x.i) || x.i >= L.length)
    .filter(x => !(H[k0] || []).includes(x.i))
    .concat((C[k0] || []).map(x => ({ ...x })))
    .map(x => {
      const e = QE[`${active}|${k0}|${x.i}`];
      return e ? { ...x, q: e } : x;
    });
};

// Fill a sample answer from the profile, in full professional words: degree short forms written
// out ("BS IT" -> "BS in Information Technology"), "Marketing/Sales" -> "Marketing and Sales", and
// no "at my university" when the university is not known.
const fill = (t, p) => {
  const q = p ? { ...p, degree: expandDegree(p.degree || p.edu).degree, role: roleText(p.role) } : p;
  let s = String(t);
  if (!(q && q.uni)) s = s.replace(/,?\s+(at|from) \{uni\}/g, '').replace(/\bAt \{uni\}/g, 'At university');
  return s.replace(/\{(\w+)\}/g, (_, k) => (q && q[k] ? clean(q[k]) : DEF[k] || `[${k}]`));
};
const ekey = it => `${active}|${CK(P.cat, P.lv)}|${it.i}`;
const rp = p => p && { ...p, role: ROLE[P.cat] || p.role };
// Saved answer, or the sample answer filled from the profile. "Introduce yourself" questions use
// an answer built from the setup details (src/services/expected.js) until the user saves their own.
const ansText = it => {
  if (ekey(it) in E) return E[ekey(it)];
  const p = profiles[active];
  if (p && isIntroQuestion(it.q)) {
    const t = introTemplate({ name: p.name, edu: p.edu || p.degree, city: p.city, skills: p.skillTags || p.skills, role: p.role });
    if (t) return t;
  }
  return fill(it.a, rp(p));
};

// Toast Notification
function toast(m) {
  const t = $('toast');
  t.textContent = m;
  t.classList.remove('hidden');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.add('hidden'), 2000);
}

// Ask Modal Dialog
function ask(t, m, yes = 'OK', no = '', em = '🤔', danger = false) {
  return new Promise(r => {
    $('dEm').textContent = em;
    $('dT').textContent = t;
    $('dM').textContent = m;
    $('dYes').textContent = yes;
    $('dYes').classList.toggle('dng', !!danger);
    $('dNo').textContent = no;
    $('dNo').classList.toggle('hidden', !no);
    dlgRes = v => {
      $('dlg').classList.add('hidden');
      setBannerSuppressed('dialog', false);
      dlgRes = null;
      r(v);
    };
    setBannerSuppressed('dialog', true);
    $('dlg').classList.remove('hidden');
    $('dYes').focus();
  });
}

function customAlert(m) {
  ask('Just a moment', String(m), 'Got it', null, '💡');
}

// Banner slot under the header.
// --ad-h = real banner height; #adSlot = gap above + banner + gap below (0 when there is no ad).
function setAdSpace(h) {
  const root = document.documentElement.style;
  root.setProperty('--ad-h', `${h}px`);
  root.setProperty('--ad-slot', h > 0 ? `${ADS_CONFIG.bannerGapTop + h + ADS_CONFIG.bannerGapBottom}px` : '0px');
}

// Header bottom and top safe area (notch / status bar) in CSS px, for the banner position.
// The ad plugin adds the window's top inset itself for TOP_CENTER; admob.js subtracts the same
// inset and then checks the real native position (see checkBannerPosition).
function bannerLayout() {
  const header = document.querySelector('header.bar');
  const probe = $('safeTopProbe');
  const bottom = $('safeBotProbe');
  return {
    headerBottom: header ? header.getBoundingClientRect().bottom : 0,
    safeTop: probe ? probe.getBoundingClientRect().height : 0,
    viewportH: window.innerHeight,
    safeBottom: bottom ? bottom.getBoundingClientRect().height : 0
  };
}

// Reserve the banner space at first paint (before storage and consent), so the content never
// jumps down when the ad arrives. It collapses to 0 if there is no consent, no internet or no ad.
if (Capacitor.isNativePlatform() && ADS_CONFIG.enableBanner) setAdSpace(ADS_CONFIG.bannerReserveHeight);

// Re-measure the banner position once the layout has settled: web fonts, Capacitor injecting the
// --safe-area-inset-* variables (a style change on <html>), and late WebView size changes.
// Header top padding. When the app draws behind the status bar (edge-to-edge), the header needs
// the status bar height as top padding. On phones where the WebView already starts BELOW the
// status bar, Android still reports that height as a safe-area inset, so the space was added
// twice. Ask native where the WebView starts and drop the extra padding in that case.
async function checkHeaderInset() {
  const l = await nativeAdLayout();
  if (!l || typeof l.webViewTop !== 'number') return;
  const root = document.documentElement.classList;
  const below = l.webViewTop > 1;
  // Same at the bottom: a WebView that ends above the navigation bar needs no bottom inset.
  const above =
    typeof l.windowHeight === 'number' && l.windowHeight > 0 && (l.insetBottom || 0) > 0 &&
    l.webViewTop + l.webViewHeight <= l.windowHeight - l.insetBottom + 1;
  if (below !== root.contains('wv-below-bars') || above !== root.contains('wv-above-navbar')) {
    root.toggle('wv-below-bars', below);
    root.toggle('wv-above-navbar', above);
    requestBannerRelayout();
  }
}

function watchHeaderInset() {
  if (!Capacitor.isNativePlatform()) return;
  checkHeaderInset();
  [800, 2500].forEach(ms => setTimeout(checkHeaderInset, ms));
  window.addEventListener('resize', () => setTimeout(checkHeaderInset, 300));
}

function watchBannerLayout() {
  try {
    document.fonts && document.fonts.ready.then(requestBannerRelayout);
  } catch {
    // ignore
  }
  window.addEventListener('load', requestBannerRelayout);
  [1500, 4000].forEach(ms => setTimeout(requestBannerRelayout, ms));
  try {
    let last = '';
    new MutationObserver(() => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top');
      if (v !== last) {
        last = v;
        requestBannerRelayout();
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
  } catch {
    // ignore
  }
}

// Navigation & Screen Management
const TT = {
  home: 'Interview Simulator',
  form: 'Profile',
  practice: 'Practice',
  pcat: 'Practice',
  mock: 'Mock interview',
  interview: 'Mock interview',
  feedback: 'Results',
  addq: 'Add question',
  privacy: 'Privacy Policy',
  setup: 'Your details'
};

const TB = {
  home: 'nHome',
  practice: 'nPractice',
  pcat: 'nPractice',
  form: 'nProfile',
  mock: 'nMock',
  interview: 'nMock',
  feedback: 'nMock',
  addq: 'nPractice',
  privacy: 'nProfile',
  setup: 'nProfile'
};

const TABS = ['home', 'pcat', 'practice', 'mock', 'form'];

function saveScr() {
  const id = cs;
  let o = { s: id };
  if (id === 'practice') o = { s: id, cat: P.cat, lv: P.lv, i: P.i, one: P.one };
  else if (id === 'interview') o = { s: id, cat, lv, idx, cur, answers, heard: mHeard, ok: mOk };
  setItem('is_scr', o);
}

function render(id) {
  cs = id;
  saveScr();
  document.querySelectorAll('.scr').forEach(s => s.classList.add('hidden'));
  $(id).classList.remove('hidden');

  if (id !== 'interview') {
    clearInterval(ti);
    stopMedia();
  }

  if (id === 'home') fillHome();
  if (id === 'practice') pr();
  if (id === 'pcat') fillPcat();
  if (id === 'mock') fillMock();
  if (id === 'privacy') fillPrivacy();
  if (id === 'setup') renderSetup();
  if (id === 'interview' && cur.length) {
    mRender(idx); // details may have changed (Edit my details)
  }

  // Mock interview session page: banner at the bottom (below Prev/Next); everywhere else at the top.
  const adBottom = id === 'interview';
  document.documentElement.classList.toggle('ad-bottom', adBottom);
  setBannerPlacement(adBottom ? 'bottom' : 'top');
  // Forms (details, new question): no banner and no reserved space.
  const noAd = id === 'setup' || id === 'addq';
  document.documentElement.classList.toggle('no-ad', noAd);
  setBannerSuppressed('form', noAd);
  requestBannerRelayout(); // every screen: check the banner is still just under the header

  $('x').classList.toggle('hidden', id === 'home');
  $('ttl').textContent = TT[id] || 'Interview Simulator';
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t.id === TB[id]));
  // Question screens (practice and mock interview) use the full height; the header back button leaves.
  $('nav').classList.toggle('hidden', id === 'interview' || id === 'practice' || id === 'addq' || id === 'setup');
  $('main').scrollTop = 0;
  renderIcons();
}

function show(id, replace = false) {
  if (id === 'home') {
    if (dep > 0) {
      history.go(-dep);
      return;
    }
    render('home');
    return;
  }
  // Leaving the setup screen after saving: replace it, so Back does not reopen the form.
  if (replace || cs === 'setup' || (TABS.includes(id) && TABS.includes(cs) && cs !== 'home')) {
    history.replaceState({ s: id, d: dep }, '');
  } else {
    dep++;
    history.pushState({ s: id, d: dep }, '');
  }
  render(id);
}

function back() {
  playTapSound();
  history.back();
}

function home() {
  playTapSound();
  show('home');
}

function setTheme(target) {
  playTapSound();
  document.documentElement.dataset.theme = target === 'dark' ? 'dark' : 'light';
  setItem('is_theme', document.documentElement.dataset.theme);
  syncThemeSwitch();
}

function toggleTheme() {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
}

// The theme icon lives in the Profile hero (no theme button in the header).
// It shows a moon in light mode and a sun in dark mode.
function syncThemeSwitch() {
  const b = $('pTheme');
  if (!b) return;
  const dark = document.documentElement.dataset.theme === 'dark';
  b.dataset.i = dark ? 'sun' : 'moon';
  b.title = b.ariaLabel = dark ? 'Switch to light mode' : 'Switch to dark mode';
  b.innerHTML = svg(b.dataset.i);
}

// The logo glyph (assets/logo/glyph.svg) inline; mask ids are made unique per copy.
let logoN = 0;
function logoSvg() {
  logoN++;
  return glyphSvg.replace(/<!--[\s\S]*?-->/g, '').replace(/lg-/g, `lg${logoN}-`);
}

// Stats & Home Screen
function stats() {
  const p = profiles[active];
  const g = new Date().getHours();
  const first = p && p.name ? p.name.split(' ')[0] : '';
  $('hi').textContent = first || 'Welcome';
  $('gr').textContent = first ? (g < 12 ? 'Good morning,' : g < 18 ? 'Good afternoon,' : 'Good evening,') : 'Hello,';
  const h = getItem('is_hist', []) || [];
  $('hsStreak').textContent = calculateStreak(h);
  $('hsDone').textContent = h.length;
  $('hsBest').textContent = h.length ? `${Math.max(...h.map(x => x.s))}/10` : '-';
  const done = setupDone(p);
  $('hSub').textContent = !done ? "Let's set up your details and start practising." : h.length ? 'Keep going. Practise a few answers today.' : 'Ready to practise your first answers?';
  $('hGoT').textContent = done ? 'Start practice' : 'Get Started';
}

// Home hero main button: Practice when the details are saved, else the details form first.
function heroGo() {
  playTapSound();
  startPractice(); // straight to Practice; the details form comes only when a type is picked
}

// Welcome screen: covers the app while it loads; Get Started shows when everything is ready.
// Get Started: always the app (Home); the details form comes when a Practice or Mock type is picked.
function introReady() {
  const el = $('intro');
  if (!el) return;
  if (window.__skipIntro) {
    setBannerSuppressed('intro', false);
    return el.remove(); // browser tests that check other screens
  }
  $('iLoad').classList.add('hidden');
  const go = $('iGo');
  go.classList.remove('hidden');
  go.onclick = () => {
    playTapSound();
    el.classList.add('out');
    setTimeout(() => el.remove(), 400);
    // A screen restored behind the welcome screen starts reading aloud only now.
    setTimeout(() => {
      if (cs === 'practice' && P.list[P.i]) pAutoRead(P.list[P.i]);
      if (cs === 'interview' && cur[idx] && $('rd').checked) reveal(cur[idx].q, true);
    }, 450);
    // Always the app (Home, or the screen restored from last time); never the details form here.
    setBannerSuppressed('intro', false); // the banner appears with the app, never on this screen
  };
}

// Home: one card under the hero, the Question of the day.
function fillHx() {
  const h = getItem('is_hist', []) || [];
  const streak = calculateStreak(h);
  const hs = $('hStreak');
  hs.classList.toggle('on', streak > 0);
  hs.dataset.n = streak;

  const card = (cls, icon, title, body, btn, extra = '') =>
    `<article class="hcard ${cls}"><div class="hct"><span class="hci" aria-hidden="true">${icon}</span><h4>${title}</h4></div>${body}<div class="hcb">${extra}${btn}</div></article>`;
  let o = '';
  const res = questionOfDay({ saved: getItem('is_qotd', null), cats: Object.keys(CATS), lv: LEVELS[pcLv] ? pcLv : 'fresher', list: bank });
  if (res) {
    const { pick, changed } = res;
    if (changed) setItem('is_qotd', pick);
    const qs = streakNow(getItem('is_qstreak', null));
    const fire = qs ? `<span class="qstreak${pick.done ? ' on' : ''}" title="Days in a row">🔥 ${qs} day${qs === 1 ? '' : 's'}</span>` : '';
    o += pick.done
      ? card('qotd done', '✅', `Question of the day${fire}`, `<p class="qotdq">${esc(pick.q)}</p>`, '<button class="sm" id="qotdBtn">Practice again</button>', '<small class="qdone">Done today</small>')
      : card('qotd', '💡', `Question of the day${fire}`, `<p class="qotdq">${esc(pick.q)}</p>`, '<button class="pri sm" id="qotdBtn">Practice it</button>', `<small>${esc(qs ? 'Practise today to keep your streak' : CL(pick.c, pick.lv))}</small>`);
  } else {
    o += card('qotd', '💡', 'Question of the day', '<p class="hce">No question today. Add your own in Practice.</p>', '<button class="sm" onclick="startPractice()">Open Practice</button>');
  }
  $('hCards').innerHTML = o;

  $('qotdBtn')?.addEventListener('click', () => {
    const { c, lv, q } = res.pick;
    const it = bank(c, lv).find(x => x.q === q);
    pcGo(c, 0, lv, it ? it.i : null);
  });
}

// Question of the day: practised once (spoken in Practice, or Finish tapped on it) = done for today.
function markQotd(c, lv, q) {
  const s = getItem('is_qotd', null);
  if (!s || s.done || s.c !== c || s.lv !== lv || s.q !== q) return;
  setItem('is_qotd', { ...s, done: 1 });
  setItem('is_qstreak', bumpStreak(getItem('is_qstreak', null), s.d));
}

function pFinish1() {
  const it = P.list[P.i];
  if (it) markQotd(P.cat, P.lv, it.q);
  home();
}

function openHistory() {
  playTapSound();
  if (!(getItem('is_hist', []) || []).length) return startMock();
  showProfile();
  if ($('hList').classList.contains('hidden')) toggleHist();
}

const favs = () => getItem('is_fav', []) || [];
const fvk = it => `${active}|${P.cat}|${P.lv}|${it.i}`;

function updFav() {
  const b = $('pFav');
  if (!b || !P.list.length) return;
  const on = favs().some(f => f.k === fvk(P.list[P.i]));
  b.classList.toggle('on', on);
  b.title = b.ariaLabel = on ? 'Remove from favorites' : 'Add to favorites';
}

function toggleFav() {
  if (!P.list.length) return;
  playTapSound();
  const it = P.list[P.i];
  const k = fvk(it);
  let a = favs();
  if (a.some(f => f.k === k)) {
    a = a.filter(f => f.k !== k);
    toast('Removed from favorites');
  } else {
    a.push({ k, n: active, c: P.cat, l: P.lv, i: it.i });
    toast('Added to favorites');
  }
  setItem('is_fav', a);
  updFav();
}

function openFav(c, l, i) {
  playTapSound();
  pcLv = l;
  setItem('is_pclv', l);
  pcGo(c, Math.max(0, bank(c, l).findIndex(x => x.i === i)));
}


function fillHomeGrid() {
  if (!LEVELS[pcLv]) pcLv = 'fresher';
  $('hSeg').innerHTML = Object.entries(LEVELS).map(([k, v]) =>
    `<button class="${k === pcLv ? 'on' : ''}" data-lvl="${k}">${esc(v)}</button>`
  ).join('');

  $('hSeg').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      playTapSound();
      homeLevel(btn.dataset.lvl);
    });
  });

  $('hPath').innerHTML = '<div class="pgrid">' + Object.keys(CATS).map(c => {
    const [col, d] = PCI[c] || ['#6a1bff', 'M12 3l9 9-9 9-9-9z'];
    return `<button class="pt" data-c="${c}"><span class="pc" style="background:${col}"><svg viewBox="0 0 24 24"><path d="${d}"/></svg></span><span class="pl">${esc(CATS[c])}</span></button>`;
  }).join('') + `<button class="pt" id="favT" aria-label="Favorite Question"><span class="pc" style="background:#f59e0b"><svg viewBox="0 0 24 24" style="fill:#fff"><path d="${IC.star}"/></svg></span><span class="pl">Favorite Question</span></button></div>`;

  $('hPath').querySelectorAll('.pt[data-c]').forEach(btn => {
    btn.addEventListener('click', () => {
      playTapSound();
      openCS(btn.dataset.c);
    });
  });

  $('favT')?.addEventListener('click', () => {
    playTapSound();
    toggleFavList();
  });
}

function homeLevel(v) {
  pcLv = v;
  setItem('is_pclv', v);
  fillHomeGrid();
  fillFavList();
}

function openCS(c) {
  csC = c;
  $('csT').textContent = `${CATS[c]} · ${LEVELS[pcLv]}`;
  setBannerSuppressed('sheet', true);
  $('csheet').classList.remove('hidden');
}

function closeCS() {
  $('csheet').classList.add('hidden');
  setBannerSuppressed('sheet', false);
}

function csGo(m, c0) {
  const c = c0 || csC;
  closeCS();
  if (!need(() => csGo(m, c), c)) return;
  if (m === 0) {
    pcGo(c, 0);
    return;
  }
  $('cat').value = c;
  $('lvl').value = pcLv;
  $('cat').dispatchEvent(new Event('change', { bubbles: true }));
  startInterview();
}

const favItems = () =>
  favs()
    .filter(f => f.n === active)
    .map(f => ({ f, it: bank(f.c, f.l).find(x => x.i === f.i) }))
    .filter(x => x.it);

function fillFavList() {
  const fv = favItems();
  if (!fv.length) favOpen = false;
  $('favT')?.classList.toggle('on', favOpen);
  $('favList').innerHTML = favOpen
    ? fv.map(({ f, it }) =>
        `<button class="favr" data-c="${f.c}" data-l="${f.l}" data-i="${f.i}">${esc(it.q)}<small>${esc(CL(f.c, f.l))}</small></button>`
      ).join('')
    : '';

  $('favList').querySelectorAll('.favr').forEach(btn => {
    btn.addEventListener('click', () => {
      openFav(btn.dataset.c, btn.dataset.l, parseInt(btn.dataset.i, 10));
    });
  });
}

function toggleFavList() {
  if (!favItems().length) {
    toast('No favorite questions yet');
    return;
  }
  favOpen = !favOpen;
  fillFavList();
  if (favOpen) $('favList').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function streakToast() {
  playTapSound();
  const n = parseInt($('hStreak').dataset.n, 10) || 0;
  toast(n ? `${n} day streak. Keep going!` : 'No streak yet. Finish a mock interview to start one.');
}

function retryLast() {
  playTapSound();
  const x = (getItem('is_hist', []) || [])[0];
  if (x && x.ck && CATS[x.ck] && LEVELS[x.lk]) {
    $('cat').value = x.ck;
    $('lvl').value = x.lk;
  }
  startInterview();
}

function fillHome() {
  stats();
  if (!$('lvl').options.length) {
    $('lvl').innerHTML = Object.entries(LEVELS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
  }
  if (!$('cat').options.length) {
    $('cat').innerHTML = Object.entries(CATS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
  }

  fillHx();
  fillHomeGrid();
  fillFavList();
}

function setActive(n) {
  active = n;
  setItem('is_active', n);
}

// Profile Section
const ABOUT = [
  ['Education / role', p => p.edu || p.degree],
  ['City', p => p.city],
  ['Experience', p => EXPERIENCE[p.exp]],
  ['Skills', p => p.skills]
];

function toggleHist() {
  playTapSound();
  const k = $('hList');
  const h = k.classList.toggle('hidden');
  $('hEye').dataset.i = h ? 'eye' : 'eyeoff';
  $('hEye').title = $('hEye').ariaLabel = h ? 'Show history' : 'Hide history';
  renderIcons();
}

// Tapping the name in the Profile hero shows or hides the "About you" details.
function toggleAbout() {
  playTapSound();
  setAbout($('pKv').classList.contains('hidden'));
}

function setAbout(open) {
  $('pKv').classList.toggle('hidden', !open);
  const w = $('pWho');
  w.setAttribute('aria-expanded', String(open));
  w.title = open ? 'Hide details' : 'Show details';
  $('pMore').textContent = open ? 'Tap to hide details' : 'Tap to see details';
}

function showProfile() {
  fillHome();
  if (!active || !profiles[active]) return openSetup(() => showProfile(), { fresh: true });
  const p = profiles[active];
  const h = getItem('is_hist', []) || [];

  $('pAv').textContent = ini(p.name);
  $('pNm').textContent = p.name;
  $('pRl').textContent = p.role || '';
  $('pN').textContent = h.length;
  $('pB').textContent = h.length ? `${Math.max(...h.map(x => x.s))}/10` : '-';
  $('pAvg').textContent = h.length ? (h.reduce((t, x) => t + x.s, 0) / h.length).toFixed(1) : '-';
  $('pHistSub').textContent = h.length ? `${h.length} interview${h.length === 1 ? '' : 's'} · last ${h[0].s}/10` : 'No interviews yet';

  $('pKv').innerHTML = ABOUT.map(([t, f]) => {
    const v = f(p);
    return `<div><span>${t}</span><b>${v ? esc(v) : 'Not added yet'}</b></div>`;
  }).join('');

  renderHist();
  renderVoiceSettings();
  syncThemeSwitch();
  setAbout(false);
  $('hList').classList.add('hidden');
  $('hEye').dataset.i = 'eye';

  show('form');
}

function editProfile() {
  playTapSound();
  openSetup(() => showProfile());
}

// Mock and Practice need the setup details first. `go` runs after they are saved.
// `cat` is the interview type the user just picked: it fills in the target role.
function need(go, cat = '') {
  if (setupDone(profiles[active])) return true;
  openSetup(go || null, { cat });
  return false;
}

// ---- Setup screen: your details, before the first Mock or Practice session ----
let setupThen = null; // what to open after saving
let setupNew = false; // create a new profile instead of editing the active one
let sData = null; // form state while the setup screen is open
let sStep = 0;
const SETUP_STEPS = 2;
const SETUP_TITLES = ['About you', 'Your goal and voice'];

function openSetup(then = null, { fresh = false, step = 0, cat = '' } = {}) {
  setupThen = then;
  setupNew = fresh;
  const p = !fresh && profiles[active] ? profiles[active] : {};
  const custom = p.role && !ROLES.includes(p.roleKey || p.role);
  sData = {
    name: p.name || '',
    edu: p.edu || p.degree || '',
    city: p.city || '',
    role: custom ? 'Other' : p.roleKey || p.role || catToRole(cat),
    roleOther: custom ? p.role : '',
    exp: EXPERIENCE[p.exp] ? p.exp : 'fresher',
    skills: p.skillTags || (p.skills ? String(p.skills).split(/,\s*|\s+and\s+/).map(x => x.trim()).filter(Boolean).slice(0, MAX_SKILLS) : []),
    accent: voiceAccent(),
    before: { name: p.name || '', city: p.city || '' }
  };
  sStep = step;
  show('setup');
}

// Profile, Mock and Practice: "Edit my details" goes back to the same screen after saving.
function editDetails() {
  playTapSound();
  openSetup(() => history.back());
}

function readSetup() {
  if (!sData) return;
  sData.name = $('sName').value.replace(/\s+/g, ' ').trim();
  sData.edu = $('sEdu').value.trim();
  sData.city = $('sCity').value.trim();
  sData.role = $('sRole').value;
  sData.roleOther = $('sRoleOther').value.trim();
  sData.accent = $('sAccent').value;
}

function renderSetup() {
  if (!sData) openSetup();
  $('sName').value = sData.name;
  $('sEdu').value = sData.edu;
  $('sCity').value = sData.city;
  $('sRole').innerHTML = '<option value="">Choose your target role</option>' + ROLES.map(r => `<option${r === sData.role ? ' selected' : ''}>${esc(r)}</option>`).join('');
  $('sRoleOther').value = sData.roleOther;
  $('sRoleOther').classList.toggle('hidden', sData.role !== 'Other');
  $('sExp').innerHTML = Object.entries(EXPERIENCE)
    .map(([k, v]) => `<button type="button" role="radio" aria-checked="${k === sData.exp}" class="${k === sData.exp ? 'on' : ''}" data-exp="${k}">${esc(v)}</button>`)
    .join('');
  $('sAccent').innerHTML = Object.entries(VOICE_ACCENTS).map(([k, v]) => `<option value="${k}"${k === sData.accent ? ' selected' : ''}>${esc(v.label)}</option>`).join('');
  renderTags('sSkills', sData.skills, MAX_SKILLS);
  renderSuggestions();
  showSetupStep();
  nameCheck(false);
}

function showSetupStep() {
  document.querySelectorAll('#setup .sstp').forEach(el => el.classList.toggle('hidden', Number(el.dataset.step) !== sStep));
  $('sBar').style.width = `${((sStep + 1) / SETUP_STEPS) * 100}%`;
  $('sStepT').textContent = `Step ${sStep + 1} of ${SETUP_STEPS} · ${SETUP_TITLES[sStep]}`;
  $('sBack').textContent = sStep ? 'Back' : 'Cancel';
  $('sNext').textContent = sStep < SETUP_STEPS - 1 ? 'Next' : setupThen ? 'Save and start' : 'Save';
  $('main').scrollTop = 0;
}

function nameCheck(show) {
  const err = nameError($('sName').value);
  const box = $('sName');
  box.setAttribute('aria-invalid', String(!!err && show));
  $('sNameErr').textContent = show ? err : '';
  box.classList.toggle('bad', !!err && show);
  box.classList.toggle('good', !err);
  return !err;
}

function setupStep(d) {
  playTapSound();
  readSetup();
  if (d < 0 && sStep === 0) return history.back();
  if (d > 0 && sStep === 0 && !nameCheck(true)) {
    playErrorBeep();
    $('sName').focus();
    return;
  }
  if (d > 0 && sStep === SETUP_STEPS - 1) return saveSetup();
  sStep = Math.max(0, Math.min(SETUP_STEPS - 1, sStep + d));
  showSetupStep();
}

function saveSetup() {
  readSetup();
  if (!nameCheck(true)) {
    sStep = 0;
    showSetupStep();
    return;
  }
  const oldName = setupNew ? '' : active;
  const old = oldName && profiles[oldName] ? profiles[oldName] : {};
  const p = buildProfile(sData, old);
  if (oldName && oldName !== p.name) {
    delete profiles[oldName];
    [E, QE].forEach(o =>
      Object.keys(o).forEach(k => {
        if (k.startsWith(oldName + '|')) {
          o[p.name + k.slice(oldName.length)] = o[k];
          delete o[k];
        }
      })
    );
    setItem('is_edits', E);
    setItem('is_qedits', QE);
    // Favourites and Practice best scores are keyed by the name too: move them with it.
    const re = k => (String(k).startsWith(oldName + '|') ? p.name + String(k).slice(oldName.length) : k);
    setItem('is_fav', favs().map(f => (f.n === oldName ? { ...f, n: p.name, k: re(f.k) } : f)));
    const pb = pBest();
    setItem('is_pbest', Object.fromEntries(Object.entries(pb).map(([k, v]) => [re(k), v])));
  }
  profiles = { [p.name]: p }; // one profile at a time
  setItem('is_profiles', profiles);
  setActive(p.name);
  setAccentPref(sData.accent);
  setVoiceAccent(voiceAccent());
  sData = null;
  toast('Saved on this phone');
  const go = setupThen;
  setupThen = null;
  if (go) go();
  else showProfile();
}

// Tag inputs (skills, My words): Enter or comma adds a tag, the x button removes it.
function renderTags(id, list, max) {
  const box = $(id);
  const input = box.querySelector('input');
  box.querySelectorAll('.tg').forEach(t => t.remove());
  list.forEach((t, i) => {
    const el = document.createElement('span');
    el.className = 'tg';
    el.innerHTML = `<span>${esc(t)}</span><button type="button" data-k="${i}" aria-label="Remove ${esc(t)}">&times;</button>`;
    box.insertBefore(el, input);
  });
  input.disabled = list.length >= max;
  input.placeholder = list.length >= max ? `Up to ${max}` : input.dataset.ph;
  const c = box.parentElement.querySelector('.tcount');
  if (c) c.textContent = `${list.length}/${max}`;
}

function addTag(kind, value) {
  if (!sData) return;
  const max = MAX_SKILLS;
  const parts = String(value || '').split(',').map(x => x.trim()).filter(Boolean);
  if (!parts.length) return;
  sData[kind] = cleanTags([...sData[kind], ...parts], max);
  renderTags('sSkills', sData[kind], max);
  renderSuggestions();
}

function renderSuggestions() {
  const q = ($('sSkillIn').value || '').trim().toLowerCase();
  const have = new Set(sData.skills.map(x => x.toLowerCase()));
  // Suggestions for the chosen target role first, then the general interview list.
  const pool = [...new Set([...(ROLE_SKILLS[$('sRole').value] || []), ...(q ? SKILL_SUGGESTIONS : [])])];
  const list = (pool.length ? pool : SKILL_SUGGESTIONS).filter(x => !have.has(x.toLowerCase()) && (!q || x.toLowerCase().includes(q))).slice(0, 8);
  $('sSugg').innerHTML = sData.skills.length >= MAX_SKILLS ? '' : list.map(x => `<button type="button" class="sg" data-s="${esc(x)}">+ ${esc(x)}</button>`).join('');
}

function initSetup() {
  $('sName').addEventListener('input', () => nameCheck(true));
  $('sName').addEventListener('blur', () => nameCheck(true));
  $('sRole').addEventListener('change', () => {
    $('sRoleOther').classList.toggle('hidden', $('sRole').value !== 'Other');
    renderSuggestions();
  });
  $('sExp').addEventListener('click', e => {
    const b = e.target.closest('[data-exp]');
    if (!b || !sData) return;
    playTapSound();
    sData.exp = b.dataset.exp;
    $('sExp').querySelectorAll('button').forEach(x => {
      x.classList.toggle('on', x === b);
      x.setAttribute('aria-checked', String(x === b));
    });
  });
  [['sSkills', 'skills']].forEach(([id, kind]) => {
    const box = $(id);
    const input = box.querySelector('input');
    input.dataset.ph = input.placeholder;
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const v = input.value;
        input.value = '';
        addTag(kind, v);
      } else if (e.key === 'Backspace' && !input.value && sData && sData[kind].length) {
        sData[kind].pop();
        renderTags(id, sData[kind], MAX_SKILLS);
      }
    });
    input.addEventListener('input', () => {
      if (input.value.includes(',')) {
        const v = input.value;
        input.value = '';
        addTag(kind, v);
      }
      renderSuggestions();
    });
    input.addEventListener('blur', () => {
      if (input.value.trim()) {
        const v = input.value;
        input.value = '';
        addTag(kind, v);
      }
    });
    box.addEventListener('click', e => {
      const b = e.target.closest('button[data-k]');
      if (b && sData) {
        playTapSound();
        sData[kind].splice(Number(b.dataset.k), 1);
        renderTags(id, sData[kind], MAX_SKILLS);
        renderSuggestions();
      } else input.focus();
    });
  });
  // Tapping a suggestion must not blur the input first (that would save the half-typed text).
  $('sSugg').addEventListener('pointerdown', e => e.target.closest('[data-s]') && e.preventDefault());
  $('sSugg').addEventListener('mousedown', e => e.target.closest('[data-s]') && e.preventDefault());
  $('sSugg').addEventListener('click', e => {
    const b = e.target.closest('[data-s]');
    if (!b) return;
    playTapSound();
    $('sSkillIn').value = '';
    addTag('skills', b.dataset.s);
  });
}

// Practice Flow
function startMock() {
  playTapSound();
  show('mock'); // pick the interview type first; the details form comes after (startInterview)
}

function fillMock() {
  fillHome();
  $('mcat').innerHTML = $('cat').innerHTML;
  $('mlvl').innerHTML = $('lvl').innerHTML;
  $('mcat').value = $('cat').value;
  $('mlvl').value = $('lvl').value;
  $('mtip').textContent = TIPS[new Date().getDate() % TIPS.length];
  renderMockPicker();
}

// Mock page picker: same level tabs and category grid as Practice. Pick the level, then tap a
// tile: the interview starts at once with that type and level.
function renderMockPicker() {
  const c0 = $('mcat').value;
  const l0 = $('mlvl').value;
  $('mSeg').innerHTML = Object.entries(LEVELS).map(([k, v]) =>
    `<button class="${k === l0 ? 'on' : ''}" data-lvl="${k}" role="tab" aria-selected="${k === l0}">${esc(v)}</button>`
  ).join('');
  $('mSeg').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => mPick(c0, btn.dataset.lvl));
  });

  $('mGrid').innerHTML = Object.keys(CATS).map(c => {
    const [col, d] = PCI[c] || ['#6a1bff', 'M12 3l9 9-9 9-9-9z'];
    // No tile is pre-selected: tapping one starts the interview.
    return `<button class="mt" data-c="${c}" style="--c:${col}"><span class="mc"><svg viewBox="0 0 24 24"><path d="${d}"/></svg><i class="mck" aria-hidden="true"></i></span><span class="pl">${esc(CATS[c])}</span></button>`;
  }).join('');
  $('mGrid').querySelectorAll('.mt').forEach(btn => {
    btn.addEventListener('click', () => {
      mPick(btn.dataset.c, $('mlvl').value);
      startInterview();
    });
  });
}

function mPick(c, l) {
  playTapSound();
  $('mcat').value = c;
  $('mlvl').value = l;
  mSync();
  renderMockPicker();
}

function mSync() {
  $('cat').value = $('mcat').value;
  $('lvl').value = $('mlvl').value;
  $('cat').dispatchEvent(new Event('change', { bubbles: true }));
}

function startPractice() {
  playTapSound();
  show('pcat'); // pick the interview type first; the details form comes after (pcGo)
}

function pcLevel(v) {
  playTapSound();
  pcLv = v;
  setItem('is_pclv', v);
  fillPcat();
}

function pcGo(c, i, lv, one = null) {
  playTapSound();
  if (!need(() => pcGo(c, i, lv, one), c)) return;
  const v = LEVELS[lv] ? lv : pcLv;
  P = { cat: c, lv: v, list: [], i: 0, one };
  const l = (P.list = plist());
  if (!l.length) {
    addQ();
    return;
  }
  P.i = Math.min(i || 0, l.length - 1);
  show('practice');
}

function fillPcat() {
  if (!LEVELS[pcLv]) pcLv = 'fresher';
  $('pSeg').innerHTML = Object.entries(LEVELS).map(([k, v]) =>
    `<button class="${k === pcLv ? 'on' : ''}" data-lvl="${k}">${esc(v)}</button>`
  ).join('');

  $('pSeg').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => pcLevel(btn.dataset.lvl));
  });

  $('pPath').innerHTML = '<div class="pgrid">' + Object.keys(CATS).map(c => {
    const [col, d] = PCI[c] || ['#6a1bff', 'M12 3l9 9-9 9-9-9z'];
    return `<button class="pt" data-c="${c}"><span class="pc" style="background:${col}"><svg viewBox="0 0 24 24"><path d="${d}"/></svg></span><span class="pl">${esc(CATS[c])}</span></button>`;
  }).join('') + '</div>';

  $('pPath').querySelectorAll('.pt').forEach(btn => {
    btn.addEventListener('click', () => pcGo(btn.dataset.c, 0));
  });
}

function saveA() {
  playTapSound();
  const it = P.list[P.i];
  const v = $('pEdit').value.trim();
  const q = $('pEditQ').value.trim();
  const k = ekey(it);
  if (!q) {
    playErrorBeep();
    customAlert('Question cannot be empty.');
    return;
  }
  if (v) E[k] = v;
  else delete E[k];

  const orig = bank0(it);
  if (q && q !== orig) QE[k] = q;
  else delete QE[k];

  setItem('is_edits', E);
  setItem('is_qedits', QE);
  P.list = plist();
  pr();
}

function bank0(it) {
  const k = ekey(it);
  const e = QE[k];
  delete QE[k];
  const o = (bank(P.cat, P.lv).find(x => x.i === it.i) || {}).q;
  if (e !== undefined) QE[k] = e;
  return o;
}

const ch = x => [...x].map(c => `<span class="c">${esc(c)}</span>`).join('');

function pWords(t) {
  $('pA').innerHTML = t.split(/(\s+)/).map(x => (/\S/.test(x) ? `<span class="pw">${ch(x)}</span>` : esc(x))).join('');
  PW = [...$('pA').querySelectorAll('.pw')];
  $('pA').scrollTop = 0;
}

function pReveal(q) {
  clearTimeout(pRv);
  $('pMic').classList.add('mwait');
  const qe = $('pQt');
  qe.innerHTML = q.split(' ').map(x => `<span class="qw">${ch(x)}</span>`).join(' ');
  const L = [...qe.querySelectorAll('.c'), ...$('pA').querySelectorAll('.c')];
  const ql = qe.querySelectorAll('.c').length;
  let n = 0;
  const go = () => {
    if (!L.length) {
      $('pMic').classList.remove('mwait');
      return;
    }
    L[n++].classList.add('in');
    if (n >= L.length) {
      $('pMic').classList.remove('mwait');
      return;
    }
    pRv = setTimeout(go, n < ql ? 85 : 70);
  };
  pRv = setTimeout(go, 150);
}

function pFinish() {
  clearTimeout(pRv);
  $('pMic').classList.remove('mwait');
  [...$('pQt').querySelectorAll('.c'), ...$('pA').querySelectorAll('.c')].forEach(x => x.classList.add('in'));
}

function hlTo(k) {
  PW.forEach((x, i) => {
    x.classList.toggle('hl', i < k);
    x.classList.remove('miss');
  });
  const a = $('pA');
  const x = PW[Math.min(k, PW.length) - 1];
  if (x && k > 0 && (x.offsetTop + x.offsetHeight > a.scrollTop + a.clientHeight - 10 || x.offsetTop < a.scrollTop)) {
    a.scrollTop = Math.max(0, x.offsetTop - a.clientHeight / 3);
  }
}

// Stop voice input, read aloud and word animations (screen change, app in background).
function stopMedia() {
  pMicOn = false;
  mMicOn = false;
  cancelListening();
  $('pMic').classList.remove('on');
  $('mic').classList.remove('on');
  pMicNote('');
  stopSpeaking();
  clearInterval(rv);
  clearTimeout(rv);
  clearTimeout(pRv);
}

function stopMic() {
  stopMedia();
}

function pr() {
  stopMic();
  pSpoken = [];
  const n = P.list.length;
  $('pEmpty').classList.toggle('hidden', !!n);
  $('pCard').classList.toggle('hidden', !n);
  if (!n) {
    $('pCount').textContent = '';
    cancelA();
    return;
  }
  if (P.i >= n) P.i = n - 1;
  const it = P.list[P.i];
  const ed = (ekey(it) in E) || (ekey(it) in QE);
  $('pCount').textContent = `${CL(P.cat, P.lv)} · ${P.i + 1} / ${n}`;
  pWords(ansText(it) || 'No answer yet. Tap the pencil to write one.');
  pReveal(it.q);
  renderPRes(null);
  pLive('');
  const best = pBest()[ekey(it)];
  $('pBestTag').textContent = best != null ? `Best ${best}%` : '';
  $('pBestTag').classList.toggle('hidden', best == null);
  $('pTag').classList.toggle('hidden', !ed);
  $('pReset').classList.toggle('hidden', !ed);
  dots();
  cancelA();
  renderIcons();
  updFav();
  pAutoRead(it);
}

// Practice: read the question, then the answer, aloud when a new question opens (Read aloud on).
let pAutoKey = '';
function pAutoRead(it) {
  const k = `${P.cat}|${P.lv}|${it.i}`;
  if (k === pAutoKey || !$('rd').checked || $('intro')) return; // never behind the welcome screen
  pAutoKey = k;
  const card = P.i;
  speak(it.q).then(r => {
    if (r.ok && cs === 'practice' && P.i === card && !isSpeaking()) readA(true);
  });
}

// Header mute button (shown only while reading aloud): stop reading.
function muteSpeech() {
  playTapSound();
  stopSpeaking();
  clearInterval(rv);
  clearTimeout(rv);
  if (cs === 'practice') hlTo(0);
  document.querySelectorAll('#qText .w').forEach(x => x.classList.add('in'));
}

function dots() {
  const n = P.list.length;
  const W = 9;
  const s = Math.max(0, Math.min(P.i - 4, n - W));
  const e = Math.min(n, s + W);
  let h = '';
  for (let k = s; k < e; k++) {
    const sm = ((k === s && s > 0) || (k === e - 1 && e < n)) && k !== P.i;
    h += `<button class="dot${k === P.i ? ' on' : ''}${sm ? ' sm' : ''}" data-k="${k}" aria-label="Question ${k + 1}"></button>`;
  }
  $('pDots').innerHTML = h;
  $('pDots').querySelectorAll('.dot').forEach(d => {
    d.addEventListener('click', () => pGo(parseInt(d.dataset.k, 10)));
  });
}

function slide(d) {
  const c = $('pCard');
  c.classList.remove('sl', 'sr');
  void c.offsetWidth;
  c.classList.add(d > 0 ? 'sl' : 'sr');
}

// Practice: every Nth question the user moves forward to is a natural break for an interstitial.
let practiceForwardMoves = 0;

function pGo(k) {
  if (k === P.i || k < 0 || k >= P.list.length) return;
  const forward = k > P.i;
  // Read these before pr(), which stops the mic.
  const wasRecording = isListening();
  const wasTyping = !$('pEdit').classList.contains('hidden') || isTypingNow();
  slide(forward ? 1 : -1);
  P.i = k;
  pr();
  saveScr();
  if (forward && ++practiceForwardMoves % ADS_CONFIG.interstitialPracticeEvery === 0) {
    practiceBreak(wasRecording, wasTyping);
  }
}

function practiceBreak(wasRecording, wasTyping) {
  const name = 'practice_question_' + practiceForwardMoves;
  // Never while recording or typing; skip silently and continue.
  if (wasRecording) return skipInterstitialBreak(name, 'recording');
  if (wasTyping) return skipInterstitialBreak(name, 'typing');
  showInterstitialAtBreak(name).then(shown => shown && stopMedia()); // no reading aloud behind the ad
}

function isTypingNow() {
  const a = document.activeElement;
  return !!a && (a.tagName === 'TEXTAREA' || a.tagName === 'INPUT');
}

function blurTyping() {
  if (isTypingNow()) document.activeElement.blur();
}

function pStep(d) {
  pGo(P.i + d);
}

function editA(f) {
  if (!P.list.length) return;
  playTapSound();
  stopMic();
  pFinish();
  $('pEdit').value = ansText(P.list[P.i]);
  $('pEditQ').value = P.list[P.i].q;
  ['pCard', 'pMicWrap', 'pMicSt', 'pEditBtn', 'pDots', 'pDone'].forEach(i => $(i).classList.add('hidden'));
  ['pEditQ', 'pEdit', 'pEditBtns', 'pEditMore'].forEach(i => $(i).classList.remove('hidden'));
  if (typeof f === 'string') {
    const t = $(f);
    t.focus();
    t.setSelectionRange(t.value.length, t.value.length);
  }
}

function cancelA() {
  const has = P.list.length > 0;
  const last = P.i === P.list.length - 1;
  $('pCard').classList.toggle('hidden', !has);
  ['pMicWrap', 'pEditBtn'].forEach(i => $(i).classList.toggle('hidden', !has));
  $('pMicSt').classList.toggle('hidden', !has || !voiceOK || !PRACTICE_MIC);
  $('pDots').classList.toggle('hidden', !has || P.one != null);
  $('pDone').classList.toggle('hidden', !has || !last);
  ['pEditQ', 'pEdit', 'pEditBtns', 'pEditMore'].forEach(i => $(i).classList.add('hidden'));
}

const NO_VOICE_MSG = 'Voice input is not available on this phone (no speech recognition service). You can type instead.';

// Everything that must pass before the mic starts: service, internet, permission.
async function prepareVoice(notify) {
  if (!voiceOK) voiceOK = await isVoiceAvailable();
  if (!voiceOK) {
    notify(NO_VOICE_MSG);
    updateMicButtons();
    return false;
  }
  if (!(await requireOnline('voice', notify))) return false;

  let st = await micPermission();
  if (st === 'granted') return true;
  if (st === 'denied') return micBlocked();
  // Straight to Android's own permission dialog (no second popup from the app).
  st = await requestMicPermission();
  if (st === 'granted') return true;
  if (st === 'denied') return micBlocked();
  notify('Microphone permission was not given. You can type your answer instead.');
  return false;
}

// Android will not ask again: explain and offer a button to this app's page in Settings.
async function micBlocked() {
  const open = await ask(
    'Microphone is blocked',
    'Voice input needs the microphone. Tap Open settings, then Permissions > Microphone > Allow. You can still type your answer.',
    'Open settings',
    'Not now',
    '🎙️'
  );
  if (open && !(await openAppSettings())) toast('Open Android Settings > Apps > Interview Simulator > Permissions > Microphone.');
  return false;
}

// Practice mic is switched off for now (the code stays). To bring it back, set this to true.
const PRACTICE_MIC = false;

// Hide mic buttons when the phone has no speech recognition service.
function updateMicButtons() {
  $('pMic').classList.toggle('hidden', !voiceOK || !PRACTICE_MIC);
  $('pMicSt').classList.toggle('hidden', !voiceOK || !PRACTICE_MIC);
  $('mic').classList.toggle('hidden', !voiceOK);
  if (!voiceOK) $('micSt').textContent = 'Voice input is not available on this phone. Type your answer.';
}

// Read-along: paint said words (green) and skipped words (orange), scroll to the last one.
function pPaint(state, pos) {
  PW.forEach((x, i) => {
    x.classList.toggle('hl', state[i] === 'ok');
    x.classList.toggle('miss', state[i] === 'miss');
  });
  const a = $('pA');
  const x = PW[Math.min(pos, PW.length) - 1];
  if (x && (x.offsetTop + x.offsetHeight > a.scrollTop + a.clientHeight - 10 || x.offsetTop < a.scrollTop)) {
    a.scrollTop = Math.max(0, x.offsetTop - a.clientHeight / 3);
  }
}


// Mic button grows a little with your voice, so you can see it is hearing you.
function micLevel(el, db) {
  const v = Math.max(0, Math.min(1, (db + 2) / 12));
  el.style.setProperty('--lvl', v.toFixed(2));
}

const PMIC_IDLE = 'Tap the mic and read the answer aloud';
function pMicNote(m) {
  const el = $('pMicSt');
  if (el) el.textContent = m || PMIC_IDLE;
}

// Hints for saying a saved answer: only the user's name and city, then the answer's own words
// (rare ones first). A short, focused list biases the recognizer more than 100 general words.
const SILENT_RESTARTS = 5; // Practice: keep listening through about 15 s of silence
const MOCK_SILENT_RESTARTS = 2; // Mock: stop after about 6 to 7 s of silence
function answerHints(ref) {
  const p = profiles[active] || {};
  const own = [p.name, ...String(p.name || '').split(/\s+/), p.city].filter(Boolean);
  const words = String(ref || '')
    .split(/\s+/)
    .map(w => w.replace(/[^\w'+#./-]/g, '').replace(/[.]+$/, ''))
    .filter(w => w.length > 1);
  return [...new Set([...own, ...rareWords(ref, 40), ...words])].slice(0, 60);
}

// ---- Practice: expected-text matching ----
// The saved answer is shown; the phone's words are aligned to it and the saved words are written.
const pBest = () => getItem('is_pbest', {}) || {};
const pIdx = () => PW.map((x, i) => (norm(x.textContent) ? i : -1)).filter(i => i >= 0);

// Paint the saved answer from an alignment: said = green, corrected = green with a dot,
// missed = red underline. Scroll to the last said word.
function pPaintAlign(r) {
  const ids = pIdx();
  const st = {};
  r.ops.forEach(o => {
    if (o.j != null) st[ids[o.j]] = o.type;
  });
  let lastOk = -1;
  PW.forEach((x, i) => {
    const t = st[i];
    x.classList.toggle('hl', t === 'match' || t === 'fix');
    x.classList.toggle('fixd', t === 'fix');
    x.classList.toggle('miss', t === 'missed');
    if (t === 'match' || t === 'fix') lastOk = i;
  });
  const a = $('pA');
  const x = PW[lastOk];
  if (x && (x.offsetTop + x.offsetHeight > a.scrollTop + a.clientHeight - 10 || x.offsetTop < a.scrollTop)) {
    a.scrollTop = Math.max(0, x.offsetTop - a.clientHeight / 3);
  }
}

// What the app wrote for this attempt, with colours, the match score and the best score.
function renderPRes(r, final) {
  const box = $('pRes');
  if (!r) {
    box.classList.add('hidden');
    return;
  }
  const html = r.ops
    .map(o => {
      if (o.type === 'match') return `<span class="rm">${esc(o.expected)}</span>`;
      if (o.type === 'fix') return `<span class="rf" title="Heard: ${esc(o.heard)}">${esc(o.expected)}</span>`;
      if (o.type === 'extra') return `<span class="rx" title="Not in your answer">${esc(o.heard)}</span>`;
      return '';
    })
    .filter(Boolean)
    .join(' ');
  const best = pBest()[ekey(P.list[P.i])];
  box.innerHTML = `<div class="prtext">${html || '<span class="prwait">Your words appear here.</span>'}</div>
<div class="prfoot"><b class="prscore">${final ? 'Match' : 'So far'} ${r.score}%</b>${best != null ? `<span>Best ${best}%</span>` : ''}
<span class="prkey"><i class="k1"></i>said <i class="k2"></i>corrected <i class="k3"></i>extra <i class="k4"></i>missed</span></div>`;
  box.classList.remove('hidden');
}

function pLive(t) {
  const el = $('pLive');
  el.textContent = t || '';
  el.classList.toggle('hidden', !t);
}

async function togglePMic() {
  playTapSound();
  if (pMicOn || isListening()) {
    pMicOn = false;
    $('pMic').classList.remove('on');
    pMicNote('Finishing...');
    stopListening(); // the last phrase still arrives, then onEnd shows the result
    return;
  }
  stopSpeaking(); // the speaker must not be talking into the mic
  clearInterval(rv);
  if (!(await prepareVoice(toast))) return;
  if (cs !== 'practice') return;

  pFinish();
  hlTo(0);
  pSpoken = [];
  pMicOn = true;
  const card = P.i;
  const it = P.list[P.i];
  const ref = ansText(it);
  let finished = false;
  let readyOnce = false;
  const here = () => cs === 'practice' && P.i === card;
  const heard = (extra = '') => [...pSpoken, extra].filter(Boolean).join(' ');
  const update = final => {
    const r = alignToExpected(heard(), ref, { partial: !final });
    pPaintAlign(r);
    renderPRes(r, final);
    return r;
  };
  const finishAttempt = () => {
    const r = update(true);
    if (!r.matched) return toast('No words of your answer were heard. Tap the mic to try again.');
    markQotd(P.cat, P.lv, it.q);
    const k = ekey(it);
    const all = pBest();
    if (all[k] == null || r.score > all[k]) {
      all[k] = r.score;
      setItem('is_pbest', all);
      renderPRes(r, true);
    }
    notePractice({
      expected: ref,
      heard: heard(),
      text: r.text,
      score: r.score,
      matched: r.matched,
      total: r.total,
      extra: r.extra,
      missed: r.missed,
      alignment: r.ops.map(o => (o.type === 'extra' ? `+${o.heard}` : o.type === 'missed' ? `-${o.expected}` : o.type === 'fix' ? `${o.heard}>${o.expected}` : o.expected)).join(' ')
    });
    if (r.score >= 80) {
      fireConfetti();
      // Sound is muted while the mic is on (no beeps); play the chime once it is back.
      setTimeout(playSuccessChime, 900);
    }
    toast(r.missed ? `${r.score}% matched. ${r.missed} word${r.missed === 1 ? '' : 's'} missed (red).` : r.extra ? `${r.score}% matched. Extra words are amber.` : 'Perfect! You said it all 🎉');
  };
  let doneT = null;
  // The last word was said: wait 2 s (the user may still be finishing), then end the attempt.
  const completeSoon = () => {
    if (!doneT) doneT = setTimeout(complete, DONE_WAIT_MS);
  };
  const complete = () => {
    if (finished) return;
    finished = true;
    pMicOn = false;
    $('pMic').classList.remove('on');
    pMicNote('');
    pLive('');
    stopListening();
    finishAttempt();
  };
  // N-best: the guess that matches the most words of the saved answer wins (then the phone's order).
  const choose = cands => {
    let best = cands[0];
    let bestN = -1;
    cands.forEach(c => {
      const n = alignToExpected(heard(c.text), ref, { partial: true }).matched;
      if (n > bestN) {
        best = c;
        bestN = n;
      }
    });
    return { text: best.text, index: best.index, changes: [], why: `best fit to your answer (${bestN} words)` };
  };
  $('pMic').classList.add('on');
  pMicNote('Getting the mic ready...');
  renderPRes(update(false), false);

  const started = await startListening({
    // Hints: the user's own words first, then the words of the saved answer (rare ones first).
    bias: answerHints(ref),
    silentRestarts: SILENT_RESTARTS,
    choose,
    // Live words that are mostly from the saved answer are kept even if the phone sends no final.
    keepLive: t => alignToExpected(t, ref, { partial: true }).matched >= Math.max(1, Math.ceil(t.split(/\s+/).filter(w => norm(w)).length / 2)),
    onState: st => {
      if (!here() || finished) return;
      if (st === 'ready' || st === 'listening') readyOnce = true;
      pMicNote(st === 'ready' || st === 'listening' ? 'Speak now. Read at your own pace.' : st === 'starting' ? (readyOnce ? 'Listening...' : 'Getting the mic ready...') : '');
    },
    onLevel: db => micLevel($('pMic'), db),
    onPartial: text => {
      if (!here() || finished) return;
      pLive(text); // grey live bar
      // Highlight the answer words as they are said (saved for good when the phrase is final).
      pPaintAlign(alignToExpected(heard(text), ref, { partial: true }));
    },
    onFinal: text => {
      if (!here() || finished) return;
      pSpoken.push(text);
      pLive('');
      const r = update(false);
      const lastJ = r.total - 1;
      if (r.ops.some(o => (o.type === 'match' || o.type === 'fix') && o.j === lastJ)) completeSoon();
    },
    onEnd: ({ message }) => {
      $('pMic').style.removeProperty('--lvl');
      pLive('');
      if (finished || !here()) {
        pMicOn = false;
        return;
      }
      pMicOn = false;
      $('pMic').classList.remove('on');
      pMicNote('');
      if (!pSpoken.length) {
        renderPRes(null);
        PW.forEach(x => x.classList.remove('hl', 'fixd', 'miss'));
        return message && toast(message);
      }
      finished = true;
      finishAttempt();
    }
  });
  if (!started && pMicOn) {
    pMicOn = false;
    $('pMic').classList.remove('on');
    pMicNote('');
    toast('Could not start voice input. Please try again.');
  }
}

// Practice: listen to the answer with the phone's text-to-speech voice.
async function readA(auto = false) {
  if (!auto) playTapSound();
  if (isSpeaking()) {
    stopSpeaking();
    clearInterval(rv);
    clearTimeout(rv);
    hlTo(0);
    return;
  }
  pMicOn = false;
  cancelListening();
  pFinish();

  const w = PW.map(x => x.textContent);
  const st = [];
  let c = 0;
  w.forEach(x => {
    st.push(c);
    c += x.length + 1;
  });

  let got = false;
  hlTo(0);
  clearInterval(rv);
  // If the engine does not report word positions, move the highlight with a timer.
  rv = setTimeout(() => {
    if (got || !isSpeaking()) return;
    let n = 0;
    rv = setInterval(() => {
      hlTo(++n);
      if (n >= w.length) clearInterval(rv);
    }, 340);
  }, 900);

  const r = await speak(w.join(' '), {
    onWord: charIndex => {
      got = true;
      let k = 0;
      while (k + 1 < st.length && st[k + 1] <= charIndex) k++;
      hlTo(k + 1);
    }
  });
  clearInterval(rv);
  clearTimeout(rv);
  if (r.ok) setTimeout(() => hlTo(0), 500);
  else if (r.reason !== 'stopped') {
    hlTo(0);
    playErrorBeep();
    toast(TTS_MESSAGES[r.reason] || TTS_MESSAGES.error);
  }
}

function addQ() {
  playTapSound();
  $('nq').value = '';
  $('na').value = '';
  show('addq');
}

function saveQ() {
  playTapSound();
  const q = $('nq').value.trim();
  if (!q) {
    playErrorBeep();
    customAlert('Please write the question.');
    return;
  }
  const kk = CK(P.cat, P.lv);
  C[kk] = [...(C[kk] || []), { i: 'u' + Date.now(), q, a: $('na').value.trim() }];
  setItem('is_custom', C);
  P.one = null;
  P.list = plist();
  P.i = P.list.length - 1;
  history.back();
}

function delQ() {
  if (!P.list[P.i]) return;
  playTapSound();
  ask('Delete this question?', 'It will be removed from this interview type. Default questions can be restored from Profile.', 'Delete', 'Keep', '🗑️', true).then(
    y => y && _delQ()
  );
}

function _delQ() {
  const it = P.list[P.i];
  if (!it) return;
  const kk = CK(P.cat, P.lv);
  if (String(it.i).startsWith('u')) {
    C[kk] = C[kk].filter(x => x.i !== it.i);
  } else {
    H[kk] = H[kk] || [];
    H[kk].push(it.i);
  }
  delete E[ekey(it)];
  delete QE[ekey(it)];
  setItem('is_qedits', QE);
  setItem('is_custom', C);
  setItem('is_hidden', H);
  setItem('is_edits', E);
  P.list = plist();
  pr();
}

function restoreQ() {
  playTapSound();
  H = {};
  setItem('is_hidden', H);
  toast('Deleted default questions are back.');
}

function resetA() {
  playTapSound();
  const k = ekey(P.list[P.i]);
  delete E[k];
  delete QE[k];
  setItem('is_edits', E);
  setItem('is_qedits', QE);
  P.list = plist();
  pr();
}

// Mock Interview Flow
function shuffle(a) {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function startInterview() {
  playTapSound();
  if (!need(() => startInterview(), $('cat').value)) return;
  cat = $('cat').value;
  lv = $('lvl').value;
  timerOn = false;
  cur = $('shuf').checked ? shuffle(bank(cat, lv)) : bank(cat, lv);
  if (!cur.length) {
    playErrorBeep();
    customAlert('This type has no questions. Add some in Practice.');
    return;
  }
  idx = 0;
  answers = new Array(cur.length).fill('');
  mHeard = cur.map(() => []);
  mOk = cur.map(() => []);
  show('interview');
  showQ();
}

function showQ() {
  if ($('ansBox').isContentEditable) $('ansBox').blur(); // save typed words to their question
  mMicOn = false;
  $('mic').classList.remove('on');
  stopListening(); // the last phrase of the previous question is still saved to it
  $('qCount').textContent = `${idx + 1}/${cur.length}`;
  reveal(cur[idx].q, $('rd').checked && !$('intro'));
  $('mHintT').classList.add('hidden');
  $('wTip').classList.add('hidden');
  mRender(idx);
  $('qBar').style.width = ((idx + 1) / cur.length) * 100 + '%';
  $('nBtn').dataset.i = idx === cur.length - 1 ? 'check' : 'right';
  mDots();
  renderIcons();
  clearInterval(ti);
  $('tWrap').classList.toggle('hidden', !timerOn);
  if (timerOn) {
    left = 60;
    tick();
    ti = setInterval(() => {
      left--;
      tick();
      if (left <= 0) clearInterval(ti);
    }, 1000);
  }
}

function tick() {
  $('tBar').style.width = Math.max(0, (left / 60) * 100) + '%';
  $('tText').textContent = left > 0 ? `${left}s left` : "Time's up. Finish when ready.";
}

function mDots() {
  const n = cur.length;
  const W = 9;
  const s = Math.max(0, Math.min(idx - 4, n - W));
  const e = Math.min(n, s + W);
  let h = '';
  for (let k = s; k < e; k++) {
    const sm = ((k === s && s > 0) || (k === e - 1 && e < n)) && k !== idx;
    h += `<button class="dot${k === idx ? ' on' : ''}${sm ? ' sm' : ''}" data-k="${k}" aria-label="Question ${k + 1}"></button>`;
  }
  $('mDots').innerHTML = h;
  $('mDots').querySelectorAll('.dot').forEach(d => {
    d.addEventListener('click', () => mGo(parseInt(d.dataset.k, 10)));
  });
}

function mGo(k) {
  if (k === idx || k < 0 || k >= cur.length) return;
  idx = k;
  showQ();
  saveScr();
}

function step(d) {
  playTapSound();
  if (d > 0 && idx === cur.length - 1) {
    finish();
    return;
  }
  if (idx + d < 0) return;
  idx += d;
  showQ();
  saveScr();
}

// Show the question word by word. When sp is true, also read it aloud with the phone's voice.
function reveal(t, sp) {
  clearInterval(rv);
  clearTimeout(rv);
  stopSpeaking();
  const el = $('qText');
  const w = t.split(' ');
  el.innerHTML = w.map(x => `<span class="w">${esc(x)}</span>`).join(' ');
  const S = [...el.children];
  let n = 0;
  const showWord = k => {
    while (n <= k && n < S.length) S[n++].classList.add('in');
  };
  const timer = () => {
    clearInterval(rv);
    clearTimeout(rv);
    rv = setInterval(() => {
      showWord(n);
      if (n >= S.length) clearInterval(rv);
    }, sp ? 320 : 140);
  };
  if (!sp) {
    timer();
    return;
  }
  const st = [];
  let c = 0;
  let got = false;
  w.forEach(x => {
    st.push(c);
    c += x.length + 1;
  });
  rv = setTimeout(() => {
    if (!got) timer();
  }, 800);
  speak(t, {
    onWord: charIndex => {
      got = true;
      let k = 0;
      while (k + 1 < st.length && st[k + 1] <= charIndex) k++;
      showWord(k);
    }
  }).then(r => {
    if (r.reason === 'stopped') return;
    clearInterval(rv);
    clearTimeout(rv);
    showWord(S.length);
    if (!r.ok) toast(TTS_MESSAGES[r.reason] || TTS_MESSAGES.error);
  });
}

// Mock interview: speak your answer and it is typed into the answer box.
// After the last word of the saved answer is said, wait this long before the mic stops.
const DONE_WAIT_MS = 2000;
let mMicOn = false; // mock interview: keep listening through pauses until the user taps stop

function mockNote(m) {
  $('micSt').textContent = m || '';
}

// ---- Mock: From memory ----
// The user says the saved answer from memory (like a language app). Once they speak, the box shows
// the whole saved answer in its order and spelling, coloured by what was heard (aligned with
// src/services/expected.js): said = dark, said wrong = red, not said = dull. Words the phone heard
// that are not in the answer are never written.
// mHeard[i]: heard (or typed) words of question i ({ w }), the source of the box and of answers[i].
let mHeard = [];
let mOk = []; // mOk[i]: answer word indices said right at least once (sticky)
const mWords = t => String(t || '').split(/\s+/).filter(w => norm(w));

// Status of every answer word of question i (with the live words while speaking).
function mStatus(i, live = '') {
  const H = mHeard[i] || [];
  const ref = refText(cur[i]);
  const sticky = [...(mOk[i] || []), ...(live ? phraseHits(live, ref) : [])];
  return memoryStatus([...H.map(x => x.w), ...mWords(live)].join(' '), ref, sticky);
}

function mRender(i, live = '') {
  if (i !== idx || cs !== 'interview' || $('ansBox').isContentEditable) return; // never under typing
  const box = $('ansBox');
  const H = mHeard[i] || [];
  if (!H.length && !live) {
    box.innerHTML = answers[i] ? esc(answers[i]) : '<span class="aph">Tap the mic and say your answer from memory.</span>';
    return;
  }
  const ref = refText(cur[i]);
  if (!ref) {
    box.textContent = [...H.map(x => x.w), ...mWords(live)].join(' ');
    return;
  }
  const { st, heard } = mStatus(i, live);
  // While the mic is on, only the part already reached is shown (the rest stays hidden, so it is
  // still from memory); when it stops, the words not said show dull.
  const reach = mMicOn ? st.reduce((n, s, j) => (s !== 'dim' ? j : n), -1) : st.length - 1;
  const CLS = { ok: 'said', bad: 'wrongw', dim: 'notsaid' };
  box.innerHTML = mWords(ref)
    .slice(0, reach + 1)
    .map((w, j) =>
      st[j] === 'bad'
        ? `<button type="button" class="aw wrongw" data-heard="${esc(heard[j] || '')}" aria-label="${esc(w)}: you said ${esc(heard[j] || '')}">${esc(w)}</button>`
        : `<span class="aw ${CLS[st[j]]}">${esc(w)}</span>`
    )
    .join(' ') || '<span class="aph">Listening...</span>';
  const last = box.querySelectorAll('.aw.said, .aw.wrongw');
  const x = last[last.length - 1];
  if (x && x.offsetTop + x.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = x.offsetTop - box.clientHeight / 2;
}

// A small bubble just above the tapped word (what was said instead).
function showWordTip(el, text) {
  const tip = $('wTip');
  const host = $('interview').getBoundingClientRect();
  const r = el.getBoundingClientRect();
  tip.textContent = text;
  tip.classList.remove('hidden');
  const w = tip.offsetWidth;
  const left = Math.max(8, Math.min(r.left - host.left + r.width / 2 - w / 2, host.width - w - 8));
  tip.style.left = `${left}px`;
  tip.style.top = `${r.top - host.top - tip.offsetHeight - 8}px`;
  tip.style.setProperty('--ax', `${r.left - host.left + r.width / 2 - left}px`);
  clearTimeout(showWordTip.t);
  showWordTip.t = setTimeout(() => tip.classList.add('hidden'), 3500);
}

// The last word of the saved answer has been said (right or wrong).
function mDone(i, live = '') {
  const { st } = mStatus(i, live);
  return st.length > 0 && st[st.length - 1] !== 'dim';
}

// Every word of the saved answer said right.
function mAllOk(i) {
  const { st } = mStatus(i);
  return st.length > 0 && st.every(s => s === 'ok');
}

// answers[i] (used for feedback): the saved-answer words the user said, in order.
function mCommit(i) {
  const H = mHeard[i] || [];
  const ref = refText(cur[i]);
  if (!ref) answers[i] = H.map(x => x.w).join(' ');
  else {
    const { st } = mStatus(i);
    answers[i] = mWords(ref)
      .filter((w, j) => st[j] === 'ok')
      .join(' ');
  }
  saveScr();
  mRender(i);
}

function mHint() {
  playTapSound();
  const it = cur[idx];
  const ref = it ? mWords(refText(it)) : [];
  if (!ref.length) return toast('No saved answer for this question yet.');
  const { st } = mStatus(idx);
  const from = st.findIndex(s => s !== 'ok'); // first word not said right yet
  const next = from < 0 ? '' : ref.slice(from, from + 3).join(' ');
  const el = $('mHintT');
  el.textContent = next ? `Next: ${next}` : 'You said it all.';
  el.classList.remove('hidden');
  clearTimeout(mHint.t);
  mHint.t = setTimeout(() => el.classList.add('hidden'), 3000);
}

// Type: the box becomes editable; the typed words are checked like spoken ones when done.
function mType() {
  playTapSound();
  if (mMicOn || isListening() || voiceState() === 'stopping') return;
  const box = $('ansBox');
  box.textContent = answers[idx] || '';
  box.contentEditable = 'plaintext-only';
  if (box.contentEditable !== 'plaintext-only') box.contentEditable = 'true';
  box.classList.add('typing');
  box.focus();
  const sel = getSelection();
  sel.selectAllChildren(box);
  sel.collapseToEnd();
  const i = idx;
  box.onblur = () => {
    box.onblur = null;
    box.contentEditable = 'false';
    box.classList.remove('typing');
    mHeard[i] = mWords(box.innerText).map(w => ({ w })); // typed words are checked like spoken ones
    mOk[i] = refText(cur[i]) ? [...phraseHits(box.innerText, refText(cur[i]))] : [];
    mCommit(i);
  };
}

async function mClear() {
  playTapSound();
  if (!(mHeard[idx] || []).length && !answers[idx]) return;
  if (!(await ask('Clear answer?', 'Clear this answer and start again?', 'Clear', 'Cancel', '🧹', true))) return;
  mHeard[idx] = [];
  mOk[idx] = [];
  answers[idx] = '';
  saveScr();
  mRender(idx);
}

async function toggleMic() {
  playTapSound();
  // Still finishing the last stop: wait for its last sentence instead of cancelling it.
  if (voiceState() === 'stopping') return mockNote('Finishing... one moment.');
  if (mMicOn || isListening()) {
    mMicOn = false;
    $('mic').classList.remove('on');
    mockNote('Finishing...');
    stopListening(); // stops now; the last phrase still arrives and is added
    return;
  }
  stopSpeaking(); // the question must not be read into the mic
  clearInterval(rv);
  clearTimeout(rv);
  document.querySelectorAll('#qText .w').forEach(x => x.classList.add('in'));
  $('ansBox').blur(); // finish typing first
  if (!(await prepareVoice(mockNote))) return;
  if (cs !== 'interview') return;

  const myIdx = idx;
  const it = cur[myIdx];
  const ref = refText(it);
  const H = (mHeard[myIdx] = mHeard[myIdx] || []);
  const before = H.length;
  const here = () => idx === myIdx && cs === 'interview';
  let readyOnce = false;
  mMicOn = true;
  $('mic').classList.add('on');
  mockNote('Getting the mic ready...');

  const started = await startListening({
    // Hints: the user's own words, then the words of the saved answer (rare ones first).
    bias: answerHints(ref),
    // A 2 to 3 s pause writes the sentence and the mic listens again. It stops after about 6 to 7 s
    // of silence, or right at the next pause once every word of the answer is right (keep talking
    // to improve it: the mic stays on while you speak).
    silentRestarts: () => (ref && mAllOk(myIdx) ? 0 : MOCK_SILENT_RESTARTS),
    // N-best: the guess that matches the most words of the saved answer wins.
    choose: cands => {
      let best = cands[0];
      let bestN = -1;
      cands.forEach(c => {
        const n = ref ? phraseHits(c.text, ref).size : 0;
        if (n > bestN) {
          best = c;
          bestN = n;
        }
      });
      return { text: best.text, index: best.index, changes: [], why: `best fit to your answer (${bestN} words)` };
    },
    // Live words that are mostly from the saved answer are kept even if the phone sends no final.
    keepLive: t => !!ref && phraseHits(t, ref).size >= Math.max(1, Math.ceil(mWords(t).length / 2)),
    onState: st => {
      if (!here()) return;
      if (st === 'ready' || st === 'listening') readyOnce = true;
      mockNote(st === 'ready' || st === 'listening' ? 'Speak now. Say your answer from memory.' : st === 'starting' ? (readyOnce ? 'Listening...' : 'Getting the mic ready...') : st === 'stopping' ? 'Finishing...' : '');
    },
    onLevel: db => micLevel($('mic'), db),
    onPartial: text => mRender(myIdx, text), // shown in the box at once, saved when final
    onFinal: text => {
      H.push(...mWords(text).map(w => ({ w })));
      // Answer words in this phrase stay right for good (a red word said again turns right).
      if (ref) mOk[myIdx] = [...new Set([...(mOk[myIdx] || []), ...phraseHits(text, ref)])];
      mCommit(myIdx);
    },
    onEnd: ({ reason, message }) => {
      $('mic').style.removeProperty('--lvl');
      mMicOn = false;
      $('mic').classList.remove('on');
      mRender(myIdx);
      if (!here()) return;
      if (H.length > before && ref) {
        const { st } = mStatus(myIdx);
        const ok = st.filter(s => s === 'ok').length;
        const score = Math.round((ok / st.length) * 100);
        mockNote('');
        return toast(ok ? (score === 100 ? 'Perfect! You said the whole answer 🎉' : `${score}% of your answer said. Red = said wrong, grey = missed.`) : 'No words of your saved answer were heard. Try again.');
      }
      mockNote(reason === 'cancelled' ? '' : message);
    }
  });
  if (!started && mMicOn) {
    mMicOn = false;
    $('mic').classList.remove('on');
    mockNote('Could not start voice input. Please try again.');
  }
}

// Evaluation & Feedback Scoring
const wds = t => String(t || '').split(/\s+/).map(nrm).filter(Boolean);
const near = (a, b) => {
  if (a === b) return true;
  if (a.length < 5 || b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, e = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++e > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return e + (a.length - i) + (b.length - j) <= 1;
};

// The saved answer of a Mock question (same rules as Practice: saved edit, then the
// "Introduce yourself" answer from setup, then the sample answer filled from the profile).
function refText(q) {
  const k = `${active}|${CK(cat, lv)}|${q.i}`;
  if (k in E) return E[k];
  const p = profiles[active];
  if (p && isIntroQuestion(q.q)) {
    const t = introTemplate({ name: p.name, edu: p.edu || p.degree, city: p.city, skills: p.skillTags || p.skills, role: p.role });
    if (t) return t;
  }
  return q.a ? fill(q.a, p && { ...p, role: ROLE[cat] || p.role }) : '';
}

function mistakes(user, ref) {
  const u = wds(user);
  const r = wds(ref);
  if (!u.length || !r.length) return null;
  const n = u.length;
  const m = r.length;
  const D = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      D[i][j] = near(u[i], r[j]) ? D[i + 1][j + 1] + 1 : Math.max(D[i + 1][j], D[i][j + 1]);
    }
  }
  const hit = new Array(n).fill(false);
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (near(u[i], r[j])) {
      hit[i] = true;
      i++;
      j++;
    } else if (D[i + 1][j] >= D[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  const f = hit.indexOf(true);
  const l = hit.lastIndexOf(true);
  if (f < 0) return { bad: n, span: n };
  const span = l - f + 1;
  let bad = 0;
  for (let k = f; k <= l; k++) {
    if (!hit[k]) bad++;
  }
  return { bad, span };
}

function finish() {
  clearInterval(ti);
  mMicOn = false;
  cancelListening();

  const done = answers.filter(Boolean);
  const words = done.reduce((s, a) => s + a.split(/\s+/).length, 0);
  const avg = done.length ? Math.round(words / done.length) : 0;
  // Score from each answer word (like the Mock box colours): said right / all words of the saved
  // answer, averaged over every question (a question not answered counts 0). Before, only the
  // words said right were compared, so one right word gave 10/10.
  let said = 0;
  let total = 0;
  let wrong = 0;
  const acc = cur.map((q, i) => {
    const ref = refText(q);
    if (!ref) return answers[i] ? 1 : 0;
    const H = mHeard[i] || [];
    const { st } = H.length ? mStatus(i) : memoryStatus(answers[i] || '', ref);
    const ok = st.filter(x => x === 'ok').length;
    said += ok;
    total += st.length;
    wrong += st.filter(x => x === 'bad').length;
    return st.length ? ok / st.length : 0;
  });
  const sc = done.length && acc.length ? Math.round((acc.reduce((a, b) => a + b, 0) / acc.length) * 10) : 0;

  $('score').textContent = `${sc} / 10`;
  $('score').style.setProperty('--p', sc * 10);
  $('fbText').textContent =
    `You answered ${done.length} of ${cur.length} questions. ` +
    (!done.length
      ? 'Add answers to get a score.'
      : total
      ? `You said ${said} of ${total} words of your saved answers right${wrong ? `, ${wrong} wrong` : ''}. Words you skipped or said wrong lower the score.`
      : 'Well done for answering.');

  $('tips').innerHTML = shuffle(TIPS).slice(0, 3).map(t => '• ' + t).join('<br>');
  renderReview();

  // Natural break: the interview is over. The interstitial (if one is ready and allowed)
  // opens now, and the results screen is drawn right under it. If no ad is ready it is
  // skipped silently. The app never waits for an ad.
  blurTyping();
  showInterstitialAtBreak('interview_finished').then(shown => {
    if (shown) stopMedia();
    if (shown) return; // no chime or confetti behind a full-screen ad
    playSuccessChime();
    if (sc >= 7) fireGrandCelebration();
  });
  show('feedback', true);

  const h = getItem('is_hist', []) || [];
  h.unshift({
    ts: Date.now(),
    ck: cat,
    lk: lv,
    c: CL(cat, lv),
    s: sc,
    a: done.length,
    t: cur.length,
    d: formatSessionDate(),
    n: active
  });
  setItem('is_hist', h.slice(0, 20));
}

function renderReview() {
  $('review').innerHTML = cur.map((q, i) =>
    `<label class="l">Q${i + 1}. ${esc(q.q)}</label><div class="rans${answers[i] ? '' : ' none'}">${answers[i] ? esc(answers[i]) : 'Empty'}</div>`
  ).join('');
}

function renderHist() {
  const h = getItem('is_hist', []) || [];
  $('hList').innerHTML = h.length
    ? h.map(x =>
        `<div class="hist"><span>${esc(x.c)}<br><small class="cnt">${x.d} · ${x.a}/${x.t} answered${x.n ? ' · ' + esc(x.n) : ''}</small></span><b class="hs">${x.s}/10</b></div>`
      ).join('') +
      `<button class="full danger" id="clearHistBtn" data-i="trash" aria-label="Clear history" title="Clear history"></button>`
    : `<div class="empty">No attempts yet. Finish a mock interview to see it here.</div>`;

  $('clearHistBtn')?.addEventListener('click', () => {
    removeItem('is_hist');
    showProfile();
  });
  renderIcons();
}

async function exportT() {
  playTapSound();
  let t = `Interview Simulator Transcript\nCandidate: ${active}\nType: ${CL(cat, lv)}\nDate: ${formatExportDateTime()}\n${'='.repeat(40)}\n\n`;
  cur.forEach((q, i) => (t += `Q${i + 1}: ${q.q}\nA: ${answers[i] || '(no answer given)'}\n\n`));
  // Android WebView cannot download blob files, so on the phone we open the share menu.
  if (Capacitor.isNativePlatform()) {
    try {
      await Share.share({ title: 'Interview transcript', text: t, dialogTitle: 'Save or share transcript' });
    } catch {
      // User closed the share menu: nothing to do.
    }
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([t], { type: 'text/plain' }));
  a.download = `interview_${cat}_${lv}_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Privacy policy: full text is bundled in the app (works offline), from PRIVACY_POLICY.md.
let policyRendered = false;
function fillPrivacy() {
  if (!policyRendered) {
    $('policyText').innerHTML = marked.parse(policyMarkdown);
    policyRendered = true;
  }
  $('policyNote').textContent = '';
  $('adPrivacyBox').classList.toggle('hidden', !needsPrivacyOptions());
}

function openPrivacyPolicy() {
  playTapSound();
  show('privacy');
}

// Open a web link in the phone's browser, or explain that the phone is offline.
async function openExternal(url, notify) {
  if (!(await requireOnline('policy', notify))) return;
  try {
    if (Capacitor.isNativePlatform()) await AppLauncher.openUrl({ url });
    else window.open(url, '_blank', 'noopener');
  } catch {
    notify('Could not open the browser. The full policy is shown above.');
  }
}

function viewOnlinePolicy() {
  playTapSound();
  const note = m => {
    $('policyNote').textContent = m;
  };
  note('');
  openExternal(PRIVACY_POLICY_URL, note);
}

async function adPrivacyChoices() {
  playTapSound();
  if (!(await requireOnline('generic', toast))) return;
  if (!(await showPrivacyOptions())) toast('Ad privacy choices are not available right now.');
}

// Global Touch Gestures
function setupSwipeGestures() {
  let px = 0, py = 0;
  const elP = $('practice');
  elP.addEventListener('touchstart', e => {
    px = e.touches[0].clientX;
    py = e.touches[0].clientY;
  }, { passive: true });
  elP.addEventListener('touchend', e => {
    if (!$('pEdit').classList.contains('hidden')) return;
    const dx = e.changedTouches[0].clientX - px;
    const dy = e.changedTouches[0].clientY - py;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      pStep(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  let mx = 0, my = 0, mt = 0;
  const elI = $('interview');
  let ok = true;
  elI.addEventListener('touchstart', e => {
    mx = e.touches[0].clientX;
    my = e.touches[0].clientY;
    mt = Date.now();
    ok = my <= $('mDots').getBoundingClientRect().bottom + 4;
  }, { passive: true });
  elI.addEventListener('touchend', e => {
    if (!ok) return;
    const dx = e.changedTouches[0].clientX - mx;
    const dy = e.changedTouches[0].clientY - my;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2 && Date.now() - mt < 600) {
      mGo(idx + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
}

// Event Listeners Initialization
function initEventListeners() {

  // Dialog buttons
  $('dYes')?.addEventListener('click', () => dlgRes && dlgRes(true));
  $('dNo')?.addEventListener('click', () => dlgRes && dlgRes(false));
  $('dlg')?.addEventListener('click', e => {
    if (e.target.id === 'dlg' && dlgRes) dlgRes(false);
  });

  // Action sheet
  $('csPractice')?.addEventListener('click', () => csGo(0));
  $('csInterview')?.addEventListener('click', () => csGo(1));

  // Profile actions
  $('pRestoreQBtn')?.addEventListener('click', restoreQ);

  // Practice actions
  $('pSaveABtn')?.addEventListener('click', saveA);
  $('pCancelABtn')?.addEventListener('click', cancelA);
  $('pAddQBtn')?.addEventListener('click', addQ);
  $('pDelQBtn')?.addEventListener('click', delQ);

  // Mock setup actions

  // Mock interview actions
  $('qSpkBtn')?.addEventListener('click', () => reveal(cur[idx].q, true));
  $('mPrevBtn')?.addEventListener('click', () => step(-1));
  // Tap a red word: what the phone heard instead.
  $('ansBox')?.addEventListener('click', e => {
    const b = e.target.closest('.aw.wrongw');
    if (!b || $('ansBox').isContentEditable) return;
    playTapSound();
    showWordTip(b, b.dataset.heard ? `You said "${b.dataset.heard}"` : 'Not said right');
  });
  document.addEventListener('pointerdown', e => {
    if (!e.target.closest('#wTip, .aw.wrongw')) $('wTip')?.classList.add('hidden');
  });

  // Feedback actions
  $('fbExportBtn')?.addEventListener('click', exportT);
  $('fbHomeBtn')?.addEventListener('click', home);

  // Add question
  $('addqSaveBtn')?.addEventListener('click', saveQ);

  // Links inside the bundled policy text open in the browser (with an offline message).
  $('policyText')?.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    openExternal(a.href, m => {
      $('policyNote').textContent = m;
    });
  });

  // Bottom Navigation

  // History popstate
  window.addEventListener('popstate', e => {
    const st = e.state || { s: 'root', d: -1 };
    if (st.s === 'root') {
      if (Date.now() < exitArm) {
        history.back();
        return;
      }
      exitArm = Date.now() + 2000;
      toast('Press back again to exit');
      history.pushState({ s: 'home', d: 0 }, '');
      dep = 0;
      if (cs !== 'home') render('home');
      return;
    }
    if (cs === 'interview' && st.s !== 'interview' && !leaveOK) {
      history.pushState({ s: 'interview', d: dep }, '');
      ask('Leaving already?', 'Your answers so far will be lost. Want to keep going?', 'Leave', 'Stay', '🥺', true).then(
        y => {
          if (y) {
            leaveOK = true;
            history.back();
          }
        }
      );
      return;
    }
    leaveOK = false;
    dep = st.d;
    render(st.s);
  });

  // Preferences change handler
  document.addEventListener('change', e => {
    if (e.target.classList.contains('pf')) {
      const o = {};
      document.querySelectorAll('.pf').forEach(x => {
        o[x.id] = x.type === 'checkbox' ? x.checked : x.value;
      });
      setItem('is_pf', o);
    }
  });
}

function loadPreferences() {
  const o = getItem('is_pf', {}) || {};
  document.querySelectorAll('.pf').forEach(e => {
    if (e.id in o) {
      if (e.type === 'checkbox') e.checked = o[e.id];
      else e.value = o[e.id];
    }
  });
}

// App Bootstrap
async function initApp() {
  // The welcome screen is on the page: the native splash can go (index.html also does this early).
  if (Capacitor.isNativePlatform()) SplashScreen.hide().catch(() => {});
  await initStorage();
  setVoiceAccent(voiceAccent());
  initSetup();
  onSpeakingChange(on => $('hMute').classList.toggle('hidden', !on));
  $('hLogo').innerHTML = logoSvg();

  const savedTheme = getItem('is_theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = savedTheme;
  syncThemeSwitch();

  profiles = getItem('is_profiles') || {};
  E = getItem('is_edits', {}) || {};
  QE = getItem('is_qedits', {}) || {};
  // Older versions shipped a sample profile ("Alex Khan"). It is not the user: delete it and its edits.
  if (LEGACY_DEMO_NAMES.some(n => profiles[n])) {
    LEGACY_DEMO_NAMES.forEach(n => {
      delete profiles[n];
      [E, QE].forEach(o => Object.keys(o).forEach(k => k.startsWith(n + '|') && delete o[k]));
    });
    setItem('is_profiles', profiles);
    setItem('is_edits', E);
    setItem('is_qedits', QE);
  }

  active = getItem('is_active');
  if (!profiles[active]) {
    active = Object.keys(profiles)[0] || '';
  }
  // One profile at a time: older versions allowed several; keep the active one and its answers.
  if (Object.keys(profiles).length > 1) {
    Object.keys(profiles).forEach(n => {
      if (n === active) return;
      delete profiles[n];
      [E, QE].forEach(o => Object.keys(o).forEach(k => k.startsWith(n + '|') && delete o[k]));
    });
    setItem('is_profiles', profiles);
    setItem('is_edits', E);
    setItem('is_qedits', QE);
    setItem('is_active', active);
  }
  // My words are made from the details (hidden from the user); refresh them for saved profiles.
  Object.values(profiles).forEach(p => p && p.setup && (p.words = autoWords(p)));
  ['is_voice_smart', 'is_voice_words'].forEach(k => removeItem(k));
  H = getItem('is_hidden', {}) || {};
  C = getItem('is_custom', {}) || {};
  pcLv = getItem('is_pclv', 'fresher') || 'fresher';

  initEventListeners();
  setupSwipeGestures();
  // fillHome() first: it fills the type/level lists, so the saved choice can be selected.
  fillHome();
  loadPreferences();
  renderIcons();

  history.replaceState({ s: 'root', d: -1 }, '');
  // Home is always one step above the exit point, so Back from another screen lands on Home
  // (not on "Press back again to exit").
  history.pushState({ s: 'home', d: 0 }, '');

  // Restore screen state if app reloaded
  const o = getItem('is_scr');
  if (o && active && profiles[active]) {
    try {
      if (o.s === 'practice') {
        P = { cat: o.cat, lv: o.lv || 'fresher', list: [], i: 0, one: o.one ?? null };
        const l = (P.list = plist());
        if (l.length) {
          P.i = Math.min(o.i || 0, l.length - 1);
          show('practice');
        }
      } else if (o.s === 'form') {
        showProfile();
      } else if (o.s === 'interview' && o.cur && o.cur.length) {
        cat = o.cat;
        lv = o.lv;
        cur = o.cur;
        answers = o.answers;
        mHeard = Array.isArray(o.heard) ? o.heard : cur.map(() => []);
        mOk = Array.isArray(o.ok) ? o.ok : cur.map(() => []);
        idx = Math.min(o.idx, cur.length - 1);
        show('interview');
        showQ();
      }
    } catch {}
  }

  // Voice input needs a speech recognition service on the phone. Hide the mic if there is none.
  isVoiceAvailable().then(ok => {
    voiceOK = ok;
    updateMicButtons();
  });

  // The welcome screen covers the app at start: no banner (and no interstitial) over it.
  if (document.getElementById('intro')) setBannerSuppressed('intro', true);
  // Consent (EEA/UK) first, then AdMob creates ONE banner under the header for the whole session.
  initializeAdMob({ layout: bannerLayout, onSpace: setAdSpace });
  watchBannerLayout();
  watchHeaderInset();

  // Debug builds only: hidden status panel (long-press the title) and build info in Profile.
  // __DEBUG_TOOLS__ is false in the release build, so this code is removed from it.
  if (__DEBUG_TOOLS__) {
    import('./debug/panel.js').then(m => m.installDebugPanel()).catch(() => {});
  }

  // Native platform configurations (Status bar, splash, hardware back button, pause/resume)
  if (Capacitor.isNativePlatform()) {
    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#2a45b5' });
      await StatusBar.setOverlaysWebView({ overlay: false });
    } catch {
      // Status bar styling is optional.
    }

    try {
      await SplashScreen.hide();
    } catch {
      // Splash hides by itself after launchShowDuration.
    }

    // Android hardware back button handling via @capacitor/app
    App.addListener('backButton', () => {
      // 1. Close open modal if active
      if (!$('dlg').classList.contains('hidden') && dlgRes) {
        dlgRes(false);
        return;
      }
      if (!$('csheet').classList.contains('hidden')) {
        closeCS();
        return;
      }
      // 2. Mock interview leave confirmation
      if (cs === 'interview') {
        ask('Leaving already?', 'Your answers so far will be lost. Want to keep going?', 'Leave', 'Stay', '🥺', true).then(
          y => {
            if (y) {
              leaveOK = true;
              history.back();
            }
          }
        );
        return;
      }
      // 3. Cancel active edits
      if (cs === 'practice' && !$('pEdit').classList.contains('hidden')) {
        cancelA();
        return;
      }
      // 4. Back in navigation stack
      if (cs !== 'home') {
        history.back();
        return;
      }
      // 5. On home screen: double-tap back to exit
      if (Date.now() < exitArm) {
        App.exitApp();
      } else {
        exitArm = Date.now() + 2000;
        toast('Press back again to exit');
      }
    });

    // Pause / Resume: stop sound, speech, and timers when app goes to background
    App.addListener('pause', () => {
      stopMedia();
      clearInterval(ti);
    });

    App.addListener('resume', () => {
      if (cs === 'interview' && timerOn && left > 0) {
        clearInterval(ti);
        ti = setInterval(() => {
          left--;
          tick();
          if (left <= 0) clearInterval(ti);
        }, 1000);
      }
    });
  }
  introReady();
}


// Profile > Voice: accent and learned corrections (My words are automatic and not shown).
function renderVoiceSettings() {
  const a = voiceAccent();
  $('vAccent').innerHTML = Object.entries(VOICE_ACCENTS)
    .map(([k, v]) => `<option value="${k}"${k === a ? ' selected' : ''}>${esc(v.label)}</option>`)
    .join('');
  renderVoiceMemory();
}

function renderVoiceMemory() {
  const list = corrections();
  $('vMem').innerHTML = list.length
    ? list
        .map(
          (m, i) =>
            `<div class="vmrow"><span>"${esc(m.heard)}" becomes "${esc(m.fix)}"</span><button class="pbtn danger" data-i="trash" onclick="delVoiceMemory(${i})" aria-label="Delete correction" title="Delete"></button></div>`
        )
        .join('')
    : '<small class="vempty">Nothing learned yet. When you fix a word the mic got wrong, the app remembers it here.</small>';
  renderIcons();
}

function delVoiceMemory(i) {
  removeCorrection(i);
  renderVoiceMemory();
}

function saveVoiceAccent(a) {
  setAccentPref(a);
  setVoiceAccent(voiceAccent());
  toast(`Voice accent: ${VOICE_ACCENTS[voiceAccent()].label}`);
}

// Bind all action methods to window for full inline HTML onclick compatibility
Object.assign(window, {
  back,
  home,
  toggleTheme,
  setTheme,
  streakToast,
  showProfile,
  editProfile,
  editDetails,
  setupStep,
  toggleAbout,
  pFinish1,
  toggleHist,
  setActive,
  restoreQ,
  openPrivacyPolicy,
  viewOnlinePolicy,
  adPrivacyChoices,
  startPractice,
  startMock,
  startInterview,
  mSync,
  mPick,
  reveal,
  toggleMic,
  step,
  exportT,
  saveQ,
  addQ,
  toggleFav,
  editA,
  saveA,
  cancelA,
  resetA,
  delQ,
  togglePMic,
  readA,
  saveVoiceAccent,
  delVoiceMemory,
  openHistory,
  mHint,
  mClear,
  muteSpeech,
  heroGo,
  mType,
  homeLevel,
  pcLevel,
  pcGo,
  openCS,
  closeCS,
  csGo,
  openFav,
  toggleFavList,
  retryLast,
  pGo,
  pStep,
  mGo
});

initApp();
