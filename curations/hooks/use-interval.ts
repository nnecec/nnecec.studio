import { useEffect, useRef } from 'react'

type anyFn = (...args: any[]) => any

export const useInterval = (callback: anyFn, delay?: null | number) => {
  const savedCallback = useRef<anyFn>(() => {})

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0)
      return () => clearInterval(interval)
    }
  }, [delay])
}
