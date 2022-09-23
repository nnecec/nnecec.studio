import React, { useLayoutEffect, useRef, useState } from 'react'

import {
  Album,
  Camera,
  Code,
  CoffeeCup,
  DesignPencil,
  Gamepad,
  Motorcycle,
  Stroller
} from 'iconoir-react'

import { Layout } from '~/ui'

import clsx from 'clsx'
import type { Variants } from 'framer-motion'
import {
  motion,
  useIsomorphicLayoutEffect,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform
} from 'framer-motion'
import colors from 'tailwindcss/colors'

const delta = 12

interface PokerProps {
  style: React.CSSProperties
  icon?: React.ReactNode
  title?: React.ReactNode
}

const PokerVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  show: {
    opacity: 1,
    y: 0
  }
}
const cardVariants: Variants = {
  front: {
    rotateY: 0
  },
  back: {
    rotateY: 180
  }
}

const Poker = ({
  children,
  title,
  icon,
  ...props
}: React.PropsWithChildren<PokerProps>) => {
  const [hovering, setHovering] = useState(false)
  const [reverse, setReverse] = useState(false)

  const y = useMotionValue(0.5)
  const x = useMotionValue(0.5)
  const yp = useTransform(y, y => y * 100)
  const xp = useTransform(x, x => x * 100)
  const AccentColor = useMotionValue(colors.zinc[600])
  const backgroundImage = useMotionTemplate`radial-gradient(circle at ${xp}% ${yp}%, ${AccentColor}, #0000000f)`

  const rotateY = useTransform(x, [0, 1], [-delta, delta], {
    clamp: true
  })
  const rotateX = useTransform(y, [0, 1], [delta, -delta], {
    clamp: true
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

  const onClick = () => {
    console.log('click')
  }

  return (
    <motion.div variants={PokerVariants} {...props}>
      <motion.div
        className="relative h-full w-full"
        animate={reverse ? 'front' : 'back'}
        variants={cardVariants}
      >
        <motion.div
          className="relative h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-base-200 shadow"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={{
            transition: 'transform .3s ease-out',
            perspective: 500,
            rotateY,
            rotateX
          }}
          onClick={onClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          onTap={() => {
            setReverse(!reverse)
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={reverse ? 'back' : 'front'}
            variants={cardVariants}
            style={{
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center">
              <div className="flex justify-center text-4xl">{icon}</div>
            </div>

            <motion.div
              className="absolute inset-0 rounded-2xl transition-opacity duration-300"
              style={{
                opacity: hovering ? 0.3 : 0,
                backgroundImage: hovering ? backgroundImage : 'none'
              }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden'
            }}
            animate={reverse ? 'front' : 'back'}
            variants={cardVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export const Intro = () => {
  const [showGrid, setShowGrid] = useState(false)
  const { scrollY } = useScroll()

  const titleOpacity = useTransform(scrollY, [100, 380], [1, 0])
  const titleY = useTransform(scrollY, [0, 380], [0, -240])

  const gridY = useTransform(scrollY, [380, 600], [400, 0])
  const gridOpacity = useTransform(scrollY, [380, 600], [0, 1])

  scrollY.onChange(y => {
    setShowGrid(y > 380 ? true : false)
  })

  const titleVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12
      }
    }
  }
  const charVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1
    }
  }

  return (
    <div className="relative h-[200vh]">
      <div className="sticky top-0 h-screen">
        <div className="h-screen">
          <div className="relative h-full">
            <motion.h1
              className="absolute top-1/2 text-9xl"
              variants={titleVariants}
              initial="hidden"
              animate="show"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              {'About'.split('').map((char, index) => (
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
                gridTemplateColumns: '.25fr .3fr .25fr .2fr',
                gridTemplateRows: '.55fr .35fr .85fr .65',
                gridTemplateAreas: `
                  "feat-0 feat-1 feat-2 feat-3"
                  "feat-0 feat-1 feat-5 feat-3"
                  "feat-4 feat-1 feat-5 feat-7"
                  "feat-4 feat-6 feat-5 feat-7"
                `
              }}
            >
              <Poker style={{ gridArea: 'feat-0' }} icon={<Gamepad />}>
                league of legends
              </Poker>
              <Poker style={{ gridArea: 'feat-1' }} icon={<Code />} />

              <Poker style={{ gridArea: 'feat-2' }} icon={<Album />} />
              <Poker style={{ gridArea: 'feat-3' }} icon={<DesignPencil />} />
              <Poker style={{ gridArea: 'feat-4' }} icon={<CoffeeCup />} />
              <Poker style={{ gridArea: 'feat-5' }} icon={<Camera />} />
              <Poker style={{ gridArea: 'feat-6' }} icon={<Stroller />} />
              <Poker style={{ gridArea: 'feat-7' }} icon={<Motorcycle />} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
