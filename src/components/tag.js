import * as React from 'react'

export const Tag = ({ children }) => {
  return (
    <span className="mr-2 text-sm text-gray-500 before:content-['#']">
      {children}
    </span>
  )
}
