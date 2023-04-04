import { Tag } from '@markdoc/markdoc'

import type { Schema } from '@markdoc/markdoc'

export const heading: Schema = {
  render: 'Heading',
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    if (attributes.id && typeof attributes.id === 'string') {
      return attributes.id
    }
    const id = children
      .filter(child => typeof child === 'string')
      .join(' ')
      .replace(/\?/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()

    return new Tag(this.render, { ...attributes, id }, children)
  },
}
