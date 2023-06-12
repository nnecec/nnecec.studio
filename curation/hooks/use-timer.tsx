// 写一个 React Hooks，用来倒计时，传入时间，返回 start、pause、restart、isRunning
'use client'
import { useRef, useState } from 'react'

export const useTimer = (callback: () => void, millisecond = 0) => {
  const timer = useRef<any>()
  const [isRunning, setIsRunning] = useState(false)
  const startTime = useRef<number>(0)
  const countTime = useRef(millisecond)

  const start = () => {
    if (!isRunning) {
      setIsRunning(true)
      startTime.current = Date.now()
      timer.current = setTimeout(() => {
        callback()
        setIsRunning(false)
      }, countTime.current)
    }
  }

  const pause = () => {
    if (isRunning) {
      setIsRunning(false)
      clearTimeout(timer.current)
      countTime.current = millisecond - (Date.now() - startTime.current)
    }
  }

  const restart = () => {
    countTime.current = millisecond
    clearTimeout(timer.current)
    start()
  }

  return {
    isRunning,
    pause,
    restart,
    start,
  }
}
