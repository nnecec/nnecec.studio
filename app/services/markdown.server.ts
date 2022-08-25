import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }

    return '' // use external default escaping
  }
}).use(anchor, {
  level: [1, 2, 3, 4],
  permalink: true,
  permalinkSymbol: '#',
  permalinkClass: 'text-primary'
})

export async function markdownToHtml(markdown: string) {
  const result = md.render(markdown)
  return result
}
