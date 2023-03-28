import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import { Layout } from '~/components/layout'
import { Poker } from '~/ui'
import { ProjectsList, UI } from '~/utils/constants'

export const meta: MetaFunction = () => {
  return {
    title: "Projects' list",
  }
}

const PostsPage = () => {
  return (
    <Layout>
      <div
        className="relative mx-auto py-4 grid grid-cols-2 gap-4"
        style={{ height: `calc(100vh - ${UI.headerHeight}px)` }}
      >
        {ProjectsList.map(project => (
          <Link key={project.title} to={project.link} target="_blank" className="block">
            <Poker
              className="border border-neutral-300 dark:border-neutral-700"
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
