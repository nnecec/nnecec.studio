import { useCallback, useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

// React state hook that only updates state in the callback of requestAnimationFrame.
// https://github.com/streamich/react-use/blob/master/src/useRafState.ts
export const useRafState = <S>(initialState: (() => S) | S): [S, Dispatch<SetStateAction<S>>] => {
  const frame = useRef(0)
  const [state, setState] = useState(initialState)

  const setRafState = useCallback((value: ((prevState: S) => S) | S) => {
    cancelAnimationFrame(frame.current)

    frame.current = requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current)
    }
  }, [])

  return [state, setRafState]
}
