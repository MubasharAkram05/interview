// Setup details asked before the first Mock or Practice session (Full name, target role, education,
// city, experience, skills, My words, voice accent). Stored on the phone only.
// Pure helpers, unit tested in tests/practice/setup.test.mjs.

export const ROLES = [
  'Software Engineer',
  'Web Developer',
  'Cloud/DevOps',
  'IT Support',
  'Data/AI',
  'Marketing/Sales',
  'Customer Service',
  'Teaching',
  'Fresher/General',
  'Other'
];
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
  'Marketing/Sales': 'marketing',
  'Customer Service': 'customer',
  Teaching: 'teaching',
  'Fresher/General': 'fresh',
  Other: 'fresh'
};
const EXP_LEVEL = { fresher: 'fresher', mid: 'junior', senior: 'senior' };
export const roleToCat = role => ROLE_CAT[role] || 'fresh';
// The interview type the user picked first fills in the target role.
const CAT_ROLE = {
  software: 'Software Engineer',
  cloud: 'Cloud/DevOps',
  marketing: 'Marketing/Sales',
  customer: 'Customer Service',
  teaching: 'Teaching',
  fresh: 'Fresher/General'
};
export const catToRole = cat => CAT_ROLE[cat] || '';

// Key skill suggestions for each target role (setup screen).
export const ROLE_SKILLS = {
  'Software Engineer': [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'React',
    'Node.js',
    'SQL',
    'Git',
    'REST API',
    'Data structures',
    'Algorithms',
    'OOP',
    'Unit testing',
    'Agile'
  ],
  'Web Developer': [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Angular',
    'Vue',
    'Node.js',
    'Express',
    'PHP',
    'WordPress',
    'MySQL',
    'REST API',
    'Responsive design',
    'Git'
  ],
  'Cloud/DevOps': [
    'AWS',
    'Azure',
    'Google Cloud',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Ansible',
    'Jenkins',
    'CI/CD',
    'Linux',
    'Bash',
    'Monitoring',
    'Networking',
    'Cloud security'
  ],
  'IT Support': [
    'Windows',
    'Linux',
    'Networking',
    'TCP/IP',
    'DNS',
    'Active Directory',
    'Troubleshooting',
    'Hardware',
    'Office 365',
    'Ticketing',
    'CCNA',
    'Firewall',
    'VPN',
    'Customer service'
  ],
  'Data/AI': [
    'Python',
    'SQL',
    'Excel',
    'Power BI',
    'Tableau',
    'Pandas',
    'NumPy',
    'Machine learning',
    'Statistics',
    'Data analysis',
    'Data visualization',
    'TensorFlow',
    'AI'
  ],
  'Marketing/Sales': [
    'SEO',
    'Social media',
    'Content writing',
    'Google Ads',
    'Email marketing',
    'CRM',
    'Negotiation',
    'Communication',
    'Market research',
    'Lead generation',
    'Canva',
    'Sales'
  ],
  'Customer Service': [
    'Communication',
    'Problem solving',
    'Patience',
    'CRM',
    'Call handling',
    'Complaint handling',
    'Teamwork',
    'Time management',
    'MS Office',
    'Empathy'
  ],
  Teaching: ['Lesson planning', 'Classroom management', 'Communication', 'Curriculum', 'Assessment', 'MS Office', 'Online teaching', 'Mentoring', 'Patience'],
  'Fresher/General': ['Communication', 'Teamwork', 'MS Office', 'Excel', 'Time management', 'Problem solving', 'Leadership', 'Adaptability', 'Quick learner']
};

/**
 * My words, made automatically from the details (never shown to the user): name parts, city,
 * education, role and skills. They feed voice hints, name matching and the Mock chips.
 */
export function autoWords(p = {}) {
  const parts = [
    ...String(p.name || '').split(/\s+/),
    ...String(p.city || '').split(/[,\s]+/),
    ...(p.skillTags || []),
    ...String(p.role || '').split(/[\s/]+/),
    ...String(p.edu || '').split(/[,\s]+/)
  ];
  return cleanTags(
    parts.filter(w => w.length > 1 && !/^(and|of|the|in|at|a|an|from)$/i.test(w)),
    MAX_WORDS
  );
}
export const expToLevel = exp => EXP_LEVEL[exp] || 'fresher';

/** Full name: 2 to 40 characters, letters and spaces only. Returns '' when valid, else the message. */
export function nameError(name) {
  const n = String(name || '').trim();
  if (!n) return 'Please enter your full name.';
  if (n.length < 2) return 'Name must be at least 2 letters.';
  if (n.length > 40) return 'Name can be at most 40 characters.';
  // Letters (with accents and vowel signs), spaces, and the ' - . of names like D'Souza or Abdul-Rahman.
  if (!/^\p{L}[\p{L}\p{M}' .-]*$/u.test(n)) return 'Use letters, spaces, apostrophes or hyphens only.';
  return '';
}

/** Tags: trimmed, duplicate-free (case-insensitive), at most `max`, each at most 30 characters. */
export function cleanTags(list, max) {
  const out = [];
  (list || []).forEach(t => {
    const v = String(t || '')
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, 30);
    if (v && !out.some(x => x.toLowerCase() === v.toLowerCase()) && out.length < max) out.push(v);
  });
  return out;
}

/** My words to start with: name parts and city (the user can remove or add words). */
export function defaultWords(name, city, words = []) {
  return cleanTags(
    [
      ...String(name || '').split(/\s+/),
      ...String(city || '')
        .split(/[,\s]+/)
        .filter(w => w.length > 2),
      ...words
    ],
    MAX_WORDS
  );
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
  const name = String(form.name || '')
    .trim()
    .replace(/\s+/g, ' ');
  const role = form.role === 'Other' ? String(form.roleOther || '').trim() || 'Other' : form.role;
  const skillTags = cleanTags(form.skills, MAX_SKILLS);
  const p = {
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
    setup: 1
  };
  p.words = autoWords(p);
  return p;
}

/** Setup is complete when the active profile was saved through the setup screen with a valid name. */
export const setupDone = p => !!(p && p.setup && !nameError(p.name));

// Built-in sample profiles of older versions. They are deleted at start-up (with their edits).
export const LEGACY_DEMO_NAMES = ['Alex Khan', 'Ali Khan'];
