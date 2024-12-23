import type { Project } from '~/libs/types/project'

export const SITE_CONFIG = {
  author: {
    name: 'nnecec',
  },
  description: '🍉 .',
  email: 'nnecec@outlook.com',
  repositoryUrl: 'https://github.com/nnecec/nnecec.studio',
  siteUrl: 'https://nnecec.vercel.app',
  social: {
    bento: 'https://bento.me/nnecec/',
    github: 'https://github.com/nnecec/',
    instagram: 'https://www.instagram.com/nnecec/',
    twitter: 'https://twitter.com/nnecec_cn/',
  },
  title: 'nnecec studio',
}

export const ProjectsList: Project[] = [
  {
    description: 'Decorate your picture of art.',
    link: 'https://decox.vercel.app/',
    title: 'decox',
  },
  {
    description: 'Tools collection, mainly for React developing.',
    link: 'https://github.com/nnecec/afo/',
    title: 'afo',
  },
  {
    description:
      'Front-end engineering config, includes ESLint, Prettier, TSConfig, Vite. Simple but useful.',
    link: 'https://github.com/nnecec/config/',
    title: 'config',
  },
  {
    description: "export * as Blog from 'nnecec'",
    link: 'https://github.com/nnecec/nnecec.studio/',
    title: 'blog',
  },
]

export const DATAPULSE_ID = process.env.DATAPULSE_ID
export const GOOGLE_ID = process.env.GOOGLE_ID
export const isProd = process.env.NODE_ENV === 'production'
