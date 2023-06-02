import Marp from '@marp-team/marp-core'
import { Element } from '@marp-team/marpit'

import type { Post } from '~/core/types/post'

const marp = new Marp({
  printable: false,
  container: new Element('div', { class: 'marpit flex flex-col gap-4' }),
})
export function MarpPreviewer({ post }: { post: Post }) {
  const { html, css } = marp.render(post.originContent)

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </div>
  )
}
