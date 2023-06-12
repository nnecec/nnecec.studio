'use client'
import { useEffect, useState } from 'react'
import {
  IconBeach,
  IconCamera,
  IconChefHat,
  IconCode,
  IconMusic,
} from '@tabler/icons-react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Poker } from '~/core/ui/poker'

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
              animate="show"
              className="container absolute top-1/2 text-9xl"
              initial="hidden"
              style={{ opacity: titleOpacity, y: titleY }}
              variants={titleVariants}
            >
              {[...'About'].map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              style={{
                gridTemplateAreas: `
                  "feat-0 feat-1 feat-2"
                  "feat-0 feat-1 feat-4"
                  "feat-0 feat-3 feat-4"
                `,
                gridTemplateColumns: '.4fr .3fr .3fr',
                gridTemplateRows: '1fr .15fr 1fr',
                opacity: gridOpacity,
                y: gridY,
              }}
              animate={showGrid ? 'show' : undefined}
              className="top-[15vh] grid h-[70vh] w-full gap-4 md:absolute"
              initial="hidden"
              variants={titleVariants}
            >
              <Poker
                description="Create beautiful and high-performance web applications."
                icon={IconCode}
                style={{ gridArea: 'feat-0' }}
                title="Coder"
              />
              <Poker
                description="I'm the family chef, trying to make wonderful food for my family."
                icon={IconChefHat}
                style={{ gridArea: 'feat-1' }}
                title="Chef"
              />

              <Poker
                description="I like to stay at home, but my wife likes to go out and travel, so I have become a person who loves to travel."
                icon={IconBeach}
                style={{ gridArea: 'feat-2' }}
                title="Traveler"
              />
              <Poker
                description="It's a hobby of mine to take great looking photos with my phone or camera."
                icon={IconCamera}
                style={{ gridArea: 'feat-3' }}
                title="Photographer"
              />
              <Poker
                description="Ready to teach my daughter guitar, but I do not know how to play the guitar yet, is learning to play the guitar."
                icon={IconMusic}
                style={{ gridArea: 'feat-4' }}
                title="Guitar learner"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
