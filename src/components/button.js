import * as React from 'react';
import cn from 'classnames';

export function Button({
  children,
  onClick,
  active = false,
  className,
  style,
}) {

  return (
    <button
      style={style}
      onMouseDown={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      }}
      onClick={onClick}
      className={cn(
        className,
        'text-base leading-tight font-bold border rounded-lg py-2 px-4 focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:border-link active:text-white active:ring-0 active:ring-offset-0 outline-none inline-flex items-center my-1',
        {
          'bg-link border-link hover:bg-link focus:bg-link active:bg-link': active,
          'bg-transparent bg-secondary-button dark:bg-secondary-button-dark hover:text-link focus:text-link border-transparent': !active,
        }
      )}>
      {children}
    </button>
  );
}