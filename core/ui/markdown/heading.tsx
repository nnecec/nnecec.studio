import { createElement } from 'react'

import clsx from 'clsx'

type HeadingProps = {
  children: React.ReactNode
  className?: string
  id: string
  level: number
}

export const Heading = ({ children, className, id = '', level = 1 }: HeadingProps) => {
  const link = createElement(
    `h${level}`,
    {
      className: clsx('heading', className),
    },
    [<div className="target:pt-header" id={id} key={id} />, children],
  )

  return level === 1 ? link : <a href={`#${id}`}>{link}</a>
}
