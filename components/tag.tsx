import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const Tag = (props: Props) => {
  return (
    <span className="mr-2 text-sm text-gray-500 before:content-['#']">
      {props.children}
    </span>
  )
}
