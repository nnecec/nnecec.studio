import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return hljs.highlightAuto(code, ['html', 'javascript', 'typescript']).value
  }
})

export async function markdownToHtml(markdown: string) {
  const result = marked(markdown)
  return result
}
