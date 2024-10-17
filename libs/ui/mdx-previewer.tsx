import type { RehypeShikiOptions } from '@shikijs/rehype'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

import React, { Suspense } from 'react'

import { MDXRemote } from 'next-mdx-remote/rsc'

import rehypeShiki from '@shikijs/rehype'
import { transformerMetaHighlight, transformerNotationHighlight } from '@shikijs/transformers'

import { Skeleton } from '.'

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

export const MDXPreviewer = ({ components = {}, source, ...props }: MDXRemoteProps) => {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-12 w-[180px]" />
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton className="h-6 w-full" key={i} />
          ))}
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-12 w-[240px]" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton className="h-6 w-full" key={i} />
          ))}
          <Skeleton className="h-6 w-3/5" />
        </div>
      }
    >
      <MDXRemote
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypeShiki,
                {
                  defaultColor: false,
                  themes: {
                    dark: 'github-dark-default',
                    light: 'github-light-default',
                  },
                  transformers: [transformerMetaHighlight(), transformerNotationHighlight()],
                } as RehypeShikiOptions,
              ],
            ],
            remarkPlugins: [],
          },
        }}
        source={source}
        {...props}
      />
    </Suspense>
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
