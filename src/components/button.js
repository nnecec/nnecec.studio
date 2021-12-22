import * as React from 'react'
import cn from 'classnames'

export function Button ({
  children,
  onClick,
  active = false,
  className,
  style
}) {
  return (
    <button
      style={style}
      onMouseDown={(evt) => {
        evt.preventDefault()
        evt.stopPropagation()
      }}
      onClick={onClick}
      className={cn(
        className,
        'inline-flex justify-center w-full rounded-md border border-current px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current'
      )}>
      {children}
    </button>
  )
}
