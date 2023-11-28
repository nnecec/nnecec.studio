import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

const isBrowser = typeof document !== 'undefined'

const noop = () => {}

type parserOptions<T> =
  | {
      deserializer: (value: string) => T
      raw: false
      serializer: (value: T) => string
    }
  | {
      raw: true
    }

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (!isBrowser) {
    return [initialValue as T, noop, noop]
  }
  if (!key) {
    throw new Error('useLocalStorage key may not be falsy')
  }

  const deserializer = options ? (options.raw ? (value: any) => value : options.deserializer) : JSON.parse

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializer = useRef((key: string) => {
    try {
      const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify

      const localStorageValue = localStorage.getItem(key)
      if (localStorageValue === null) {
        initialValue && localStorage.setItem(key, serializer(initialValue))
        return initialValue
      } else {
        return deserializer(localStorageValue)
      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue
    }
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T | undefined>(() => initializer.current(key))

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => setState(initializer.current(key)), [key])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    valOrFunc => {
      try {
        const newState = typeof valOrFunc === 'function' ? (valOrFunc as (...args: any[]) => any)(state) : valOrFunc
        if (newState === undefined) return
        let value: string

        if (options) {
          if (options.raw) {
            value = typeof newState === 'string' ? newState : JSON.stringify(newState)
          } else if (options.serializer) value = options.serializer(newState)
          else value = JSON.stringify(newState)
        } else value = JSON.stringify(newState)

        localStorage.setItem(key, value)
        setState(deserializer(value))
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
      }
    },
    [key, setState],
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key)
      // eslint-disable-next-line unicorn/no-useless-undefined
      setState(undefined)
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState])

  return [state, set, remove]
}
