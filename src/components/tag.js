import * as React from 'react'

export const Tag = ({ children }) => {
  return (
    <span className="before:content-['#'] text-sm mr-2 text-gray-500">
      {children}
    </span>
  )
}
