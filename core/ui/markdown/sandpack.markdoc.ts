import { Tag } from '@markdoc/markdoc'

import type { Schema } from '@markdoc/markdoc'

export const sandpack: Schema = {
  render: 'Sandpack',
  children: ['sandpackFile'],
  attributes: {
    template: {
      type: String,
      default: 'react',
      matches: ['vanilla', 'react', 'node', 'nextjs', 'vite-react', 'astro'],
      errorLevel: 'critical',
    },
    layout: {
      type: String,
      default: 'default',
      matches: ['default', 'console', 'preview'],
      errorLevel: 'critical',
    },
  },
  transform(node, config) {
    const files = {}

    node
      .transformChildren(config)
      // .filter(child => child && child.name === '"SandpackFile"')
      // eslint-disable-next-line unicorn/no-array-for-each
      .forEach(child => {
        if (child && typeof child === 'object') {
          const path = child.attributes.path
          files[path] = child.children.flatMap(p => p.children).join('\n')
        }
      })

    return new Tag(this.render, {
      ...node.attributes,
      files,
    })
  },
}

export const sandpackFile = {
  render: 'SandpackFile',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    path: {
      type: String,
    },
  },
}
