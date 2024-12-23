import { useEffect, useState } from 'react'

const isBrowser = typeof document !== 'undefined'

const getInitialState = <T = any>(query: string, defaultState?: T) => {
  // Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
  if (defaultState !== undefined) {
    return defaultState
  }

  if (isBrowser) {
    return globalThis.matchMedia(query).matches
  }

  // A default value has not been provided, and you are rendering on the server, warn of a possible hydration mismatch when defaulting to false.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      '`useMediaQuery` When server side rendering, defaultState should be defined to prevent a hydration mismatches.',
    )
  }

  return false
}

export const useMediaQuery = <T = any>(query: string, defaultState?: T) => {
  const [state, setState] = useState(getInitialState(query, defaultState))

  useEffect(() => {
    let mounted = true
    const mql = globalThis.matchMedia(query)
    const onChange = () => {
      if (!mounted) {
        return
      }
      setState(!!mql.matches)
    }

    mql.addEventListener('change', onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeEventListener('change', onChange)
    }
  }, [query])

  return state
}
