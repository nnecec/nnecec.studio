export type EditorialCapabilityGroup = { description: string; items: string[]; title: string }

export type EditorialNote = { body: string; label: string }

export const editorialHero = {
  description:
    'I build frontend systems that keep product interfaces clear, fast, and maintainable as teams and complexity grow.',
  label: 'About / Senior Frontend Engineer',
  pills: ['Frontend architecture', 'Performance', 'Design systems'],
  title: 'Senior frontend engineer for scalable product interfaces.',
} as const

export const editorialCapabilities: EditorialCapabilityGroup[] = [
  {
    description:
      'Design component boundaries, state flow, and reusable patterns that keep large interfaces understandable.',
    items: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Motion',
      'TanStack',
    ],
    title: 'Frontend architecture',
  },
  {
    description:
      'Strengthen build, test, lint, and workflow foundations so teams ship faster with fewer regressions.',
    items: [
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
    title: 'Tooling and delivery',
  },
  {
    description:
      'Turn product and design requirements into accessible UI without adding unnecessary complexity.',
    items: ['HTTP', 'Figma', 'Headless UI', 'Ant Design', 'Markdown'],
    title: 'Product execution',
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
    body: 'Prefer stable APIs, explicit boundaries, and state models that remain clear as features accumulate.',
    label: 'System design',
  },
  {
    body: 'Treat rendering cost, bundle size, and interaction latency as product constraints, not cleanup work.',
    label: 'Performance',
  },
  {
    body: 'Ship in small, readable increments so teams can move quickly without losing confidence.',
    label: 'Delivery discipline',
  },
]

export const editorialContact = {
  emailLabel: 'Email',
  links: ['GitHub', 'Twitter / X', 'Instagram', 'Bento'],
  note: 'Best used for roles or collaboration around frontend architecture, product UI, and platform work.',
  wechatLabel: 'WeChat',
} as const
