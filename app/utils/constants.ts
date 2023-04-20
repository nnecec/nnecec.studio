import type { Project } from '~/types/project'

export const SITE_CONFIG = {
  title: "nnecec's Blog",
  author: {
    name: 'nnecec',
  },
  description: 'think. try. treasure.',
  siteUrl: 'https://nnecec.vercel.app',
  repositoryUrl: 'https://github.com/nnecec/nnecec.github.io',
  email: 'nnecec@outlook.com',
  social: {
    bento: 'https://bento.me/nnecec/',
    instagram: 'https://www.instagram.com/nnecec/',
    twitter: 'https://twitter.com/nnecec_cn/',
    github: 'https://github.com/nnecec/',
    zhubai: 'https://nnecec.zhubai.love/',
  },
}

export const ProjectsList: Project[] = [
  {
    title: 'decox',
    description: 'Decorate your picture of art.',
    link: 'https://decox.vercel.app/',
  },
  {
    title: 'afo',
    description: 'Tools collection, mainly for React developing.',
    link: 'https://github.com/nnecec/afo/',
  },
  {
    title: 'config',
    description:
      'Front-end engineering config, includes ESLint, Prettier, TSConfig, Vite. Simple but useful.',
    link: 'https://github.com/nnecec/config/',
  },
  {
    title: 'blog',
    description: "export * as Blog from 'nnecec'",
    link: 'https://github.com/nnecec/nnecec.github.io/',
  },
]
