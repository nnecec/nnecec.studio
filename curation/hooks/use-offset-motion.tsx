import { useEffect, useRef } from 'react'

type Animate = {
  x: number
  y: number
}

type Options = {
  duration?: number
}

// https://github.com/streamich/ts-easing/blob/master/src/index.ts
const inOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

export const useOffsetMotion = <T extends HTMLElement>(animate: Animate, options?: Options) => {
  const ref = useRef<T>(null)

  const x = animate.x ?? 0
  const y = animate.y ?? 0
  const duration = options?.duration ?? 2500

  useEffect(() => {
    let startTime: number
    let rAFTimer: number

    function loop() {
      rAFTimer = requestAnimationFrame(onMotion)
    }

    function onMotion(time: DOMHighResTimeStamp) {
      const deltaTime = (time - startTime) / duration
      const progression = inOutCubic(deltaTime)
      const deltaX = x * progression
      const deltaY = y * progression

      if (ref.current) ref.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`

      if (time - startTime > duration) {
        cancelAnimationFrame(rAFTimer)
        return
      }
      loop()
    }

    const onStart = () => {
      startTime = performance.now()
      loop()
    }

    onStart()

    return () => {
      cancelAnimationFrame(rAFTimer)
    }
  }, [])

  return [ref]
}
