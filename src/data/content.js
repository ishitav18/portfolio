// ---------------------------------------------------------------------------
// All site copy lives here. Populated from Ishita's existing portfolio.
// Items still marked TODO need real values from Ishita.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Ishita',
  fullName: 'Ishita', // TODO: add last name
  role: 'Product Designer',
  years: '2+ years',
  city: 'Based in India', // TODO: confirm city
  email: 'ishita9839@gmail.com',
  resumeUrl: '', // TODO: drop resume PDF in public/ and set e.g. './ishita-resume.pdf'
  photo: './images/profile.webp', // hero polaroid photo
  year: new Date().getFullYear(),
}

// Hero headline, animated letter by letter. `italic: true` renders in serif italic.
export const headline = [
  { text: 'I craft user-first products where', break: true },
  { text: 'every interaction has purpose, clarity & ', break: false },
  { text: 'impact', italic: true },
  { text: '.', break: false },
]

// Small draggable principle chips scattered around the hero.
export const principleChips = [
  'Research first',
  'Prototype it',
  'Test with users',
  'Clarity wins',
]

export const terminal = {
  title: 'ishita — zsh',
  lines: [
    { cmd: 'who_am_i', out: 'Product Designer · 2+ years · Based in India' },
    { cmd: 'focus', out: 'Purpose, clarity, measurable impact' },
    { cmd: 'currently', out: 'Designing EV charging experiences at Massive' },
  ],
}

// Skills marquee in the hero sticker.
export const stacks = [
  'UX Research',
  'User Flows',
  'Visual Design',
  'Information Architecture',
  'UI Design',
  'Design Systems',
  'Responsive Design',
  'Usability Testing',
  'Wireframing',
  'Prototyping',
]

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Selected Work' },
  { id: 'about', label: 'About Me' },
  { id: 'contact', label: 'Contact' },
]

// Selected work — Ishita's three case studies.
// caseStudy copy drafted from Ishita's Framer portfolio taglines + shipped
// screens. TODO: Ishita should fact-check and add real metrics where known.
export const projects = [
  {
    year: '2025',
    title: 'Massive Charging: an EV ecosystem that feels like fueling',
    tags: ['UX DESIGN', 'MOBILE APP', 'EV'],
    highlights: [
      'Charging experience designed to feel as seamless as a fuel stop',
      'Live on the Play Store for a growing EV user base',
    ],
    link: {
      label: 'View on Play Store',
      href: 'https://play.google.com/store/apps/details?id=com.massive.charging.app&hl=en_in',
    },
    tone: 'from-[#99f6e4] to-[#d9f99d]',
    image: './images/massive-charging.png',
    caseStudy: {
      intro:
        'As EV adoption continues to grow, users expect charging experiences to be as seamless as traditional fueling.',
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Timeline', value: '2025 — Present' },
        { label: 'Platform', value: 'Android · Mobile app' },
      ],
      sections: [
        {
          heading: 'Background',
          body: 'Massive Charging is an EV charging ecosystem: the app drivers use to find chargers, start and monitor sessions, and pay. The core problem is charging anxiety — unfamiliar stations, uncertain availability, and no clear answer to "when will my car be ready?". The goal was to make a charge feel as predictable as a fuel stop.',
        },
        {
          heading: 'What I designed',
          bullets: [
            'A home screen that leads with the driver’s context — wallet balance, live offers, lifetime stats (sessions, kWh, CO₂ saved) and a map-first entry to find nearby chargers.',
            'A charging-session screen built around one question — “when will it be done?” — with a live battery curve, projected full-charge time, units consumed, elapsed time and running cost.',
            'Live station feedback chips (charger working, sitting area, food, staff, toilets) so drivers build trust in stations for each other.',
            'Deliberate, safety-first controls — like slide-to-stop for ending a session so it can’t happen by accident.',
            'Wallet recharge offers and an Elite cashback subscription that make paying part of the routine.',
          ],
        },
        {
          heading: 'Result',
          body: 'The app is live on the Google Play Store, serving a growing EV user base across India — a charging experience designed to feel as seamless as a fuel stop.',
        },
      ],
    },
  },
  {
    year: '2025',
    title: 'CPO Admin App: modern operations for charging networks',
    tags: ['B2B', 'DASHBOARD', 'PRODUCT DESIGN'],
    highlights: [
      'Modernized the day-to-day workflow of charge point operators',
      'Complex network data made scannable and actionable',
    ],
    link: null,
    tone: 'from-[#bae6fd] to-[#99f6e4]',
    image: './images/cpo-admin.png',
    caseStudy: {
      intro: 'Modernizing the operational experience for EV charging management.',
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Timeline', value: '2025' },
        { label: 'Platform', value: 'Android · B2B mobile app' },
      ],
      sections: [
        {
          heading: 'Background',
          body: 'Charge Point Operators run networks of chargers spread across city locations. Their daily work — tracking collections, energy delivered, charger health, and who is parked at which bay — lived across scattered tools and phone calls. The CPO Admin App brings the whole operation into one mobile view.',
        },
        {
          heading: 'What I designed',
          bullets: [
            'A live “Today’s stats” dashboard — total collection and energy consumption with an hourly energy graph.',
            'Per-station earnings and energy cards, so operators can compare locations at a glance.',
            'A charger board grouping every unit by status — assigned, available, charging, faulty — so problems surface instantly instead of hiding in lists.',
            'Bay-level cards with timers, tariffs and pass-holder details, plus one-tap calling for on-ground coordination.',
          ],
        },
        {
          heading: 'Result',
          body: 'The day-to-day workflow of charge point operators, modernized: complex network data made scannable and actionable from a phone.',
        },
      ],
    },
  },
  {
    year: '2024',
    title: 'Orgamify: making sustainable gardening effortless',
    tags: ['WEB DESIGN', 'E-COMMERCE', 'SUSTAINABILITY'],
    highlights: [
      'Eco-friendly gardening products made easy, accessible and stylish',
      'Clean storefront design that lets the greenery lead',
    ],
    link: null,
    tone: 'from-[#d9f99d] to-[#fde68a]',
    image: './images/orgamify.png',
    caseStudy: {
      intro:
        'Orgamify is a platform that makes sustainable gardening easy, accessible and stylish by offering high-quality, eco-friendly gardening products.',
      meta: [
        { label: 'Role', value: 'Web & UI Designer' },
        { label: 'Timeline', value: '2024' },
        { label: 'Platform', value: 'Web · E-commerce' },
      ],
      sections: [
        {
          heading: 'Background',
          body: 'Orgamify sells eco-friendly gardening products — organic soils, composts and plants. The brief: a storefront that feels as natural as what it sells, letting the greenery lead while keeping shopping effortless.',
        },
        {
          heading: 'What I designed',
          bullets: [
            'A calm, botanical visual language — airy layouts, serif accents and photography-first product cards.',
            'A homepage that flows from brand story to New Arrivals to Organic Collections without breaking the mood.',
            'A category-led catalogue with search, ratings and quick product actions for fast browsing.',
            'Trust signals — shipping & returns, safe payments — woven in without cluttering the design.',
          ],
        },
        {
          heading: 'Result',
          body: 'A clean e-commerce experience where the greenery leads and shopping stays effortless — gardening products made easy, accessible and stylish.',
        },
      ],
    },
  },
]

