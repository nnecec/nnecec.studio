'use client'
import { useState } from 'react'

import { useTimer } from '~/curation/hooks/use-timer'

export default function UseTimer() {
  const [str, setStr] = useState('pending.')
  const { isRunning, pause, restart, start } = useTimer(() => {
    setStr('finished!')
  }, 3000)

  return (
    <div>
      <div>Click start button, it&apos;ll be finished after 3 seconds: <span className="badge">{str}</span></div>
      <div>is running: <span className="badge">{`${isRunning}`}</span></div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setStr('pending.')
            start()
          }}
          className="btn"
        >
          start timer
        </button>
        <button className="btn" onClick={pause}>
          pause timer
        </button>
        <button
          onClick={() => {
            setStr('pending.')
            restart()
          }}
          className="btn"
        >
          restart timer
        </button>
      </div>
    </div>
  )
}
