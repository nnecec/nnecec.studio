import { remark } from 'remark'
import html from 'remark-html'
import toc from 'remark-toc'
import prism from 'remark-prism'
import { remarkMermaid } from 'remark-mermaidjs'

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(toc)
    .use(prism)
    .use(remarkMermaid)
    .process(markdown)
  return result.toString()
}
