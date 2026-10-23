// Personalised sample answers: ONE place that decides which details fill an answer for a category.
// Used by the "Introduce yourself" answer, the {placeholder} filler, the Practice screen and the
// Mock expected text (the words the mic is matched against), so all of them always agree.
//
// The profile has one target role and its skills. A category for another job (for example
// Customer Service for a Software Engineer profile) must not get "JavaScript ... Software
// Engineer role": it gets the category's own role, and skills / project typed for this session
// (kept in memory only, never in the profile) or the category's default skills.
// Pure functions, no storage, no network: unit tested in tests/practice/answer-context.test.mjs.
import { ROLE, DEF } from '../data/questions.js';
import { FAMILIES } from '../data/parents.js';
import { catToRole, ROLE_SKILLS } from './setup.js';
import { expandDegree, roleText, article, list, isIntroQuestion } from './expected.js';

/** setupRole of the general categories (HR Questions, Situational, Behavioral, Fresh Graduate). */
export const GENERIC_ROLE = 'Fresher/General';

/** Profile roles that count as a match for each other's categories (config: src/data/parents.js). */
export { FAMILIES };

export const MAX_SKILLS = 5;
export const MAX_SKILL_LEN = 30;
export const MAX_PROJECT_LEN = 80;
const DEFAULT_SKILLS = 4;

const norm = s =>
  String(s ?? '')
    .trim()
    .toLowerCase();
// Families of a role (a role can be in more than one, for example Cloud/DevOps).
const familiesOf = r => Object.keys(FAMILIES).filter(f => FAMILIES[f].some(x => norm(x) === norm(r)));

// Text from the profile or the user, safe inside an answer: no braces or brackets (they would read
// as placeholders), no "undefined" / "null", single spaces, no trailing full stop.
const txt = v =>
  v == null
    ? ''
    : String(v)
        .replace(/[{}[\]<>]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[.\s]+$/, '');

/** true for the general categories: they always use the profile as it is. */
export const isGeneric = cat => {
  const r = catToRole(cat);
  return !r || r === GENERIC_ROLE;
};

/** The profile's target role key ("Software Engineer", "Other", ...). */
const profileRoleKey = p => (p && (p.roleKey || p.role)) || '';

/** Does the profile's target role fit this category (same role or same family)? */
export function roleMatches(p, cat) {
  if (isGeneric(cat)) return true;
  const want = catToRole(cat);
  const have = profileRoleKey(p);
  if (!have) return false;
  if (norm(have) === norm(want)) return true;
  const theirs = familiesOf(want);
  return familiesOf(have).some(f => theirs.includes(f));
}

/** The profile role as words for an answer, or '' for none / "Other" / "Fresher/General". */
const userRole = p => {
  const r = txt(roleText(p && p.role));
  return /^(other|fresher and general)$/i.test(r) ? '' : r;
};

const profileSkills = p => {
  const tags = p && Array.isArray(p.skillTags) && p.skillTags.length ? p.skillTags : String((p && p.skills) || '').split(/,| and /);
  return tags.map(txt).filter(Boolean).slice(0, MAX_SKILLS);
};

/** The first few suggested skills of the category's role (setup screen list). */
export const defaultSkills = cat => (ROLE_SKILLS[catToRole(cat)] || []).slice(0, DEFAULT_SKILLS);

/** The role the answers of this category talk about. */
export const categoryRole = cat => txt(roleText(ROLE[cat] || catToRole(cat)));

/**
 * Details that fill the answers of a category.
 * p: the active profile ({} or undefined if none). session: { skills: [], project } typed for this
 * category in this app session (or undefined).
 */
export function answerContext(p, cat, session) {
  const q = p || {};
  const generic = isGeneric(cat);
  const match = roleMatches(q, cat);
  const { degree, studying } = expandDegree(q.edu || q.degree);
  const ses = session || {};
  const sesSkills = Array.isArray(ses.skills) ? ses.skills.map(txt).filter(Boolean).slice(0, MAX_SKILLS) : [];
  return {
    name: txt(q.name),
    city: txt(q.city),
    degree: txt(degree),
    studying,
    uni: txt(q.uni),
    role: generic ? userRole(q) : categoryRole(cat),
    skills: match ? profileSkills(q) : sesSkills.length ? sesSkills : defaultSkills(cat),
    project: match ? txt(q.project) : txt(ses.project),
    certs: match ? txt(q.certs) : '',
    strength: txt(q.strength),
    weakness: txt(q.weakness),
    achievement: txt(q.achievement),
    match,
    generic
  };
}

/** "Introduce yourself in 2 minutes" gets the long answer; other intro questions the short one. */
export const isLongIntro = question => /\b(2|two) minutes?\b/i.test(String(question || ''));

