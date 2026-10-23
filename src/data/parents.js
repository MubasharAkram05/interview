// Parent groups on Home, Practice and Mock: a display layer over the interview types (category
// ids never change). Data driven: a later PR adds a type to a parent by adding its id here, with
// no UI change. A parent with no children is hidden; a parent with one child shows that child.
//   id, label, order: the parent and its place (lowest first)
//   short: the tile name (at most 12 characters); the full label is in the dropdown header and is
//          what screen readers hear
//   icon, color: 24x24 stroke icon (same style as the type icons) and tile colour
//   children: type ids in order; { id, label } gives the child its own display label inside this
//             parent (for example a first child named exactly like the parent)
//   keywords: extra words that find the parent in search
import { CATS, ROLE } from './questions.js';
import { catToRole, ROLE_SKILLS } from '../services/setup.js';

export const PARENTS = [
  {
    id: 'general',
    label: 'General Interview',
    short: 'General',
    order: 1,
    color: '#6a1bff',
    icon: 'M4 5h12v9H8l-4 3zM20 9v9l-3-2.5h-7',
    children: ['situational', 'behavioral', 'fresh'],
    keywords: ['hr', 'fresher', 'graduate', 'common']
  },
  {
    id: 'software',
    label: 'Software Development',
    short: 'Software',
    order: 2,
    color: '#1f3cff',
    icon: 'M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16',
    children: ['software', 'java', 'cpp'],
    keywords: ['programming', 'coding', 'developer']
  },
  {
    id: 'web',
    label: 'Web Development',
    short: 'Web',
    order: 3,
    color: '#0369a1',
    icon: 'M3 5h18v14H3zM3 9h18M10 12l-2 2.5 2 2.5M14 12l2 2.5-2 2.5',
    children: ['web'],
    keywords: ['frontend', 'website']
  },
  {
    id: 'mobile',
    label: 'Mobile App Development',
    short: 'Mobile',
    order: 4,
    color: '#0e7490',
    icon: 'M7 2h10v20H7zM11 18h2',
    children: [],
    keywords: ['android', 'ios', 'flutter']
  },
  {
    id: 'game',
    label: 'Game Development',
    short: 'Game',
    order: 5,
    color: '#7e22ce',
    icon: 'M6 9h12a4 4 0 0 1 0 8c-1.5 0-2.5-1-3.5-2h-5c-1 1-2 2-3.5 2a4 4 0 0 1 0-8zM8 11v4M6 13h4M16 12h.01M18 14h.01',
    children: [],
    keywords: ['unity', 'unreal']
  },
  {
    id: 'database',
    label: 'Database',
    short: 'Database',
    order: 6,
    color: '#4338ca',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    children: ['sql'],
    keywords: ['sql', 'dba']
  },
  {
    id: 'data',
    label: 'Data and Analytics',
    short: 'Data',
    order: 7,
    color: '#b45309',
    icon: 'M3 3v18h18M7 15l4-4 3 3 6-6',
    children: ['data'],
    keywords: ['analyst', 'excel', 'power bi']
  },
  {
    id: 'ai',
    label: 'AI and Machine Learning',
    short: 'AI and ML',
    order: 8,
    color: '#a21caf',
    icon: 'M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z',
    children: [],
    keywords: ['ml', 'artificial intelligence']
  },
  {
    id: 'cloud',
    label: 'Cloud',
    short: 'Cloud',
    order: 9,
    color: '#15803d',
    icon: 'M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5 4 4 0 0 1 17.5 18zM12 12v4M10 14h4',
    children: ['cloud'],
    keywords: ['aws', 'azure']
  },
  {
    id: 'devops',
    label: 'DevOps',
    short: 'DevOps',
    order: 10,
    color: '#047857',
    icon: 'M7 8a4 4 0 1 0 0 8c2.5 0 4-2 5-4s2.5-4 5-4a4 4 0 1 1 0 8c-2.5 0-4-2-5-4S9.5 8 7 8z',
    children: [],
    keywords: ['ci/cd', 'docker', 'kubernetes']
  },
  {
    id: 'cyber',
    label: 'Cyber Security',
    short: 'Cyber',
    order: 11,
    color: '#0f766e',
    icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12h6v4H9zM10 12v-2a2 2 0 0 1 4 0v2',
    children: ['cyber'],
    keywords: ['security', 'infosec']
  },
  {
    id: 'itnet',
    label: 'IT Support and Networking',
    short: 'IT & Network',
    order: 12,
    color: '#2563eb',
    icon: 'M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4',
    children: ['it', 'network'],
    keywords: ['helpdesk', 'network', 'ccna']
  },
  {
    id: 'testing',
    label: 'Testing and QA',
    short: 'Testing',
    order: 13,
    color: '#4d7c0f',
    icon: 'M5 4h14v16H5zM9 11l2 2 4-4',
    children: [],
    keywords: ['qa', 'tester']
  },
  {
    id: 'business',
    label: 'Business and Product',
    short: 'Business',
    order: 14,
    color: '#475569',
    icon: 'M3 7h18v13H3zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18',
    children: [],
    keywords: ['product manager', 'business analyst']
  },
  {
    id: 'graphic',
    label: 'Graphic Design',
    short: 'Graphic',
    order: 15,
    color: '#c026d3',
    icon: 'M12 19l7-7 3 3-7 7zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.6 7.6M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    children: ['graphic'],
    keywords: ['designer', 'photoshop']
  },
  {
    id: 'uiux',
    label: 'UI/UX Design',
    short: 'UI/UX',
    order: 16,
    color: '#db2777',
    icon: 'M3 4h18v16H3zM3 9h18M9 9v11',
    children: [],
    keywords: ['figma', 'ux']
  },
  {
    id: 'video',
    label: 'Video and Animation',
    short: 'Video',
    order: 17,
    color: '#e11d48',
    icon: 'M3 6h13v12H3zM16 10l5-3v10l-5-3',
    children: [],
    keywords: ['editor', 'motion']
  },
  {
    id: 'content',
    label: 'Content and Writing',
    short: 'Content',
    order: 18,
    color: '#9a3412',
    icon: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5',
    children: [],
    keywords: ['writer', 'copywriting']
  },
  {
    id: 'hr',
    label: 'Human Resources',
    short: 'HR',
    order: 19,
    color: '#9333ea',
    icon: 'M9 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1M16 4a3 3 0 0 1 0 6M21 20v-1a5 5 0 0 0-3-4.6',
    children: ['hr'],
    keywords: ['recruiter', 'hr']
  },
  {
    id: 'management',
    label: 'Management and Operations',
    short: 'Operations',
    order: 20,
    color: '#c2410c',
    icon: 'M8 4h8v3H8zM6 5H4v16h16V5h-2M8 12h8M8 16h5',
    children: ['ops'],
    keywords: ['manager', 'operations']
  },
  {
    id: 'finance',
    label: 'Finance and Banking',
    short: 'Finance',
    order: 21,
    color: '#166534',
    icon: 'M3 10l9-6 9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18',
    children: ['accounting', 'finance'],
    keywords: ['bank', 'accountant']
  },
  {
    id: 'marketing',
    label: 'Marketing',
    short: 'Marketing',
    order: 22,
    color: '#dc2626',
    icon: 'M3 11v3l12 5V6zM15 9a4 4 0 0 1 0 6M6 14l1 6h3l-1-5',
    children: ['marketing'],
    keywords: ['seo', 'digital marketing']
  },
  {
    id: 'sales',
    label: 'Sales and Retail',
    short: 'Sales',
    order: 23,
    color: '#6d28d9',
    icon: 'M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2',
    children: ['sales'],
    keywords: ['shop', 'store']
  },
  {
    id: 'customer',
    label: 'Customer Service',
    short: 'Support',
    order: 24,
    color: '#be123c',
    icon: 'M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3zM20 19a4 4 0 0 1-4 3h-2',
    children: ['customer'],
    keywords: ['call centre', 'call center', 'support']
  },
  {
    id: 'electronics',
    label: 'Electronics and Embedded',
    short: 'Electronics',
    order: 25,
    color: '#ea580c',
    icon: 'M6 6h12v12H6zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4',
    children: ['micro'],
    keywords: ['microprocessor', 'embedded']
  },
  {
    id: 'civil',
    label: 'Civil and Construction',
    short: 'Civil',
    order: 26,
    color: '#92400e',
    icon: 'M4 21V8l8-5 8 5v13M9 21v-6h6v6M3 21h18',
    children: ['civil'],
    keywords: ['construction', 'site engineer']
  },
  {
    id: 'mechanical',
    label: 'Mechanical and Industrial',
    short: 'Mechanical',
    order: 27,
    color: '#be185d',
    icon: 'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
    children: ['mech'],
    keywords: ['industrial', 'production']
  },
  {
    id: 'electrical',
    label: 'Electrical and Power',
    short: 'Electrical',
    order: 28,
    color: '#a16207',
    icon: 'M13 2L4 14h7l-1 8 9-12h-7z',
    children: [],
    keywords: ['electrician', 'power']
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    short: 'Hospitality',
    order: 29,
    color: '#9d174d',
    icon: 'M3 18h18M5 18a7 7 0 0 1 14 0M12 8V6M10 6h4',
    children: ['waiter'],
    keywords: ['restaurant', 'hotel', 'waiter']
  },
  {
    id: 'education',
    label: 'Education',
    short: 'Education',
    order: 30,
    color: '#b91c1c',
    icon: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6',
    children: ['teaching'],
    keywords: ['teacher', 'school']
  },
  {
    id: 'health',
    label: 'Healthcare',
    short: 'Health',
    order: 31,
    color: '#e0115f',
    icon: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z',
    children: [],
    keywords: ['nurse', 'doctor']
  },
  {
    id: 'government',
    label: 'Government and Public Service',
    short: 'Government',
    order: 32,
    color: '#1e40af',
    icon: 'M3 9l9-5 9 5zM5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 21h18',
    children: [],
    keywords: ['public service', 'css']
  },
  {
    id: 'freelance',
    label: 'Freelancing and Business',
    short: 'Freelance',
    order: 33,
    color: '#0d9488',
    icon: 'M4 5h16v11H4zM2 19h20',
    children: [],
    keywords: ['freelancer', 'entrepreneur']
  }
];

