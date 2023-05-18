import { IconExternalLink } from '@tabler/icons-react'

import { getPost } from '~/core/api/post'
import { Tag } from '~/core/ui'
import { Previewer } from '~/core/ui/markdown'
import { SITE_CONFIG } from '~/core/utils/constants'

// export async function generateMetadata({ params }) {
//   if (!params) {
//     return [
//       {
//         title: 'Missing post',
//       },
//     ]
//   }

//   const { post } = params
//   return [
//     {
//       title: post.title!,
//     },
//     { name: 'description', content: post.description ?? 'secrect post' },
//   ]
// }

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const post = await getPost(params.slug.join('/'))

  return (
    <article className="blog-post heti mx-auto">
      <section className="mb-24">
        <h1>{post.title}</h1>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            最后更新: {post.date}{' '}
            <a
              href={`${SITE_CONFIG.repositoryUrl}/issues`}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              反馈
              <IconExternalLink className="inline" size={16} />
            </a>
          </div>
          <div>
            {post.tags?.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div>
            版权声明:
            <a
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              CC BY-NC 4.0
            </a>
          </div>
        </div>
      </section>
      <div className="relative my-8 font-serif">
        <Previewer content={post.content} />
      </div>
    </article>
  )
}
