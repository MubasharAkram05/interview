// Setup details asked before the first Mock or Practice session (Full name, target role, education,
// city, experience, skills, My words, voice accent). Stored on the phone only.
// Pure helpers, unit tested in tests/practice/setup.test.mjs.

export const ROLES = ['Software Engineer', 'Web Developer', 'Cloud/DevOps', 'IT Support', 'Data/AI', 'Fresher/General', 'Other'];
export const EXPERIENCE = { fresher: 'Fresher', mid: '1 to 2 years', senior: '3 plus years' };
export const MAX_SKILLS = 10;
export const MAX_WORDS = 20;

// Default interview type and level for each target role / experience (Mock and Practice pickers).
const ROLE_CAT = {
  'Software Engineer': 'software',
  'Web Developer': 'software',
  'Cloud/DevOps': 'cloud',
  'IT Support': 'software',
  'Data/AI': 'software',
  'Fresher/General': 'fresh',
  Other: 'fresh'
};
const EXP_LEVEL = { fresher: 'fresher', mid: 'junior', senior: 'senior' };
export const roleToCat = role => ROLE_CAT[role] || 'fresh';
export const expToLevel = exp => EXP_LEVEL[exp] || 'fresher';

/** Full name: 2 to 40 characters, letters and spaces only. Returns '' when valid, else the message. */
export function nameError(name) {
  const n = String(name || '').trim();
  if (!n) return 'Please enter your full name.';
  if (n.length < 2) return 'Name must be at least 2 letters.';
  if (n.length > 40) return 'Name can be at most 40 characters.';
  if (!/^[\p{L}][\p{L} ]*$/u.test(n)) return 'Use letters and spaces only.';
  return '';
}

/** Tags: trimmed, duplicate-free (case-insensitive), at most `max`, each at most 30 characters. */
export function cleanTags(list, max) {
  const out = [];
  (list || []).forEach(t => {
    const v = String(t || '').trim().replace(/\s+/g, ' ').slice(0, 30);
    if (v && !out.some(x => x.toLowerCase() === v.toLowerCase()) && out.length < max) out.push(v);
  });
  return out;
}

/** My words to start with: name parts and city (the user can remove or add words). */
export function defaultWords(name, city, words = []) {
  return cleanTags([...String(name || '').split(/\s+/), ...String(city || '').split(/[,\s]+/).filter(w => w.length > 2), ...words], MAX_WORDS);
}

/** When the name or city changes, swap the old name/city words in My words for the new ones. */
export function updateWords(words, before = {}, after = {}) {
  const old = new Set([...String(before.name || '').split(/\s+/), ...String(before.city || '').split(/[,\s]+/)].map(w => w.toLowerCase()).filter(Boolean));
  const kept = (words || []).filter(w => !old.has(String(w).toLowerCase()));
  return defaultWords(after.name, after.city, kept);
}

/** "A, B and C" (the form the sample answers use for {skills}). */
export const joinList = a => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);

/** Profile object from the setup form. Keeps optional older fields (university, project, ...). */
export function buildProfile(form, old = {}) {
  const name = String(form.name || '').trim().replace(/\s+/g, ' ');
  const role = form.role === 'Other' ? String(form.roleOther || '').trim() || 'Other' : form.role;
  const skillTags = cleanTags(form.skills, MAX_SKILLS);
  return {
    ...old,
    name,
    role,
    roleKey: form.role,
    edu: String(form.edu || '').trim(),
    degree: String(form.edu || '').trim() || old.degree || '',
    city: String(form.city || '').trim(),
    exp: EXPERIENCE[form.exp] ? form.exp : 'fresher',
    skillTags,
    skills: joinList(skillTags),
    words: cleanTags(form.words, MAX_WORDS),
    setup: 1
  };
}

/** Setup is complete when the active profile was saved through the setup screen with a valid name. */
export const setupDone = p => !!(p && p.setup && !nameError(p.name));

// Built-in sample profiles of older versions. They are deleted at start-up (with their edits).
export const LEGACY_DEMO_NAMES = ['Alex Khan', 'Ali Khan'];
