'use client'
import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { Button, Input } from '@nextui-org/react'

import { useInterval } from '~/curation/hooks/use-interval'

export default function UseInterval() {
  const [counter, setCounter] = useState(5)
  const [count, setCount] = useState<number>(counter)
  const [running, setRunning] = useState(false)

  useInterval(
    () => {
      if (count > 0) {
        setCount(count - 1)
      } else {
        setRunning(false)
      }
    },
    running ? 1000 : 0,
  )

  return (
    <div className="flex gap-4">
      <Input min={0} onValueChange={value => setCounter(Number(value))} type="number" value={String(counter)} />
      <Button
        className="relative min-w-[100px] overflow-hidden"
        onClick={() => {
          setCount(counter)
          setRunning(!running)
        }}
      >
        {running ? (
          <AnimatePresence initial={false}>
            {[...String(count)].map((num, i) => (
              <motion.span
                animate={{ y: 0 }}
                className="absolute"
                exit={{ y: -30 }}
                initial={{ y: 30 }}
                key={num}
                style={{ x: 8 * i }}
              >
                {num}
              </motion.span>
            ))}
          </AnimatePresence>
        ) : (
          'Click to start!'
        )}
      </Button>
    </div>
  )
}
