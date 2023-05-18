'use client'
import React, { useState } from 'react'
import clsx from 'clsx'
import { motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion'
import colors from 'tailwindcss/colors'

import type { TablerIconsProps } from '@tabler/icons-react'

const delta = 12

interface PokerProps {
  style?: React.CSSProperties
  title: React.ReactNode
  description: React.ReactNode
  icon?: React.JSXElementConstructor<TablerIconsProps>
  className?: string
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

export const Poker = ({
  title,
  description,
  icon,
  style,
  className,
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

  const onLeave = () => {
    x.set(0.5, true)
    y.set(0.5, true)
    setHovering(false)
  }

  return (
    <motion.div
      variants={PokerVariants}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="h-full w-full"
      style={{
        ...style,
        transition: 'transform .3s ease-out',
        rotateY,
        rotateX,
      }}
    >
      <div
        className={clsx(
          className,
          'bg-base-200 relative h-full w-full cursor-pointer overflow-hidden rounded-2xl shadow',
        )}
      >
        <div className="absolute top-[50%] flex w-full items-center p-8">
          <div className="flex gap-2">
            {!!Icon && (
              <div>
                <Icon className="inline align-text-top" size={18} />
              </div>
            )}
            <div>
              <h3 className="mb-4 text-3xl">{title}</h3>
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
