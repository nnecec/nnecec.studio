import { Tag } from '@markdoc/markdoc'

import type { Schema } from '@markdoc/markdoc'

export const sandpack: Schema = {
  attributes: {
    layout: {
      default: 'default',
      errorLevel: 'critical',
      matches: ['default', 'console', 'preview'],
      type: String,
    },
    template: {
      default: 'react',
      errorLevel: 'critical',
      matches: ['vanilla', 'react', 'node', 'nextjs', 'vite-react', 'astro'],
      type: String,
    },
  },
  children: ['sandpackFile'],
  render: 'Sandpack',
  transform(node, config) {
    const files: Record<string, string> = {}

    node
      .transformChildren(config)
      // .filter(child => child && child.name === '"SandpackFile"')
      // eslint-disable-next-line unicorn/no-array-for-each
      .forEach((child: any) => {
        if (child && typeof child === 'object') {
          const path = child.attributes.path
          files[path] = child.children.flatMap((p: any) => p.children).join('\n')
        }
      })

    return new Tag(this.render, {
      ...node.attributes,
      files,
    })
  },
}

export const sandpackFile = {
  attributes: {
    path: {
      type: String,
    },
  },
  children: ['paragraph', 'tag', 'list'],
  render: 'SandpackFile',
}
