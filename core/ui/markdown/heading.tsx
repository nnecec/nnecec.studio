import { createElement } from 'react'
import clsx from 'clsx'

type HeadingProps = {
  id: string
  level: number
  children: React.ReactNode
  className?: string
}

export const Heading = ({ id = '', level = 1, children, className }: HeadingProps) => {
  const link = createElement(
    `h${level}`,
    {
      className: clsx('heading', className),
    },
    [<div id={id} key={id} className="target:pt-header" />, children],
  )

  return level === 1 ? link : <a href={`#${id}`}>{link}</a>
}