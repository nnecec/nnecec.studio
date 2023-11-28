import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const Tag = (props: Props) => {
  return <span className="mr-2 text-sm before:content-['#']">{props.children}</span>
}
