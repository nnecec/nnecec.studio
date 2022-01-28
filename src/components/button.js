import * as React from 'react'
import cn from 'classnames'

export function Button({
  children,
  onClick,
  active = false,
  className,
  style
}) {
  return (
    <button
      style={style}
      onMouseDown={evt => {
        evt.preventDefault()
        evt.stopPropagation()
      }}
      onClick={onClick}
      className={cn(
        className,
        'w-fulls inline-flex justify-center rounded-md border border-current bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2'
      )}
    >
      {children}
    </button>
  )
}
