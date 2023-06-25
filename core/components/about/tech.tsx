'use client'
import React, { useMemo } from 'react'
import { wrap } from '@motionone/utils'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

const stacks = [
  {
    color: '#DC351A',
    name: 'HTML',
  },
  {
    color: '#1D31DC',
    name: 'CSS',
  },
  {
    color: '#fcdc00',
    name: 'JavaScript',
  },
  {
    color: '#61dafb',
    name: 'React',
  },
  {
    color: 'hsl(15, 100%, 55%)',
    name: 'Svelte',
  },
  {
    color: '#43853d',
    name: 'Node.js',
  },
  {
    color: '#1F5ADB',
    name: 'Docker',
  },
  {
    color: '#ffd848',
    name: 'Markdown',
  },
  {
    color: '#ef391a',
    name: 'Git',
  },
  {
    color: '#3BC7FC',
    name: 'Flutter',
  },
]

const libs = [
  {
    color: '#0070f3',
    name: 'Next.js',
  },
  {
    color: '#2E7BFE',
    name: 'Remix',
  },
  {
    color: '#1677ff',
    name: 'Ant Design',
  },
  {
    color: '#0B66FE',
    name: 'Material UI',
  },
  {
    color: '#30AEF7',
    name: 'Tailwind CSS',
  },
  {
    color: '#049EF4',
    name: 'Three.js ',
  },
]

interface ScrollTextProps {
  velocity: number
  words: any[]
}

function ScrollText({ velocity, words }: React.PropsWithChildren<ScrollTextProps>) {
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
    let moveBy = -velocity * (delta / 10_000)
    moveBy += moveBy * Math.abs(velocityFactor.get())

    baseX.set(baseX.get() + moveBy)
  })

  const banner = useMemo(
    () =>
      words.map(word => (
        <div
          className="text-6xl font-extrabold opacity-40 grayscale transition-all hover:opacity-60 hover:grayscale-0 md:text-8xl"
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
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-5xl md:text-7xl">Technologies</h2>
              <h4 className="mb-16 text-2xl text-gray-300 md:text-3xl">
                Here are some of the technologies that I have used and have some understanding of:
              </h4>
            </div>

            <div className="relative flex items-center">
              <div className="overflow-hidden whitespace-nowrap italic">
                <ScrollText velocity={5} words={stacks} />
                <ScrollText velocity={4} words={libs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
