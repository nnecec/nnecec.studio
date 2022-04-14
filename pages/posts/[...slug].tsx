import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Tag } from 'components'
import { getPost, getAllPosts } from 'lib/api'
import Head from 'next/head'
import { markdownToHtml } from 'lib/markdown'
import { SITE_CONFIG } from 'lib/constants'
import PostType from 'types/post'
import { Share } from '@icon-park/react'
import { Container, Loading } from '@nextui-org/react'

type Props = {
  post: PostType
}

const Post = ({ post }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Container xs>
      {router.isFallback ? (
        <Loading />
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title}</title>
            </Head>
            <article
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header className="mb-12">
                <h1>{post.title}</h1>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    最后更新: {post.date}
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
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  itemProp="articleBody"
                  // className="heti"
                />
              </div>
            </article>
            <nav>
              {/* <ul
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      listStyle: 'none',
                      padding: 0,
                      fontSize: 14
                    }}
                  >
                    <li>
                      {previous && (
                        <Link
                          className="before:content-['_↽']"
                          to={previous.fields.slug}
                          rel="prev"
                        >
                          {previous.frontmatter.title}
                        </Link>
                      )}
                    </li>
                    <li>
                      {next && (
                        <Link
                          className="after:content-['_⇁']"
                          to={next.fields.slug}
                          rel="next"
                        >
                          {next.frontmatter.title}
                        </Link>
                      )}
                    </li>
                  </ul> */}
            </nav>
          </article>
        </>
      )}
    </Container>
  )
}

export default Post

type Params = {
  params: {
    slug: string[]
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPost(params.slug.join('/'), [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage'
  ])
  const content = await markdownToHtml(post.content || '')
  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post?.slug?.split('/').slice(1)
        }
      }
    }),
    fallback: false
  }
}
