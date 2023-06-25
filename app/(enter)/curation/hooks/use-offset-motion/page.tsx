'use client'
import { useOffsetMotion } from '~/curation/hooks/use-offset-motion'

const elastic = (t: number) =>
  t * (33 * t * t * t * t - 106 * t * t * t + 126 * t * t - 67 * t + 15)

const inOutCirc = (t: number) => {
  t /= 0.5
  if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2
  t -= 2
  return (Math.sqrt(1 - t * t) + 1) / 2
}

const inOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

export default function UseOffsetMotion() {
  const [ref, start] = useOffsetMotion<HTMLDivElement>({ x: 200, y: 300 })

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={() => start()}>start</button>
        <button onClick={() => start(elastic)}>elastic</button>
        <button onClick={() => start(inOutCirc)}>inOutCirc</button>
        <button onClick={() => start(inOutCubic)}>inOutCubic</button>
      </div>
      <div className="h-10 w-10 rounded-full bg-red-400" ref={ref} />
    </div>
  )
}
