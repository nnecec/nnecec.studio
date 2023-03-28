import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { IconExternalLink } from '@tabler/icons-react'

import { markdownToHtml } from '~/services/markdown.server'
import { getPost } from '~/services/post.server'
import type { Post } from '~/types/post'
import { Tag } from '~/ui'
import { Layout } from '~/components/layout'
import { Previewer } from '~/ui/markdown'
import { SITE_CONFIG } from '~/utils/constants'

type LoaderData = {
  post: Post
}

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: 'Missing post',
    }
  }

  const { post } = data as LoaderData
  return {
    title: post.title,
    description: post.description,
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const post = getPost(params['*'] as string)

  const { content = '' } = post

  const html = await markdownToHtml(content || '')

  return json<LoaderData>({
    post: {
      ...post,
      content: html,
    },
  })
}

const PostPage = () => {
  const { post } = useLoaderData<LoaderData>()

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
          <Previewer content={post.content} />
        </div>
      </article>
    </Layout>
  )
}

export default PostPage
