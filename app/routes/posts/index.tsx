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
      <div className="prose mx-auto grid grid-cols-3 items-start gap-4">
        <div className="col-span-2">
          {posts.map(post => {
            return (
              <Link
                to={`/posts${post.slug}`}
                key={post.slug}
                className="no-underline"
              >
                <div className="mb-4 cursor-pointer">
                  <h3>{post.title}</h3>

                  <div className="text-sm">{post.date}</div>
                  <div>
                    {post.tags?.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <ul className="sticky top-[96px] col-span-1">
          <li>
            <Link
              to={`/posts`}
              className={clsx(!currentTag && 'link link-secondary')}
            >
              # All
            </Link>
          </li>
          {tags.map(tag => (
            <li key={tag} className="list-none">
              <Link
                to={`/posts?tag=${tag}`}
                className={clsx(currentTag === tag && 'link link-secondary')}
              >
                # {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default PostsPage
