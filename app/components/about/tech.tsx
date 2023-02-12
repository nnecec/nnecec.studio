import React, { useMemo } from 'react'
import { wrap } from '@motionone/utils'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useSpring,
} from 'framer-motion'

const stacks = [
  {
    name: 'HTML',
    color: '#DC351A',
  },
  {
    name: 'CSS',
    color: '#1D31DC',
  },
  {
    name: 'JavaScript',
    color: '#fcdc00',
  },
  {
    name: 'React',
    color: '#61dafb',
  },
  {
    name: 'Svelte',
    color: 'hsl(15, 100%, 55%)',
  },
  {
    name: 'Node.js',
    color: '#43853d',
  },
  {
    name: 'Docker',
    color: '#1F5ADB',
  },
  {
    name: 'Markdown',
    color: '#ffd848',
  },
  {
    name: 'Git',
    color: '#ef391a',
  },
  {
    name: 'Flutter',
    color: '#3BC7FC',
  },
]

const libs = [
  {
    name: 'Next.js',
    color: '#0070f3',
  },
  {
    name: 'Remix',
    color: '#2E7BFE',
  },
  {
    name: 'Ant Design',
    color: '#1677ff',
  },
  {
    name: 'Material UI',
    color: '#0B66FE',
  },
  {
    name: 'Tailwind CSS',
    color: '#30AEF7',
  },
  {
    name: 'Three.js ',
    color: '#049EF4',
  },
]

interface ScrollTextProps {
  words: any[]
  velocity: number
}

function ScrollText({
  words,
  velocity,
}: React.PropsWithChildren<ScrollTextProps>) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false,
  })

  const x = useTransform(baseX, v => `${wrap(0, -50, v)}%`)

  useAnimationFrame((t, delta) => {
    let moveBy = -velocity * (delta / 10000)
    moveBy += moveBy * Math.abs(velocityFactor.get())

    baseX.set(baseX.get() + moveBy)
  })

  const banner = useMemo(
    () =>
      words.map(word => (
        <div
          className="text-8xl font-extrabold opacity-40 grayscale transition-all hover:opacity-60 hover:grayscale-0"
          key={word.name}
          style={{ color: word.color }}
        >
          {word.name}
        </div>
      )),
    [words],
  )

  return (
    <div>
      <div className="inline-block">
        <motion.div className="mb-4 flex cursor-default gap-12" style={{ x }}>
          {banner}
          {banner}
        </motion.div>
      </div>
    </div>
  )
}

export const Tech = () => {
  return (
    <div className="relative h-[200vh]">
      <div className="sticky top-0 h-screen">
        <div className="flex h-screen items-center">
          <div className="overflow-hidden">
            <div className="container mx-auto">
              <h2 className="mb-8 text-7xl">Technologies</h2>
              <h4 className="mb-16 text-3xl text-gray-300">
                Here are some of the technologies that I have used and have some
                understanding of:
              </h4>
            </div>

            <div className="relative flex items-center">
              <div className="overflow-hidden whitespace-nowrap italic">
                <ScrollText velocity={5} words={stacks}></ScrollText>
                <ScrollText velocity={4} words={libs}></ScrollText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
