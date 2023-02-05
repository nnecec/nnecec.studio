import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'

import { Layout, Tag } from '~/ui'
import { getAllPosts } from '~/services/post.server'
import type { Post } from '~/types/post'

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
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="prose relative mx-auto py-4">
        <select
          className="select-primary select w-full max-w-xs"
          value={currentTag}
          onChange={e => {
            const value = e.target.value
            value === 'all'
              ? navigate(`/posts`, { replace: true })
              : navigate(`/posts?tag=${e.target.value}`, { replace: true })
          }}
        >
          <option value="all"># All</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>
              # {tag}
            </option>
          ))}
        </select>

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