// Profile roles that count as a match for each other's types (answer-context.js). Config only:
// a later PR adds a role to a family here. Data/AI and Graphic Designer have no family.
export const FAMILIES = {
  Software: ['Software Engineer', 'Web Developer', 'Java Developer', 'C/C++ Developer', 'Database Developer'],
  Infra: ['Cloud/DevOps', 'IT Support', 'Network Engineer', 'Cyber Security']
};

// Tile name of a type when it is the only child of its parent (the tile opens it directly).
// Missing: the parent's short name.
export const CAT_SHORT = {
  web: 'Web',
  sql: 'SQL',
  data: 'Data',
  cloud: 'Cloud',
  cyber: 'Cyber',
  graphic: 'Graphic',
  hr: 'HR',
  ops: 'Operations',
  marketing: 'Marketing',
  sales: 'Sales',
  customer: 'Support',
  micro: 'Electronics',
  civil: 'Civil',
  mech: 'Mechanical',
  waiter: 'Waiter',
  teaching: 'Teaching'
};

const kid = x => (typeof x === 'string' ? { id: x } : x);

/** Children of a parent that exist, as { id, label } (label: the display label inside this parent). */
export const childrenOf = p =>
  p.children
    .map(kid)
    .filter(k => CATS[k.id])
    .map(k => ({ id: k.id, label: k.label || CATS[k.id] }));

