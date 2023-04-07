import Markdoc, { RenderableTreeNode } from '@markdoc/markdoc'
import { Heading } from '~/types/post'

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

  return Markdoc.transform(ast, {
    nodes: {
      heading,
      fence,
    },
  })
}

export function collectHeadings(node: any, sections: Heading[] = []) {
  if (node) {
    if (node.name === 'Heading') {
      const title = node.children[0]

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title,
        })
      }
    }

    if (node.children) {
      for (const child of node.children) {
        collectHeadings(child, sections)
      }
    }
  }

  return sections
}
