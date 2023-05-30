import { useEffect, useRef } from 'react'

type Animate = {
  x: number
  y: number
}

type Options = {
  duration?: number
}

// https://github.com/streamich/ts-easing/blob/master/src/index.ts
const inOutCubic = t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

export const useOffsetMotion = (animate: Animate, options: Options) => {
  const ref = useRef(null)

  const x = animate.x ?? 0
  const y = animate.y ?? 0
  const duration = options?.duration ?? 2500

  useEffect(() => {
    let startTime
    let lastTime
    let rAFTimer

    const onStart = () => {
      startTime = performance.now()
      loop()
    }
    const onMotion = (time: DOMHighResTimeStamp) => {
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
    const loop = () => {
      rAFTimer = requestAnimationFrame(onMotion)
    }

    onStart()

    return () => {
      cancelAnimationFrame(rAFTimer)
    }
  }, [])

  return [ref]
}
