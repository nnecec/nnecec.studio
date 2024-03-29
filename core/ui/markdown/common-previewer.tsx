'use client'
import React from 'react'

import Markdoc from '@markdoc/markdoc'

import { Fence } from './fence'
import { fence } from './fence.markdoc'
import { Heading } from './heading'
import { heading } from './heading.markdoc'
import { Sandpack, SandpackFile } from './sandpack'
import { sandpack, sandpackFile } from './sandpack.markdoc'

export const TableOfContents = ({ headings }: { headings?: any[] }) => {
  if (!headings) {
    return null
  }
  const items = headings.filter(item => [2, 3, 4].includes(item.level))
  return (
    <nav className="fixed inset-y-1/3 left-0 hidden overflow-auto text-sm lg:block">
      <ul className="max-w-xs !list-none">
        {items.map(item => (
          <li key={item.title} style={{ marginLeft: `${item.level - 2}rem` }}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export const CommonPreviewer = ({ content }: { content: string }) => {
  const ast = Markdoc.parse(content)

  const html = Markdoc.transform(ast, {
    nodes: {
      fence,
      heading,
    },
    tags: {
      sandpack,
      sandpackFile,
    },
  })
  return (
    <div>
      <TableOfContents headings={collectHeadings(html)} />

      <div>
        {Markdoc.renderers.react(html, React, {
          components: {
            Fence,
            Heading,
            Sandpack,
            SandpackFile,
          },
        })}
      </div>
    </div>
  )
}

export function collectHeadings(node: any, sections: any[] = []) {
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
