import { Share } from '@icon-park/react'
import { Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { Marp } from '@marp-team/marp-core'

import { Layout, Tag } from 'components'
import { getAllPosts, getPost } from 'lib/api'
import { SITE_CONFIG } from 'lib/constants'
import { markdownToHtml } from 'lib/markdown'
import type { Post } from 'types/post'

type Props = {
  post: Post
  css: string
}
const marp = new Marp()

const PostPage = ({ post, css }: Props) => {
  const router = useRouter()

  return (
    <>
      <style>{css}</style>
      <Layout title={post.title} xs>
        {router.isFallback ? (
          <Loading />
        ) : (
          <>
            <article className="blog-post" itemScope>
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
                      反馈
                      <Share theme="filled" />
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
                <article
                  dangerouslySetInnerHTML={{ __html: post.content || '' }}
                  className="heti"
                />
              </div>
            </article>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }: Params) {
  const post = getPost(params.slug.join('/'))
  const { marp: isMarp, content = '' } = post

  let html = content
  let css = ''
  if (isMarp) {
    const { html: newHtml, css: newCss } = marp.render(content)
    html = newHtml
    css = newCss
  } else {
    html = await markdownToHtml(content || '')
  }

  return {
    props: {
      post: {
        ...post,
        content: html
      },
      css
    }
  }
}

type Params = {
  params: {
    slug: string[]
  }
}

export async function getStaticPaths() {
  const { posts } = getAllPosts(['title', 'slug'])

  return {
    fallback: false,
    paths: posts.map(post => {
      return {
        params: {
          slug: post?.slug?.split('/').slice(1)
        }
      }
    })
  }
}

export default PostPage
