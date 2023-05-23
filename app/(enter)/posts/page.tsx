import Link from 'next/link'

import { getAllPosts } from '~/core/api/post'
import { TagPicker } from '~/core/components/posts/tag-picker'
import { Tag } from '~/core/ui'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts list.',
}

export default async function PostsPage({ searchParams }: { searchParams: { tag?: string } }) {
  const { posts, tags } = await getAllPosts(searchParams.tag)

  return (
    <div className="prose relative mx-auto py-4">
      <TagPicker tags={tags} />

      <div>
        {posts.map(post => {
          return (
            <div className="mb-4" key={post.slug}>
              <Link href={`/posts${post.slug}`} className="no-underline">
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
  )
}