import type { Metadata } from 'next'

import { Link } from 'next-view-transitions'

import { ChevronRightIcon } from '@radix-ui/react-icons'

import { getAllPosts } from '~/libs/api/post'
import { TagPicker } from '~/libs/components/posts/tag-picker'
import { Badge, Button } from '~/libs/ui'

export const metadata: Metadata = {
  title: 'All posts',
}

export default async function PostsPage(props: { searchParams: Promise<{ tag?: string }> }) {
  const searchParams = await props.searchParams
  const { posts, tags } = await getAllPosts(searchParams.tag)

  return (
    <div className="prose relative mx-auto py-4 dark:prose-invert">
      <TagPicker tags={tags} />

      <div className="py-4">
        {posts.map(post => {
          return (
            <Link className="no-underline" href={`/posts${post.slug}`} key={post.slug}>
              <div className="group relative mb-4 break-inside-avoid-column space-y-2 rounded-xl border bg-background p-4 hover:bg-foreground/5">
                <h3 className="m-0 group-hover:text-primary">{post.title}</h3>
                <div className="text-secondary-foreground opacity-80">{post.description}</div>
                <div className="text-sm font-bold text-secondary-foreground opacity-80">
                  {post.date}
                </div>
                <div className="space-x-2 opacity-80">
                  {post.tags?.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="invisible absolute right-3 top-2 -translate-x-3 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 md:visible"
                  size="icon"
                  variant="ghost"
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
