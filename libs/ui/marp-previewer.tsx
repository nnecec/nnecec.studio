import Marp from '@marp-team/marp-core'
import { Element } from '@marp-team/marpit'

import type { Post } from '~/libs/types/post'

const marp = new Marp({
  container: new Element('div', { class: 'marpit flex flex-col gap-4' }),
  printable: false,
})
export function MarpPreviewer({ post }: { post: Post }) {
  const { css, html } = marp.render(post.originContent)

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </div>
  )
}
