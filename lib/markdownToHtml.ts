import { remark } from 'remark'
import html from 'remark-html'
import toc from 'remark-toc'
// @ts-ignore
import prism from 'remark-prism'

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html, { sanitize: false }).use(toc).use(prism).process(markdown)
  return result.toString()
}
