import clsx from 'clsx'
import { createElement } from 'react'

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
    [<div id={id} key={id} />, children],
  )

  return level !== 1 ? <a href={`#${id}`}>{link}</a> : link
}
