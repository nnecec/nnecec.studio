import React from 'react'
import Markdoc, { RenderableTreeNode } from '@markdoc/markdoc'

import { Fence } from './fence'
import { Heading } from './heading'
import { Heading as HeadingType } from '~/types/post'

interface PreviewerProps {
  content: RenderableTreeNode
}

export const Previewer = ({ content }: PreviewerProps) => {
  return (
    <div>
      {Markdoc.renderers.react(content, React, {
        components: {
          Fence,
          Heading,
        },
      })}
    </div>
  )
}

export const TableOfContents = ({ headings }: { headings?: HeadingType[] }) => {
  if (!headings) {
    return null
  }
  const items = headings.filter(item => [2, 3, 4].includes(item.level))
  return (
    <nav className="hidden lg:block fixed left-0 top-1/3 bottom-1/3 text-sm">
      <ul>
        {items.map(item => (
          <li key={item.title} style={{ marginLeft: `${item.level - 2}rem` }}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
