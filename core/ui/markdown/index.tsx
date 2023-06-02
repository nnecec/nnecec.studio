'use client'

import React from 'react'

import type { Post } from '~/core/types/post'

import { CommonPreviewer } from './common-previewer'
import { MarpPreviewer } from './marp-previewer'

interface PreviewerProps {
  post: Post
  isMarp?: boolean
}

export const Previewer = ({ post, isMarp }: PreviewerProps) => {
  if (isMarp) {
    return <MarpPreviewer post={post} />
  }
  return <CommonPreviewer content={post.content} />
}
