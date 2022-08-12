import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { Layout, Tag } from '~/components'
import { getAllPosts } from '~/services/post.server'
import type { Post } from '~/types/post'
import clsx from 'clsx'

type LoaderData = {
  posts: Post[]
  tags: string[]
  tag?: string
}

export const meta: MetaFunction = () => {
  return {
    title: '文章列表'
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const tag = url.searchParams.get('tag') ?? undefined

  const { posts, tags } = getAllPosts(tag)
  return json<LoaderData>({ posts, tags, tag })
}

const PostsPage = () => {
  const { posts, tags, tag: currentTag } = useLoaderData<LoaderData>()

  return (
    <Layout>
      <div className="prose relative mx-auto">
        <ul className="fixed top-[132px] right-[max(0px,calc(50%-32rem))] list-none text-sm xl:fixed">
          <li>
            <Link
              to={`/posts`}
              className={clsx(!currentTag && 'link link-primary')}
            >
              # All
            </Link>
          </li>

          {tags.map(tag => (
            <li key={tag}>
              <Link
                to={`/posts?tag=${tag}`}
                className={clsx(currentTag === tag && 'link link-primary')}
              >
                # {tag}
              </Link>
            </li>
          ))}
        </ul>

        <div>
          {posts.map(post => {
            return (
              <div className="mb-4" key={post.slug}>
                <Link to={`/posts${post.slug}`} className="no-underline ">
                  <h2 className="inline-block bg-current from-pink-500 to-yellow-500 bg-clip-text hover:bg-gradient-to-r hover:text-transparent">
                    {post.title}
                  </h2>
                </Link>

                <div className="text-sm">{post.date}</div>
                <div>
                  {post.tags?.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default PostsPage
