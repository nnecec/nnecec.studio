'use client'
import { CodeBlock } from '~/core/ui/code-block'
import { useOffsetMotion } from '~/curation/hooks/use-offset-motion'

const codeString = `
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

      if (ref.current) ref.current.style.transform = \`translate3d(\${deltaX}px, \${deltaY}px, 0)\`

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
`

export default function UseOffsetMotion() {
  const [ref] = useOffsetMotion<HTMLDivElement>({ x: 800, y: 100 })

  return (
    <div>
      <div className="h-10 w-10 rounded-full bg-red-400" ref={ref} />

      <div className="mb-[200px]" />
      <CodeBlock language="ts">{codeString}</CodeBlock>
    </div>
  )
}
