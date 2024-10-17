'use client'
import type { TablerIconsProps } from '@tabler/icons-react'

import React, { useState } from 'react'

import clsx from 'clsx'
import { motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion'
import colors from 'tailwindcss/colors'

const delta = 12

interface PokerProps {
  className?: string
  description: React.ReactNode
  icon?: React.JSXElementConstructor<TablerIconsProps>
  style?: React.CSSProperties
  title: React.ReactNode
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
  className,
  description,
  icon,
  style,
  title,
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
      className="size-full"
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      style={{
        ...style,
        rotateX,
        rotateY,
        transition: 'transform .3s ease-out',
      }}
      variants={PokerVariants}
    >
      <div
        className={clsx(
          className,
          'bg-base-200 relative size-full cursor-pointer overflow-hidden rounded-2xl shadow',
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
            backgroundImage: hovering ? backgroundImage : 'none',
            opacity: hovering ? 0.3 : 0,
          }}
        />
      </div>
    </motion.div>
  )
}
