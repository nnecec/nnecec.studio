import { useEffect } from 'react'

import { useRafState } from './request-animation-state'

export interface State {
  x: number
  y: number
}

const isBrowser = typeof document !== 'undefined'

export const useWindowScroll = (): State => {
  const [state, setState] = useRafState<State>(() => ({
    x: isBrowser ? window.pageXOffset : 0,
    y: isBrowser ? window.pageYOffset : 0,
  }))

  useEffect(() => {
    const handler = () => {
      setState(state => {
        const { pageXOffset, pageYOffset } = window
        return state.x !== pageXOffset || state.y !== pageYOffset
          ? {
              x: pageXOffset,
              y: pageYOffset,
            }
          : state
      })
    }

    // We have to update window scroll at mount, before subscription.
    // Window scroll may be changed between render and effect handler.
    handler()

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])

  return state
}