// Spaces and punctuation tidy-up for every built answer.
const tidy = s =>
  String(s)
    .replace(/[^\S\n]{2,}/g, ' ')
    .replace(/ +([.,!?])/g, '$1')
    .replace(/^ +| +$/gm, '')
    .replace(/^•$/gm, '') // a bullet whose sentence was left out
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/**
 * "Tell me about yourself" (short) or "Introduce yourself in 2 minutes" (long). Parts whose
 * details are empty are left out; the result never has braces, brackets or "undefined".
 */
export function introAnswer(ctx, long = false) {
  const { name, city, degree, studying, uni, role, skills = [], project } = ctx || {};
  const S = ['Good morning, and thank you for this opportunity.'];
  if (name) S.push(`My name is ${name}${city ? `, and I am from ${city}` : ''}.`);
  else if (city) S.push(`I am from ${city}.`);
  const deg = degree ? `${studying ? 'I am currently pursuing' : 'I hold'} ${article(degree)} ${degree}${uni ? ` from ${uni}` : ''}` : '';
  if (long && role) S.push(deg ? `${deg}, and I am applying for the ${role} role.` : `I am applying for the ${role} role.`);
  else if (deg) S.push(`${deg}.`);
  if (skills.length) S.push(`My key skills include ${list(skills)}.`);
  if (project) S.push(long ? `I built ${project}, which taught me how to solve real problems and learn from feedback.` : `I recently worked on ${project}.`);
  if (long) S.push('I enjoy learning new tools quickly and working well with others.');
  if (role)
    S.push(`I am now looking for ${article(role)} ${role} role where I can ${skills.length ? 'use these skills' : 'learn'}, grow and add value to the team.`);
  S.push('Thank you.');
  return tidy(S.join(' '));
}

const HOLE = '\u0000';
// Words used when a general category has no role or no skills, so short answers keep their meaning.
const NEUTRAL = { role: 'professional', skills: 'relevant skills' };

/**
 * Fill {placeholders} of a sample answer from the context. A placeholder with no value uses the
 * neutral default (DEF); with no default, the whole sentence around it is left out, so text like
 * "[skills]" can never appear.
 */
export function fillTemplate(t, ctx) {
  const c = ctx || {};
  const val = k => {
    if (k === 'skills') return list(c.skills || []);
    if (k === 'degree') return c.degree ? c.degree : '';
    return typeof c[k] === 'string' ? c[k] : '';
  };
  const value = k => val(k) || DEF[k] || NEUTRAL[k] || '';
  let s = String(t ?? '');
  if (!c.uni) s = s.replace(/,?\s+(at|from) \{uni\}/g, '').replace(/\bAt \{uni\}/g, 'At university');
  if (!val('role')) s = s.replace(/\bthe \{role\} (position|role)\b/g, 'this $1');
  // "a {role}" -> "an Accountant": the article follows the word that is filled in.
  s = s.replace(/\b(a|an|A|An) \{(\w+)\}/g, (m, a, k) => {
    const v = value(k);
    if (!v) return m;
    const art = article(v);
    return `${a[0] === 'A' ? art[0].toUpperCase() + art.slice(1) : art} {${k}}`;
  });
  s = s.replace(/\{(\w+)\}/g, (_, k) => value(k) || HOLE);
  // Leave out each sentence (or bullet line) that still has an empty placeholder.
  s = s.replace(new RegExp(`[^.!?\\n]*${HOLE}[^.!?\\n]*[.!?]?`, 'g'), '');
  return tidy(s.replace(/[{}[\]]/g, ''));
}

/** The sample answer for a question (no saved edit): the intro answer or the filled template. */
export function sampleAnswer(question, template, ctx) {
  if (isIntroQuestion(question)) return introAnswer(ctx, isLongIntro(question));
  return template ? fillTemplate(template, ctx) : '';
}

// Text typed in the "Personalize" sheet: plain words only (HTML and special characters removed).
const plain = (v, max) =>
  String(v ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^\p{L}\p{N} .,+#&()/'-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
    .trim();

/**
 * Validate the "Personalize" sheet: up to 5 skills of up to 30 characters (comma separated) and an
 * optional project of up to 80 characters. Returns { skills, project, error }.
 */
export function parseSessionInput(skillsText, projectText) {
  const seen = new Set();
  const skills = String(skillsText ?? '')
    .split(',')
    .map(s => plain(s, MAX_SKILL_LEN).replace(/^[.,]+|[.,]+$/g, ''))
    .filter(s => s && !seen.has(s.toLowerCase()) && seen.add(s.toLowerCase()))
    .slice(0, MAX_SKILLS);
  const project = plain(projectText, MAX_PROJECT_LEN).replace(/[.\s]+$/, '');
  return { skills, project, error: skills.length ? '' : 'Add at least one skill or tap Skip' };
}
