import {
  CATS,
  LEVELS,
  ROLE,
  FIELDS,
  FF,
  DEF,
  DEMO,
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
import { PRIVACY_POLICY_URL } from './config/app.js';
import {
  initializeAdMob,
  showInterstitialAtBreak,
  skipInterstitialBreak,
  setBannerSuppressed,
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
  isListening
} from './services/voice.js';
import { speak, stopSpeaking, isSpeaking, TTS_MESSAGES } from './services/tts.js';
import { initStorage, getItem, setItem, removeItem } from './services/storage.js';
import { formatFullCurrentDate, formatSessionDate, formatExportDateTime, calculateStreak } from './services/dates.js';
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
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'
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
let P = { list: [], i: 0, cat: '', lv: 'fresher' };
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
let base = '';
let rv = null;
let voiceOK = false; // phone has a speech recognition service
let pSpoken = ''; // practice read-along text heard so far on this card

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

const fill = (t, p) => t.replace(/\{(\w+)\}/g, (_, k) => (p && p[k] ? clean(p[k]) : DEF[k] || `[${k}]`));
const ekey = it => `${active}|${CK(P.cat, P.lv)}|${it.i}`;
const rp = p => p && { ...p, role: ROLE[P.cat] || p.role };
const ansText = it => ((ekey(it) in E) ? E[ekey(it)] : fill(it.a, rp(profiles[active])));

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

// Native banner top margin in CSS px (= dp). The ad plugin adds the status bar / notch inset
// itself for TOP_CENTER, so subtract the same inset the page uses (env() or Capacitor's CSS var).
function bannerTopMargin() {
  const header = document.querySelector('header.bar');
  const bottom = header ? header.getBoundingClientRect().bottom : 0;
  const probe = $('safeTopProbe');
  const safeTop = probe ? probe.getBoundingClientRect().height : 0;
  return Math.max(0, bottom + ADS_CONFIG.bannerGapTop - safeTop);
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
  privacy: 'Privacy Policy'
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
  privacy: 'nProfile'
};

const TABS = ['home', 'pcat', 'practice', 'mock', 'form'];

function saveScr() {
  const id = cs;
  let o = { s: id };
  if (id === 'practice') o = { s: id, cat: P.cat, lv: P.lv, i: P.i };
  else if (id === 'interview') o = { s: id, cat, lv, idx, cur, answers };
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

  $('x').classList.toggle('hidden', id === 'home');
  $('ttl').textContent = TT[id] || 'Interview Simulator';
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t.id === TB[id]));
  $('nav').classList.toggle('hidden', id === 'interview' || id === 'addq');
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
  if (replace || (TABS.includes(id) && TABS.includes(cs) && cs !== 'home')) {
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

function toggleTheme() {
  playTapSound();
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = target;
  setItem('is_theme', target);
}

// Stats & Home Screen
function stats() {
  $('av').textContent = active ? ini(active) : '';
  const g = new Date().getHours();
  $('gr').textContent = g < 12 ? 'Good morning' : g < 18 ? 'Good afternoon' : 'Good evening';
  $('hi').textContent = active ? `Hi, ${active.split(' ')[0]}` : 'Ready to practice?';
}

function fillHx() {
  const h = getItem('is_hist', []) || [];
  const streak = calculateStreak(h);
  const hs = $('hStreak');
  hs.classList.toggle('on', streak > 0);
  hs.dataset.n = streak;

  let o = '';
  const x = h[0];
  if (x) {
    o += `<div class="sec"><h4>Last session</h4><div class="hx"><div><b>${esc(x.c)}</b><br><small>${esc(x.d)} · Score ${x.s}/10</small></div><button id="retryLastBtn">Retry</button></div></div>`;
  }
  const csKeys = Object.keys(CATS);
  const dn = Math.floor(Date.now() / 864e5);
  const c = csKeys[dn % csKeys.length];
  const l = bank(c, pcLv || 'fresher');
  if (l.length) {
    const i = dn % l.length;
    o += `<div class="sec"><h4>Question of the day</h4><div style="margin-bottom:10px">${esc(l[i].q)}</div><div class="hx"><small>${esc(CATS[c])}</small><button id="qotdBtn" data-c="${c}" data-q="${i}">Practice it</button></div></div>`;
  }
  $('hx').innerHTML = o;

  $('retryLastBtn')?.addEventListener('click', () => retryLast());
  $('qotdBtn')?.addEventListener('click', e => {
    const btn = e.currentTarget;
    pcGo(btn.dataset.c, parseInt(btn.dataset.q, 10));
  });
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

function tickClk() {
  const t = $('dFull');
  if (!t) return;
  t.textContent = formatFullCurrentDate();
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

function csGo(m) {
  const c = csC;
  closeCS();
  if (!need()) return;
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
  const ps = Object.keys(profiles);
  $('prof').innerHTML = ps.length
    ? ps.map(n => `<option>${esc(n)}</option>`).join('')
    : "<option value=''>No profile yet - tap New</option>";

  if (profiles[active]) $('prof').value = active;

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
  ['Education', ['degree', 'uni']],
  ['Certifications', ['certs']],
  ['Skills', ['skills']]
];

function openForm(p, title) {
  $('formTitle').textContent = title;
  $('fields').innerHTML = FF.map(([k, l]) =>
    `<label class="l" for="f_${k}">${l}</label>` +
    (k === 'name'
      ? `<input type="text" id="f_${k}" value="${esc(p ? p[k] || '' : '')}">`
      : `<textarea class="ft" id="f_${k}">${esc(p ? p[k] || '' : '')}</textarea>`)
  ).join('');

  $('pForm').classList.remove('hidden');
  $('pSumBox').classList.add('hidden');
  ['pHistBox', 'pProfBox', 'pPrefBox'].forEach(i => $(i).classList.add('hidden'));
  show('form');
}

function newProfile() {
  playTapSound();
  editing = null;
  fillHome();
  openForm(null, 'New profile');
}

function toggleHist() {
  playTapSound();
  const k = $('hList');
  const h = k.classList.toggle('hidden');
  $('hEye').dataset.i = h ? 'eye' : 'eyeoff';
  $('hEye').title = $('hEye').ariaLabel = h ? 'Show history' : 'Hide history';
  renderIcons();
}

function toggleAbout() {
  playTapSound();
  const k = $('pKv');
  const h = k.classList.toggle('hidden');
  $('pEye').dataset.i = h ? 'eye' : 'eyeoff';
  $('pEye').title = $('pEye').ariaLabel = h ? 'Show details' : 'Hide details';
  renderIcons();
}

function showProfile() {
  fillHome();
  if (!active || !profiles[active]) return newProfile();
  const p = profiles[active];
  const h = getItem('is_hist', []) || [];

  $('pAv').textContent = ini(p.name);
  $('pNm').textContent = p.name;
  $('pRl').textContent = p.role || '';
  $('pN').textContent = h.length;
  $('pB').textContent = h.length ? `${Math.max(...h.map(x => x.s))}/10` : '-';
  $('pAvg').textContent = h.length ? (h.reduce((t, x) => t + x.s, 0) / h.length).toFixed(1) : '-';

  $('pKv').innerHTML = ABOUT.map(([t, ks]) => {
    const v = ks.map(k => p[k]).filter(Boolean).join(', ');
    return `<div><span>${t}</span><b>${v ? esc(v) : 'Not added yet'}</b></div>`;
  }).join('');

  renderHist();
  $('pKv').classList.add('hidden');
  $('pEye').dataset.i = 'eye';
  $('hList').classList.add('hidden');
  $('hEye').dataset.i = 'eye';

  $('pSumBox').classList.remove('hidden');
  $('pForm').classList.add('hidden');
  ['pHistBox', 'pProfBox', 'pPrefBox'].forEach(i => $(i).classList.remove('hidden'));
  show('form');
}

function cancelProfile() {
  playTapSound();
  active && profiles[active] ? showProfile() : home();
}

function editProfile() {
  playTapSound();
  if (!active) return newProfile();
  editing = active;
  fillHome();
  openForm(profiles[active], 'Edit profile');
}

function saveProfile() {
  playTapSound();
  const p = { ...(editing && profiles[editing] ? profiles[editing] : {}) };
  FF.forEach(([k]) => {
    p[k] = $('f_' + k).value.trim();
  });
  if (!p.name) {
    playErrorBeep();
    customAlert('Please enter your name.');
    return;
  }
  if (editing && editing !== p.name) {
    delete profiles[editing];
    Object.keys(E).forEach(k => {
      if (k.startsWith(editing + '|')) {
        E[p.name + k.slice(editing.length)] = E[k];
        delete E[k];
      }
    });
    setItem('is_edits', E);
  }
  profiles[p.name] = p;
  setItem('is_profiles', profiles);
  setActive(p.name);
  showProfile();
}

function delProfile() {
  if (!active) return;
  playTapSound();
  ask('Delete this profile?', `"${active}" and its edited answers will be removed.`, 'Delete', 'Keep', '🗑️', true).then(
    y => y && _delProfile()
  );
}

function _delProfile() {
  delete profiles[active];
  Object.keys(E).forEach(k => {
    if (k.startsWith(active + '|')) delete E[k];
  });
  Object.keys(QE).forEach(k => {
    if (k.startsWith(active + '|')) delete QE[k];
  });
  setItem('is_qedits', QE);
  setItem('is_profiles', profiles);
  setItem('is_edits', E);
  setActive(Object.keys(profiles)[0] || '');
  showProfile();
}

function need() {
  if (!active || !profiles[active]) {
    newProfile();
    return false;
  }
  return true;
}

// Practice Flow
function startMock() {
  playTapSound();
  if (!need()) return;
  show('mock');
}

function fillMock() {
  fillHome();
  $('mcat').innerHTML = $('cat').innerHTML;
  $('mlvl').innerHTML = $('lvl').innerHTML;
  $('mcat').value = $('cat').value;
  $('mlvl').value = $('lvl').value;
  $('mtip').textContent = TIPS[new Date().getDate() % TIPS.length];
}

function mSync() {
  $('cat').value = $('mcat').value;
  $('lvl').value = $('mlvl').value;
  $('cat').dispatchEvent(new Event('change', { bubbles: true }));
}

function startPractice() {
  playTapSound();
  if (!need()) return;
  show('pcat');
}

function pcLevel(v) {
  playTapSound();
  pcLv = v;
  setItem('is_pclv', v);
  fillPcat();
}

function pcGo(c, i) {
  playTapSound();
  const v = pcLv;
  const l = bank(c, v);
  P = { cat: c, lv: v, list: l, i: 0 };
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
  P.list = bank(P.cat, P.lv);
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
  PW.forEach((x, i) => x.classList.toggle('hl', i < k));
  const a = $('pA');
  const x = PW[Math.min(k, PW.length) - 1];
  if (x && k > 0 && (x.offsetTop + x.offsetHeight > a.scrollTop + a.clientHeight - 10 || x.offsetTop < a.scrollTop)) {
    a.scrollTop = Math.max(0, x.offsetTop - a.clientHeight / 3);
  }
}

// Stop voice input, read aloud and word animations (screen change, app in background).
function stopMedia() {
  stopListening();
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
  pSpoken = '';
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
  $('pTag').classList.toggle('hidden', !ed);
  $('pReset').classList.toggle('hidden', !ed);
  dots();
  cancelA();
  renderIcons();
  updFav();
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
  showInterstitialAtBreak(name);
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
  ['pCard', 'pMicWrap', 'pEditBtn', 'pDots', 'pDone'].forEach(i => $(i).classList.add('hidden'));
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
  ['pMicWrap', 'pEditBtn', 'pDots'].forEach(i => $(i).classList.toggle('hidden', !has));
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
  if (st === 'denied') {
    await ask(
      'Microphone is blocked',
      'To use voice input, open Android Settings > Apps > Interview Simulator > Permissions > Microphone and choose Allow. You can still type your answer.',
      'OK',
      '',
      '🎙️'
    );
    return false;
  }
  const go = await ask(
    'Allow microphone?',
    'The mic is used only while you tap record, to turn your speech into text. The app does not save your audio.',
    'Continue',
    'Not now',
    '🎙️'
  );
  if (!go) return false;
  st = await requestMicPermission();
  if (st === 'granted') return true;
  notify(
    st === 'denied'
      ? 'Microphone is blocked. Allow it in Android Settings > Apps > Interview Simulator > Permissions.'
      : 'Microphone permission was not given. You can type your answer instead.'
  );
  return false;
}

// Hide mic buttons when the phone has no speech recognition service.
function updateMicButtons() {
  $('pMic').classList.toggle('hidden', !voiceOK);
  $('mic').classList.toggle('hidden', !voiceOK);
  if (!voiceOK) $('micSt').textContent = 'Voice input is not available on this phone. Type your answer.';
}

function pHighlight(sp) {
  let pos = 0;
  for (const w of sp.split(/\s+/).map(nrm).filter(Boolean)) {
    let seen = 0;
    for (let k = pos; k < PW.length && seen < 4; k++) {
      const nw = nrm(PW[k].textContent);
      if (!nw) continue;
      seen++;
      if (nw === w) {
        pos = k + 1;
        break;
      }
    }
  }
  while (pos < PW.length && !nrm(PW[pos].textContent)) pos++;
  hlTo(pos);
  return pos;
}

// Practice: read the answer aloud and the app highlights the words it hears.
async function togglePMic() {
  playTapSound();
  if (isListening()) {
    stopListening();
    return;
  }
  stopSpeaking();
  clearInterval(rv);
  if (!(await prepareVoice(toast))) return;
  if (cs !== 'practice') return;

  pFinish();
  hlTo(0);
  pSpoken = '';
  let done = false;
  $('pMic').classList.add('on');
  toast('Listening... read the answer aloud');
  const started = await startListening({
    onText: t => {
      if (done) return;
      if (pHighlight(pSpoken + ' ' + t) >= PW.length) {
        done = true;
        playSuccessChime();
        fireConfetti();
        toast('Well done! You read it all 🎉');
        stopListening();
      }
    },
    onEnd: ({ text, reason }) => {
      $('pMic').classList.remove('on');
      if (text) pSpoken += ' ' + text;
      else if (reason !== 'stopped') toast("Didn't catch that. Tap the mic and try again.");
    }
  });
  if (!started) {
    $('pMic').classList.remove('on');
    toast('Could not start voice input. Please try again.');
  }
}

// Practice: listen to the answer with the phone's text-to-speech voice.
async function readA() {
  playTapSound();
  if (isSpeaking()) {
    stopSpeaking();
    clearInterval(rv);
    clearTimeout(rv);
    hlTo(0);
    return;
  }
  stopListening();
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
  P.list = bank(P.cat, P.lv);
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
  P.list = bank(P.cat, P.lv);
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
  P.list = bank(P.cat, P.lv);
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
  if (!need()) return;
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
  show('interview');
  showQ();
}

function showQ() {
  stopListening();
  $('qCount').textContent = `${idx + 1}/${cur.length}`;
  reveal(cur[idx].q, $('rd').checked);
  $('ansBox').value = answers[idx] || '';
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
  answers[idx] = $('ansBox').value.trim();
  idx = k;
  showQ();
  saveScr();
}

function step(d) {
  playTapSound();
  answers[idx] = $('ansBox').value.trim();
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

// Voice Speech to text for Interview answer
const FIX = {
  'get hub': 'GitHub',
  'java script': 'JavaScript',
  'type script': 'TypeScript',
  'rest api': 'REST API',
  'my sequel': 'MySQL',
  'no sequel': 'NoSQL',
  'sequel': 'SQL',
  'node js': 'Node.js',
  'python': 'Python',
  'aws': 'AWS',
  'html': 'HTML',
  'css': 'CSS',
  'api': 'API',
  'seo': 'SEO',
  'kpi': 'KPI',
  'kpis': 'KPIs',
  'crm': 'CRM',
  'roi': 'ROI',
  'linked in': 'LinkedIn',
  'power bi': 'Power BI',
  'cv': 'CV'
};

function fixTerms(t) {
  for (const w in FIX) {
    t = t.replace(new RegExp('\\b' + w + '\\b', 'gi'), FIX[w]);
  }
  return t.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

// Mock interview: speak your answer and it is typed into the answer box.
async function toggleMic() {
  playTapSound();
  if (isListening()) {
    stopListening();
    return;
  }
  stopSpeaking();
  clearInterval(rv);
  clearTimeout(rv);
  document.querySelectorAll('#qText .w').forEach(x => x.classList.add('in'));
  const note = m => {
    $('micSt').textContent = m;
  };
  if (!(await prepareVoice(note))) return;
  if (cs !== 'interview') return;

  const myIdx = idx;
  base = $('ansBox').value;
  if (base && !base.endsWith(' ')) base += ' ';
  $('mic').classList.add('on');
  note('Listening... speak now. Tap the mic to stop.');

  const started = await startListening({
    onText: t => {
      if (idx !== myIdx || cs !== 'interview') return;
      $('ansBox').value = base + fixTerms(t);
    },
    onEnd: ({ text, reason }) => {
      $('mic').classList.remove('on');
      if (idx === myIdx && text) {
        $('ansBox').value = base + fixTerms(text);
        answers[myIdx] = $('ansBox').value.trim();
        saveScr();
      }
      note(text || reason === 'stopped' ? '' : "Didn't catch that. Tap the mic and try again, or type your answer.");
      base = $('ansBox').value;
    }
  });
  if (!started) {
    $('mic').classList.remove('on');
    note('Could not start voice input. Please try again or type your answer.');
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

function refText(q) {
  const k = `${active}|${CK(cat, lv)}|${q.i}`;
  if (k in E) return E[k];
  const p = profiles[active];
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
  stopListening();

  const done = answers.filter(Boolean);
  const words = done.reduce((s, a) => s + a.split(/\s+/).length, 0);
  const avg = done.length ? Math.round(words / done.length) : 0;
  let bad = 0;
  let acc = [];

  cur.forEach((q, i) => {
    if (!answers[i]) return;
    const r = mistakes(answers[i], refText(q));
    if (r) {
      bad += r.bad;
      acc.push(1 - r.bad / r.span);
    }
  });

  const sc = !done.length
    ? 0
    : acc.length
    ? Math.round((acc.reduce((a, b) => a + b, 0) / acc.length) * 10)
    : avg < 5
    ? 3
    : avg < 15
    ? 5
    : avg < 30
    ? 7
    : avg < 50
    ? 8
    : 9;

  $('score').textContent = `${sc} / 10`;
  $('score').style.setProperty('--p', sc * 10);
  $('fbText').textContent =
    `You answered ${done.length} of ${cur.length} questions. ` +
    (acc.length
      ? bad
        ? `${bad} word${bad > 1 ? 's' : ''} did not match your practice answers. Only wrong words reduce the score, not shorter or longer answers.`
        : 'No mistakes found compared with your practice answers.'
      : 'Add answers to get a score.');

  $('tips').innerHTML = shuffle(TIPS).slice(0, 3).map(t => '• ' + t).join('<br>');
  renderReview();

  // Natural break: the interview is over. The interstitial (if one is ready and allowed)
  // opens now, and the results screen is drawn right under it. If no ad is ready it is
  // skipped silently. The app never waits for an ad.
  blurTyping();
  showInterstitialAtBreak('interview_finished').then(shown => {
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
    const a = $('ansBox');
    if (a.selectionStart !== a.selectionEnd) return;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2 && Date.now() - mt < 600) {
      mGo(idx + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
}

// Event Listeners Initialization
function initEventListeners() {
  $('x')?.addEventListener('click', back);
  $('hTheme')?.addEventListener('click', toggleTheme);
  $('hStreak')?.addEventListener('click', streakToast);
  $('hProf')?.addEventListener('click', showProfile);

  // Dialog buttons
  $('dYes')?.addEventListener('click', () => dlgRes && dlgRes(true));
  $('dNo')?.addEventListener('click', () => dlgRes && dlgRes(false));
  $('dlg')?.addEventListener('click', e => {
    if (e.target.id === 'dlg' && dlgRes) dlgRes(false);
  });

  // Action sheet
  $('csPractice')?.addEventListener('click', () => csGo(0));
  $('csInterview')?.addEventListener('click', () => csGo(1));
  $('csheet')?.addEventListener('click', e => {
    if (e.target.id === 'csheet') closeCS();
  });

  // Profile actions
  $('pEditProfBtn')?.addEventListener('click', editProfile);
  $('pEditAboutBtn')?.addEventListener('click', editProfile);
  $('pEye')?.addEventListener('click', toggleAbout);
  $('hEye')?.addEventListener('click', toggleHist);
  $('pCancelBtn')?.addEventListener('click', cancelProfile);
  $('pSaveBtn')?.addEventListener('click', saveProfile);
  $('pNewProfBtn')?.addEventListener('click', newProfile);
  $('pDelProfBtn')?.addEventListener('click', delProfile);
  $('pRestoreQBtn')?.addEventListener('click', restoreQ);
  $('prof')?.addEventListener('change', e => {
    setActive(e.target.value);
    showProfile();
  });

  // Practice actions
  $('pQt')?.addEventListener('click', () => editA('pEditQ'));
  $('pFav')?.addEventListener('click', toggleFav);
  $('pEditBtn')?.addEventListener('click', () => editA());
  $('pA')?.addEventListener('click', () => editA('pEdit'));
  $('pMic')?.addEventListener('click', togglePMic);
  $('pSpk')?.addEventListener('click', readA);
  $('pSaveABtn')?.addEventListener('click', saveA);
  $('pCancelABtn')?.addEventListener('click', cancelA);
  $('pAddQBtn')?.addEventListener('click', addQ);
  $('pReset')?.addEventListener('click', resetA);
  $('pDelQBtn')?.addEventListener('click', delQ);
  $('pEmpty')?.addEventListener('click', addQ);
  $('pDone')?.addEventListener('click', home);

  // Mock setup actions
  $('mcat')?.addEventListener('change', mSync);
  $('mlvl')?.addEventListener('change', mSync);
  $('mStartBtn')?.addEventListener('click', startInterview);

  // Mock interview actions
  $('qSpkBtn')?.addEventListener('click', () => reveal(cur[idx].q, true));
  $('ansBox')?.addEventListener('input', e => {
    answers[idx] = e.target.value.trim();
    saveScr();
  });
  $('mic')?.addEventListener('click', toggleMic);
  $('mPrevBtn')?.addEventListener('click', () => step(-1));
  $('nBtn')?.addEventListener('click', () => step(1));

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
  $('nHome')?.addEventListener('click', home);
  $('nPractice')?.addEventListener('click', startPractice);
  $('nMock')?.addEventListener('click', startMock);
  $('nProfile')?.addEventListener('click', showProfile);

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
  await initStorage();

  const savedTheme = getItem('is_theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = savedTheme;

  profiles = getItem('is_profiles');
  if (!profiles || !Object.keys(profiles).length || (Object.keys(profiles).length === 1 && profiles['Ali Khan'])) {
    profiles = DEMO;
    setItem('is_profiles', profiles);
  }

  active = getItem('is_active');
  if (!profiles[active]) {
    active = Object.keys(profiles)[0] || '';
  }

  E = getItem('is_edits', {}) || {};
  QE = getItem('is_qedits', {}) || {};
  H = getItem('is_hidden', {}) || {};
  C = getItem('is_custom', {}) || {};
  pcLv = getItem('is_pclv', 'fresher') || 'fresher';

  initEventListeners();
  setupSwipeGestures();
  loadPreferences();
  fillHome();
  tickClk();
  setInterval(tickClk, 1000);
  renderIcons();

  history.replaceState({ s: 'root', d: -1 }, '');

  // Restore screen state if app reloaded
  const o = getItem('is_scr');
  if (o && active && profiles[active]) {
    try {
      if (o.s === 'practice') {
        const l = bank(o.cat, o.lv || 'fresher');
        if (l.length) {
          history.pushState({ s: 'home', d: 0 }, '');
          P = { cat: o.cat, lv: o.lv || 'fresher', list: l, i: Math.min(o.i || 0, l.length - 1) };
          show('practice');
        }
      } else if (o.s === 'form') {
        history.pushState({ s: 'home', d: 0 }, '');
        showProfile();
      } else if (o.s === 'interview' && o.cur && o.cur.length) {
        history.pushState({ s: 'home', d: 0 }, '');
        cat = o.cat;
        lv = o.lv;
        cur = o.cur;
        answers = o.answers;
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

  // Consent (EEA/UK) first, then AdMob creates ONE banner under the header for the whole session.
  // The space is reserved now (native only) so the content does not jump when the ad arrives;
  // it collapses to 0 if there is no consent, no internet or no ad.
  if (Capacitor.isNativePlatform() && ADS_CONFIG.enableBanner) setAdSpace(ADS_CONFIG.bannerReserveHeight);
  initializeAdMob({ topMargin: bannerTopMargin, onSpace: setAdSpace });

  // Native platform configurations (Status bar, splash, hardware back button, pause/resume)
  if (Capacitor.isNativePlatform()) {
    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#4f46e5' });
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
      if (cs === 'form' && !$('pForm').classList.contains('hidden')) {
        cancelProfile();
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
}


// Bind all action methods to window for full inline HTML onclick compatibility
Object.assign(window, {
  back,
  home,
  toggleTheme,
  streakToast,
  showProfile,
  editProfile,
  toggleAbout,
  cancelProfile,
  saveProfile,
  newProfile,
  delProfile,
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
