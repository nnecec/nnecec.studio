import type { Metadata } from 'next'

import Link from 'next/link'

import { getAllPosts } from '~/core/api/post'
import { TagPicker } from '~/core/components/posts/tag-picker'
import { Tag } from '~/core/ui'

export const metadata: Metadata = {
  title: 'All posts',
}

export default async function PostsPage({ searchParams }: { searchParams: { tag?: string } }) {
  const { posts, tags } = await getAllPosts(searchParams.tag)

  return (
    <div className="prose relative mx-auto py-4 dark:prose-invert">
      <TagPicker tags={tags} />

      <div>
        {posts.map(post => {
          return (
            <div className="mb-4" key={post.slug}>
              <Link className="no-underline" href={`/posts${post.slug}`}>
                <h2 className="inline-block transition-colors hover:text-primary">{post.title}</h2>
              </Link>

              <div className="text-sm">{post.date}</div>
              <div>{post.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
