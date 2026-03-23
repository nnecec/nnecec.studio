export type EditorialCapabilityGroup = {
  description: string
  items: string[]
  title: string
}

export type EditorialNote = {
  body: string
  label: string
}

export const editorialHero = {
  description:
    'I design and build frontend systems that stay clear under product pressure, then write to make the tradeoffs visible.',
  label: 'About / Editorial Field Grid',
  pills: ['Frontend systems', 'Performance and architecture', 'Tooling and writing'],
  title: 'System architecture, interface clarity, and practical frontend judgment.',
} as const

export const editorialBands = {
  coreFrontend: [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'HTTP',
    'React',
    'Next.js',
    'Tailwind CSS',
    'Motion',
    'TanStack',
  ],
  systemsAndTooling: [
    'Node.js',
    'Webpack',
    'Vite',
    'Rollup',
    'Jest',
    'Vitest',
    'ESLint',
    'Prettier',
    'Git',
    'Docker',
  ],
} as const

export const editorialCapabilities: EditorialCapabilityGroup[] = [
  {
    description:
      'Component architecture, rendering behavior, and interface systems built for long-term readability.',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Motion', 'TanStack'],
    title: 'Frontend systems',
  },
  {
    description:
      'Build pipelines and engineering workflow designed to keep teams shipping with fewer regressions.',
    items: ['Node.js', 'Webpack', 'Vite', 'Rollup', 'Jest', 'Vitest', 'ESLint', 'Prettier', 'Git', 'Docker'],
    title: 'Systems and tooling',
  },
  {
    description:
      'Product-aware implementation work that bridges design constraints, interaction quality, and delivery.',
    items: ['HTTP', 'Figma', 'Headless UI', 'Ant Design', 'Markdown'],
    title: 'Product and interface',
  },
]

export const editorialExtendedPractice = [
  'Supabase',
  'Prisma',
  'DrizzleORM',
  'AI SDK',
  'LangChain',
  'Dify',
  'OpenSpec',
  'Tauri',
] as const

export const editorialNotes: EditorialNote[] = [
  {
    body: 'Prefer explicit boundaries and dependable patterns over short-term novelty.',
    label: 'Engineering judgment',
  },
  {
    body: 'Balance visual quality with runtime discipline, accessibility, and maintainability.',
    label: 'Product posture',
  },
  {
    body: 'Use writing, tooling, and clear architecture to keep frontend complexity understandable.',
    label: 'Working style',
  },
]

export const editorialContact = {
  emailLabel: 'Email',
  links: ['GitHub', 'Twitter / X', 'Instagram', 'Bento'],
  note: 'Contact appears later in the page flow after capability context.',
  wechatLabel: 'WeChat QR',
} as const