/** Parents to show, in order: only those with at least one child. */
export const visibleParents = () => [...PARENTS].sort((a, b) => a.order - b.order).filter(p => childrenOf(p).length);

/** The parent of a type id (each type is in exactly one parent). */
export const parentOf = c => PARENTS.find(p => p.children.map(kid).some(k => k.id === c));

/** Display label of a type (its label inside its parent, else the type label). */
export function displayLabel(c) {
  const p = parentOf(c);
  const k = p && childrenOf(p).find(x => x.id === c);
  return (k && k.label) || CATS[c] || '';
}

const norm = s =>
  String(s ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#]+/gu, ' ')
    .trim();

/**
 * Search types. Matches the child display label, its role label (and setup role), the parent label
 * and keywords. Every word typed must match. Names come first: when a name matches, only name
 * matches are shown; otherwise the role's skill suggestions are used as keywords too.
 * Returns [{ parent, children: [{ id, label }] }] in Home order; a parent whose own label or
 * keywords match keeps all its children.
 */
export function searchCats(query) {
  const words = norm(query).split(' ').filter(Boolean);
  if (!words.length) return [];
  const hit = text => words.every(w => text.includes(w));
  const run = withSkills => {
    const out = [];
    for (const p of visibleParents()) {
      const pText = [p.label, ...(p.keywords || [])].join(' ');
      const own = childrenOf(p).filter(k => {
        const role = catToRole(k.id);
        const skills = withSkills ? ROLE_SKILLS[role] || [] : [];
        return hit(norm([k.label, CATS[k.id], ROLE[k.id], role, pText, ...skills].join(' ')));
      });
      if (own.length) out.push({ parent: p, children: own });
    }
    return out;
  };
  const named = run(false);
  return named.length ? named : run(true);
}

/** Tile name of a parent: its short name, or for a parent with one type, that type's short name. */
export function tileLabel(p) {
  const kids = childrenOf(p);
  return kids.length === 1 ? CAT_SHORT[kids[0].id] || p.short : p.short;
}
