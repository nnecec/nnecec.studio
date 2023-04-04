import Markdoc from '@markdoc/markdoc'

import { fence } from '~/ui/markdown/fence.markdoc'
import { heading } from '~/ui/markdown/heading.markdoc'

/**
 * Parse markdown to HTML string with {@link https://github.com/markdoc/markdoc}
 *
 * @param markdown  - markdown string
 * @returns @string content
 */
export async function markdownToHtml(markdown: string) {
  const ast = Markdoc.parse(markdown)

  const content = Markdoc.transform(ast, {
    nodes: {
      heading,
      fence,
    },
  })

  return content
}
