import type { Schema } from '@markdoc/markdoc'

import { Tag } from '@markdoc/markdoc'

export const heading: Schema = {
  attributes: {
    className: { type: String },
    id: { type: String },
    level: { default: 1, required: true, type: Number },
  },
  children: ['inline'],
  render: 'Heading',
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    if (attributes.id && typeof attributes.id === 'string') {
      return attributes.id
    }
    const id = children
      .filter(child => typeof child === 'string')
      .join(' ')
      .replaceAll('?', '')
      .replaceAll(/\s+/g, '-')
      .toLowerCase()

    return new Tag(this.render, { ...attributes, id }, children)
  },
}
