import React from 'react'
import Markdoc from '@markdoc/markdoc'
import { Heading } from './heading'
import { Fence } from './fence'

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
