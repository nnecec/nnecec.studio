import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { IconExternalLink } from '@tabler/icons-react'

import { Layout } from '~/components/layout'
import { collectHeadings, markdownToHtml } from '~/services/markdown.server'
import { getPost } from '~/services/post.server'
import type { Post } from '~/types/post'
import { Tag } from '~/ui'
import { Previewer, TableOfContents } from '~/ui/markdown'
import { SITE_CONFIG } from '~/utils/constants'

import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = ({ data }) => {
  if (!data) {
    return [
      {
        title: 'Missing post',
      },
    ]
  }

  const { post } = data
  return [
    {
      title: post.title!,
    },
    { name: 'description', content: post.description ?? 'secrect post' },
  ]
}

export const loader = async ({ params }: LoaderArgs) => {
  const post = getPost(params['*'] as string)

  const content = await markdownToHtml(post.content)
  const headings = collectHeadings(content)

  return json<{ post: Post }>({
    post: {
      ...post,
      content,
      headings,
    },
  })
}

const PostPage = () => {
  const { post } = useLoaderData<typeof loader>()

  return (
    <Layout>
      <article className="blog-post heti mx-auto">
        <section className="mb-24">
          <h1>{post.title}</h1>
          <div className="flex flex-col gap-2 text-sm">
            <div>
              最后更新: {post.date}{' '}
              <a
                href={`${SITE_CONFIG.repositoryUrl}/issues`}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                反馈
                <IconExternalLink className="inline" size={16} />
              </a>
            </div>
            <div>
              {post.tags?.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div>
              版权声明:
              <a
                href="http://creativecommons.org/licenses/by-nc/4.0/"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                CC BY-NC 4.0
              </a>
            </div>
          </div>
        </section>
        <div className="relative my-8 font-serif">
          <TableOfContents headings={post.headings}></TableOfContents>
          <Previewer content={post.content} />
        </div>
      </article>
    </Layout>
  )
}

export default PostPage

export { CommonErrorBoundary as ErrorBoundary } from '~/components/error-boundary'
