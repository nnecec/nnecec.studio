import React from 'react'
import Markdoc from '@markdoc/markdoc'

import { Fence } from './fence'
import { Heading } from './heading'

interface PreviewerProps {
  content: string
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
