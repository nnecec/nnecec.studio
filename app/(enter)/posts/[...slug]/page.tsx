import { IconCopyright, IconExternalLink } from '@tabler/icons-react'
import clsx from 'clsx'

import { getPost } from '~/core/api/post'
import { Tag } from '~/core/ui'
import { Previewer } from '~/core/ui/markdown'
import { SITE_CONFIG } from '~/core/utils/constants'

import type { Metadata } from 'next'

type Props = {
  params: { slug: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params) {
    return {
      title: 'Missing post',
    }
  }

  const post = await getPost(params.slug.join('/'))
  return {
    title: post.title,
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug.join('/'))

  const isMarp = post.marp

  return (
    <article className="blog-post">
      <section className="heti mx-auto mb-24">
        <h1>{post.title}</h1>
        <div className="flex flex-col gap-2 text-sm">
          <div>Last updated: {post.date} </div>
          <div>
            {post.tags?.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              referrerPolicy="no-referrer"
              rel="noreferrer"
              target="_blank"
            >
              <IconCopyright className="inline" size={14} /> CC BY-NC 4.0
            </a>
            <a
              href={`${SITE_CONFIG.repositoryUrl}/issues`}
              referrerPolicy="no-referrer"
              rel="noreferrer"
              target="_blank"
            >
              <IconExternalLink className="inline" size={14} /> feedback
            </a>
          </div>
        </div>
      </section>
      <section className={clsx(!isMarp && 'heti mx-auto', 'relative my-8 font-serif')}>
        <Previewer isMarp={isMarp} post={post} />
      </section>
    </article>
  )
}
