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
        <ul className="fixed -right-full top-[96px] list-none">
          <li>
            <Link
              to={`/posts`}
              className={clsx('tab', !currentTag && 'link link-primary')}
            >
              # All
            </Link>
          </li>

          {tags.map(tag => (
            <li key={tag}>
              <Link
                to={`/posts?tag=${tag}`}
                className={clsx(
                  'tab',
                  currentTag === tag && 'link link-primary'
                )}
              >
                # {tag}
              </Link>
            </li>
          ))}
        </ul>

        <div>
          {posts.map(post => {
            return (
              <Link
                to={`/posts${post.slug}`}
                key={post.slug}
                className="no-underline "
              >
                <div className="mb-4 cursor-pointer">
                  <h2>{post.title}</h2>

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
      </div>
    </Layout>
  )
}

export default PostsPage
