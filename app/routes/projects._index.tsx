import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'

import type { Project } from '~/types/project'
import { Layout, Tag } from '~/ui'

const ProjectsList: Project[] = [
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
]

export const meta: MetaFunction = () => {
  return {
    title: "Projects' list",
  }
}

const PostsPage = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="relative mx-auto py-4">
        {ProjectsList.map(project => (
          <div key={project.title}>{project.title}</div>
        ))}
      </div>
    </Layout>
  )
}

export default PostsPage
