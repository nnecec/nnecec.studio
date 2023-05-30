'use client'
import { useOffsetMotion } from '~/curation/hooks/use-offset-motion'

export default function UseOffsetMotion() {
  const [ref] = useOffsetMotion({ x: 200, y: 300 })

  return (
    <div>
      <div ref={ref} className="h-10 w-10 rounded-full bg-red-400" />
    </div>
  )
}
