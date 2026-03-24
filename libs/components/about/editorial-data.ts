export type EditorialCapabilityGroup = { description: string; items: string[]; title: string }

export type EditorialNote = { body: string; label: string }

export const editorialHero = {
  description:
    'I build frontend systems for products that need more than polished screens: clear component architecture, predictable rendering, measurable performance, and delivery practices that hold up as teams and codebases grow.',
  label: 'About / Senior Frontend Engineer',
  pills: ['React and Next.js architecture', 'Performance and rendering', 'Design systems and DX'],
  title: 'Senior frontend engineer building fast, scalable, maintainable product interfaces.',
} as const

export const editorialCapabilities: EditorialCapabilityGroup[] = [
  {
    description:
      'Own component boundaries, state flow, rendering strategy, and reusable UI patterns so large product surfaces stay coherent under constant change.',
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
      'Improve build pipelines, testing, linting, and developer workflow so teams ship with more confidence and less friction.',
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
      'Translate product requirements and design intent into accessible, high-quality UI behavior without sacrificing performance or implementation clarity.',
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
    body: 'Prefer explicit boundaries, stable component APIs, and state models that stay understandable after the fifth feature request, not just the first release.',
    label: 'System design',
  },
  {
    body: 'Treat bundle size, rendering cost, and interaction latency as core product constraints. Fast feedback and responsive interfaces are part of the job.',
    label: 'Performance',
  },
  {
    body: 'Use incremental changes, readable diffs, and practical tooling to reduce regressions and keep teams shipping steadily.',
    label: 'Delivery discipline',
  },
]

export const editorialContact = {
  emailLabel: 'Email',
  links: ['GitHub', 'Twitter / X', 'Instagram', 'Bento'],
  note: 'Best used for roles or collaboration around frontend architecture, product UI, and platform work.',
  wechatLabel: 'WeChat',
} as const
