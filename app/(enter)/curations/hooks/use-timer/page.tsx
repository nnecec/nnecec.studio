'use client'
import { useState } from 'react'

import { Button, Chip } from '@nextui-org/react'

import { useTimer } from '~/curation/hooks/use-timer'

export default function UseTimer() {
  const [str, setStr] = useState('pending.')
  const { isRunning, pause, restart, start } = useTimer(() => {
    setStr('finished!')
  }, 3000)

  return (
    <div>
      <div>Click start button, it&apos;ll be finished after 3 seconds: <Chip>{str}</Chip></div>
      <div>is running: <Chip>{`${isRunning}`}</Chip></div>
      <div className="flex gap-2">
        <Button

          onClick={() => {
            setStr('pending.')
            start()
          }}
        >
          start timer
        </Button>
        <Button onClick={pause}>
          pause timer
        </Button>
        <Button

          onClick={() => {
            setStr('pending.')
            restart()
          }}
        >
          restart timer
        </Button>
      </div>
    </div>
  )
}
