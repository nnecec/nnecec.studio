import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
// import { remarkMermaid } from 'remark-mermaidjs'

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    // .use(remarkMermaid)
    .use(prism)
    .use(html, { sanitize: false })
    .process(markdown)

  return result.toString()
}
