import Markdoc from '@markdoc/markdoc'

/**
 * Parse markdown to HTML string with {@link https://github.com/markdoc/markdoc}
 *
 * @param markdown  - markdown string
 * @returns @string content
 */
export async function markdownToHtml(markdown: string) {
  const ast = Markdoc.parse(markdown)
  const fence = {
    render: 'Fence',
    attributes: {
      language: {
        type: String
      }
    }
  }

  const content = Markdoc.transform(ast, {
    nodes: {
      fence
    }
  })
  return content
}
