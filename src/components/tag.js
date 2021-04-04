import * as React from "react"
import { Link } from "gatsby"

export const Tag = ({ tag, totalCount }) => {

  return (
    <span>
      #{tag} {totalCount}
    </span>
  )
}

export const Tags = ({ tags }) => {
  return (
    <div>
      {tags.map(({ tag, totalCount }) => <Tag tag={tag} totalCount={totalCount}></Tag>)}
    </div>
  )
}