export const about = {
  kicker: 'LITTLE ABOUT ME',
  title: ['2+ years in, designing', 'products with purpose.'],
  body: 'Ishita is a product designer currently at Massive Charging, crafting user-first digital products where every interaction is designed with purpose, clarity and measurable impact. Before that she designed across fintech and future-tech at Politech Future Solution, Credochain and RevoltronX.',
  moreCta: 'More about me',
  comingSoon: true,
  portraitImage: './images/profile.webp', // About portrait
  brandsKicker: 'COMPANIES I HAVE WORKED WITH',
  // `logo` is a path in public/images; null renders the name as text (RevoltronX).
  brands: [
    { name: 'Massive Charging', logo: './images/massive-logo.png' },
    { name: 'Politech Future Solution', logo: './images/politech-logo.png' },
    { name: 'Credochain', logo: './images/credochain-logo.png' },
    { name: 'RevoltronX', logo: null },
    { name: 'Orgamify', logo: './images/orgamify-logo.png' },
  ],
}

// Experience timeline (shown in the About section).
export const experience = [
  { role: 'Product Designer', org: 'Massive Charging', period: 'Aug 2025 — Present' },
  { role: 'UI/UX Designer', org: 'Politech Future Solution', period: 'Jul 2024 — Jul 2025' },
  { role: 'UI/UX Designer Intern', org: 'Credochain', period: 'Mar 2024 — Jul 2024' },
  { role: 'UI/UX Designer Intern', org: 'RevoltronX', period: 'Jan 2024 — Mar 2024' },
]

export const contact = {
  kicker: 'CONTACT',
  availability: 'Open to product design roles, collaborations, and great conversations.',
  title: ['Let’s make something', 'great together'],
  talkCta: 'Let’s talk',
  socialsKicker: 'ALSO FIND ME ON',
  // Rendered as circular icon buttons (see SocialLinks.jsx). `platform` picks
  // the icon; supported: linkedin, instagram, behance, dribbble, figma,
  // github, x. Add a row to show another. TODO: paste the real profile URLs.
  socials: [
    { platform: 'linkedin', label: 'LinkedIn', href: '' },
    { platform: 'instagram', label: 'Instagram', href: '' },
  ],
  builtWith: 'Built with an AI agent team and Claude Code',
}

// Footer "crew" — playful placeholder bots with hover quips.
export const crew = [
  { name: 'Pixel', quip: 'Wrote most of the code.', emoji: '🤖' },
  { name: 'Vector', quip: 'Kept the vision on track.', emoji: '🦾' },
  { name: 'Critic', quip: 'Rejected the first three drafts.', emoji: '🧐' },
  { name: 'Mapper', quip: 'Charted the patterns early.', emoji: '🗺️' },
  { name: 'Scribe', quip: 'Polished every sentence.', emoji: '✍️' },
]
