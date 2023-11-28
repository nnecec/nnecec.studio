import { useRef } from 'react'

type Pos = {
  x: number
  y: number
}

// https://github.com/streamich/ts-easing/blob/master/src/index.ts
const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

function animate(callback: (progression: number) => void, duration = 3000, f = inOutCubic) {
  const start = performance.now()
  const loop = (time: number) => {
    // progression 从 0 增加到 1
    let progression = (time - start) / duration
    if (progression > 1) progression = 1
    // 计算当前动画状态
    const progress = f(progression)
    callback(progress) // 绘制
    if (progression < 1) {
      requestAnimationFrame(loop)
    }
  }
  requestAnimationFrame(loop)
}

export const useOffsetMotion = <T extends HTMLElement>(pos: Pos, duration?: number) => {
  const ref = useRef<T>(null)

  const x = pos.x ?? 0
  const y = pos.y ?? 0

  const start = (f?: (t: number) => number) => {
    animate(
      progression => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${x * progression}px, ${y * progression}px, 0)`
        }
      },
      duration,
      f,
    )
  }

  return [ref, start] as const
}
