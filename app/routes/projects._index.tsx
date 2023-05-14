import { Link } from '@remix-run/react'

import { Layout } from '~/components/layout'
import { Poker } from '~/ui'
import { ProjectsList } from '~/utils/constants'

import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => [
  {
    title: "Projects' list",
  },
]

const PostsPage = () => {
  return (
    <Layout>
      <div className="relative mx-auto grid grid-cols-1 gap-4 py-4 md:h-[calc(100vh_-_96px)] md:grid-cols-2">
        {ProjectsList.map(project => (
          <Link key={project.title} to={project.link} target="_blank" className="block">
            <Poker
              className="h-[400px] border border-neutral-300 dark:border-neutral-700 md:h-full"
              title={project.title}
              description={project.description}
            />
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default PostsPage
