import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return hljs.highlightAuto(code, ['html', 'javascript', 'typescript']).value
  }
})

const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  return `<a id="${text}" href="#${text}"><h${level} class="hover:after:content-['#'] after:text-primary">${text}</h${level}></a>\n`
}
marked.setOptions({ renderer })

export async function markdownToHtml(markdown: string) {
  const result = marked(markdown)
  return result
}
