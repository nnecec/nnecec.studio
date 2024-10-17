import React from 'react'

import type { Post } from '~/libs/types/post'

import { MarpPreviewer } from '~/libs/ui/marp-previewer'
import { MDXPreviewer } from '~/libs/ui/mdx-previewer'

import { MDXComponents } from '../mdx'

interface PreviewerProps {
  isMarp?: boolean
  post: Post
}

export const Previewer = ({ isMarp, post }: PreviewerProps) => {
  if (isMarp) {
    return <MarpPreviewer post={post} />
  }
  return <MDXPreviewer components={MDXComponents} source={post.content} />
}
