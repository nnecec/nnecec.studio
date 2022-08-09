import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { OpenNewWindow } from 'iconoir-react'
import { useLoaderData } from '@remix-run/react'

import { Layout, Tag } from '~/components'
import { getPost } from '~/services/post.server'
import { SITE_CONFIG } from '~/utils/constants'
import { markdownToHtml } from '~/services/markdown.server'
import type { Post } from '~/types/post'

type LoaderData = {
  post: Post
}

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: 'Missing post'
    }
  }

  const { post } = data as LoaderData
  return {
    title: post.title,
    description: post.description
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const post = getPost(params['*'])
  const { content = '' } = post

  const html = await markdownToHtml(content || '')

  return json<LoaderData>({
    post: {
      ...post,
      content: html
    }
  })
}

const PostPage = () => {
  const { post } = useLoaderData<LoaderData>()

  return (
    <Layout>
      <article className="blog-post heti mx-auto" itemScope>
        <header className="mb-12">
          <h1>{post.title}</h1>
          <div className="flex flex-col gap-2 text-sm">
            <div>最后更新: {post.date}</div>
            <div>
              {post.tags?.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div>
              版权声明: 署名-非商业性使用-禁止演绎 3.0 国际（
              <a
                href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                CC BY-NC-ND 3.0
              </a>
              ）
              <a
                href={`${SITE_CONFIG.repositoryUrl}/issues`}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                反馈<OpenNewWindow className="inline"></OpenNewWindow>
              </a>
            </div>
          </div>
        </header>
        <div className="relative my-8">
          {/* {!!post.tableOfContents && (
                    <Toc
                      className="top-[20rem] right-[max(0px,calc(50%-46rem))] z-20 max-h-[600px] w-[19.5rem] overflow-y-auto py-6 px-4 text-sm xl:fixed"
                      toc={post.tableOfContents}
                    />
                  )} */}
          <article dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
      </article>
    </Layout>
  )
}

export default PostPage
