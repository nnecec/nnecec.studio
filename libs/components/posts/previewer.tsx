import React from "react"

import type { Post } from "~/libs/types/post"
import { MarpPreviewer } from "~/libs/ui/marp-previewer"
import { MDXPreviewer } from "~/libs/ui/mdx-previewer"

import { MDXComponents } from "../mdx"

interface PreviewerProps {
  className?: string
  isMarp?: boolean
  post: Post
}

export const Previewer = ({ className, isMarp, post }: PreviewerProps) => {
  if (isMarp) {
    return (
      <div className={className}>
        <MarpPreviewer post={post} />
      </div>
    )
  }
  return (
    <div className={className}>
      <MDXPreviewer components={MDXComponents} source={post.content} />
    </div>
  )
}
