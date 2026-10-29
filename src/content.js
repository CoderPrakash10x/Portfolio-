// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change anything on the site.
//  Items marked  placeholder: true  show a visible "add me" label.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Prakash Dubey',
  role: 'Full-stack developer',
  location: 'Gorakhpur, India',
  // Hero
  headline: 'I build things people use live.',
  intro:
    'Full-stack developer working in the MERN stack. My event platform ran a 10-level treasure hunt for 300+ people at once, on free-tier hosting, without going down.',
  status: 'Available for internships and full-time roles',
  // Contact (taken from your GitHub README — change if needed)
  email: 'mr.prakash10x@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/CoderPrakash10x' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prakash-dubey-394020371' },
  ],
}

export const about = {
  paragraphs: [
    "I'm a third-year B.Tech CSE student at KIPM College of Engineering & Technology in Gorakhpur. I like projects where real people are waiting on the other side of the screen: event nights, competitions, club portals.",
    'I use AI-assisted workflows (GitHub Copilot and Claude) to move faster, and I still read, test and own every line that ships.',
  ],
  // TODO: replace with your own words — how you approach building and design.
  approach: {
    placeholder: true,
    text: '[Add 1–2 sentences on how you approach development and design.]',
  },
  focus: ['Next.js', 'Advanced React patterns', 'System design'],
  facts: [
    { k: 'Based in', v: 'Gorakhpur, India' },
    { k: 'Studying', v: 'B.Tech CSE, 3rd year' },
    { k: 'Selected for', v: 'Smart India Hackathon 2025' },
  ],
}

export const projects = [
  {
    title: 'Ignitia Nexus',
    kind: 'Live tech treasure hunt platform',
    desc: 'A 10-level sequential decryption game with four kinds of interactive challenges, run live at Evolvera Club’s annual tech fest. A real-time admin console controls the event lifecycle and shows a live leaderboard with CSV export.',
    role: 'Built and deployed the full stack',
    tags: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'JWT', 'Vercel', 'Render'],
    result: '300+ concurrent users, zero downtime on free-tier hosting',
    url: null, // e.g. 'https://…'
    image: null, // e.g. '/projects/ignitia.png' (put the file in /public/projects)
  },
  {
    title: 'Traitor Hunt',
    kind: 'Live team game for Evolvera',
    desc: 'A live team game for Evolvera events: everyone plays on their phone while a projector on the wall drives the room, in teams of four.',
    role: 'Built the whole system myself',
    tags: ['MERN'], // TODO: add the exact stack you used
    result: null,
    url: null,
    image: null,
  },
  {
    title: 'KIF RMS',
    kind: 'Full-stack management system',
    desc: '[Add a one-line description of what KIF RMS does and who uses it.]',
    role: '[Add your role]',
    tags: ['Full-stack'], // TODO: add the exact stack
    result: null,
    placeholder: true,
    url: null,
    image: null,
  },
  {
    title: 'Evolvera Club Website',
    kind: 'Official club portal',
    desc: 'The official website for KIPM’s technical club. Admins update events and members through a built-in CMS without touching code.',
    role: 'Sole developer, ongoing production ownership',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'Node.js', 'MongoDB', 'Vercel'],
    result: null,
    url: null, // add the live URL
    image: null,
  },
]

// Shown in the "More work" list. Add or remove freely.
export const moreWork = [
  { title: 'BugHunt', note: 'Online coding competition platform with Judge0 evaluation and anti-cheat controls' },
  { title: 'MindMirror AI', note: 'AI journaling and self-reflection app, Smart India Hackathon 2025' },
  { title: 'RsBlog Website', note: 'Blog website', url: 'https://github.com/CoderPrakash10x/RsBlog_Website' },
  { title: 'Animated Navbar', note: 'CSS navigation experiment', url: 'https://github.com/CoderPrakash10x/AnimatedNavbar' },
]

// Only technologies listed on your GitHub profile. Remove any you don’t want shown.
export const skills = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'JWT auth'] },
  { group: 'Data', items: ['MongoDB', 'MySQL', 'Firebase'] },
  { group: 'Ship & tools', items: ['Vercel', 'Render', 'MongoDB Atlas', 'Git & GitHub', 'Postman', 'VS Code'] },
]

// Per-project panel settings: tone (dark|light), accent colour, which mock UI to draw.
// Accents: acid green for Ignitia, signal red elsewhere.
export const scenes = {
  'Ignitia Nexus': { tone: 'dark', accent: '#B7FF35', mock: 'terminal' },
  'Traitor Hunt': { tone: 'light', accent: '#FF3030', mock: 'game' },
  'KIF RMS': { tone: 'dark', accent: '#FF3030', mock: 'dash', placeholder: true },
  'Evolvera Club Website': { tone: 'light', accent: '#FF3030', mock: 'site' },
}

// Experience / milestones. Only things you have told me or published on GitHub.
// Replace each "[year]" with the real date, and add anything else (internships, certificates…).
export const experience = [
  { when: '[year]', what: 'B.Tech CSE, 3rd year', where: 'KIPM College of Engineering & Technology, Gorakhpur' },
  { when: '[year]', what: 'Lead developer, Evolvera Club website', where: 'Sole developer with ongoing production ownership' },
  { when: '[year]', what: 'Built and ran Ignitia Nexus live', where: 'Evolvera Club’s annual tech fest, 300+ concurrent users' },
  { when: '2025', what: 'Selected, Smart India Hackathon', where: 'MindMirror AI, an AI-powered mental health and self-reflection web app' },
]
