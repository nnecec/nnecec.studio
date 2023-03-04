import React, { useEffect, useState } from 'react'
import type { TablerIconsProps } from '@tabler/icons-react'
import {
  IconBeach,
  IconCamera,
  IconChefHat,
  IconCode,
  IconMusic,
} from '@tabler/icons-react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import colors from 'tailwindcss/colors'

const delta = 12

interface PokerProps {
  style?: React.CSSProperties
  title: React.ReactNode
  description: React.ReactNode
  icon: React.JSXElementConstructor<TablerIconsProps>
}

const PokerVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

const Poker = ({
  title,
  description,
  icon,
  style,
}: React.PropsWithChildren<PokerProps>) => {
  const [hovering, setHovering] = useState(false)
  const Icon = icon

  const y = useMotionValue(0.5)
  const x = useMotionValue(0.5)
  const yp = useTransform(y, y => y * 100)
  const xp = useTransform(x, x => x * 100)
  const AccentColor = useMotionValue(colors.zinc[600])
  const backgroundImage = useMotionTemplate`radial-gradient(circle at ${xp}% ${yp}%, ${AccentColor}, #0000000f)`

  const rotateY = useTransform(x, [0, 1], [-delta, delta], {
    clamp: true,
  })
  const rotateX = useTransform(y, [0, 1], [delta, -delta], {
    clamp: true,
  })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const xValue = (e.clientX - bounds.x) / e.currentTarget.clientWidth
    const yValue = (e.clientY - bounds.y) / e.currentTarget.clientHeight

    x.set(xValue, true)
    y.set(yValue, true)
    setHovering(true)
  }

  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    x.set(0.5, true)
    y.set(0.5, true)
    setHovering(false)
  }

  return (
    <motion.div
      variants={PokerVariants}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        ...style,
        transition: 'transform .3s ease-out',
        rotateY,
        rotateX,
      }}
    >
      <div className="relative h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-base-200 shadow">
        <div className="absolute top-[50%] flex w-full items-center justify-center p-8">
          <div className="flex gap-2">
            <div>
              <Icon className="inline align-text-top" size={18} />
            </div>
            <div>
              <h3 className="text-2xl">{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <motion.div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovering ? 0.3 : 0,
            backgroundImage: hovering ? backgroundImage : 'none',
          }}
         />
      </div>
    </motion.div>
  )
}

export const Intro = () => {
  const [showGrid, setShowGrid] = useState(false)
  const { scrollY } = useScroll()

  const titleOpacity = useTransform(scrollY, [100, 380], [1, 0])
  const titleY = useTransform(scrollY, [0, 380], [-56, -240])

  const gridY = useTransform(scrollY, [380, 600], [400, 0])
  const gridOpacity = useTransform(scrollY, [380, 600], [0, 1])

  useEffect(() => {
    const unsubscribe = scrollY.on('change', y => {
      setShowGrid(y > 380)
    })

    return () => {
      unsubscribe()
    }
  }, [scrollY])

  const titleVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const charVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  }

  return (
    <div className="container relative mx-auto h-[200vh]">
      <div className="sticky top-0 h-screen">
        <div className="h-screen">
          <div className="relative h-full">
            <motion.h1
              className="container absolute top-1/2 text-9xl"
              variants={titleVariants}
              initial="hidden"
              animate="show"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              {[...'About'].map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              className="absolute top-[15vh] grid h-[70vh] w-full gap-4"
              variants={titleVariants}
              initial="hidden"
              animate={showGrid ? 'show' : undefined}
              style={{
                y: gridY,
                opacity: gridOpacity,
                gridTemplateColumns: '.4fr .3fr .3fr',
                gridTemplateRows: '1fr .15fr 1fr',
                gridTemplateAreas: `
                  "feat-0 feat-1 feat-2"
                  "feat-0 feat-1 feat-4"
                  "feat-0 feat-3 feat-4"
                `,
              }}
            >
              <Poker
                style={{ gridArea: 'feat-0' }}
                icon={IconCode}
                title="Coder"
                description="Create beautiful and high-performance web applications."
               />
              <Poker
                style={{ gridArea: 'feat-1' }}
                icon={IconChefHat}
                title="Chef"
                description="I'm the family chef, trying to make wonderful food for my family."
               />

              <Poker
                style={{ gridArea: 'feat-2' }}
                icon={IconBeach}
                title="Traveler"
                description="I like to stay at home, but my wife likes to go out and travel, so I have become a person who loves to travel."
               />
              <Poker
                style={{ gridArea: 'feat-3' }}
                icon={IconCamera}
                title="Photographer"
                description="It's a hobby of mine to take great looking photos with my phone or camera."
               />
              <Poker
                style={{ gridArea: 'feat-4' }}
                icon={IconMusic}
                title="Guitar learner"
                description="Ready to teach my daughter guitar, but I do not know how to play the guitar yet, is learning to play the guitar."
               />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
