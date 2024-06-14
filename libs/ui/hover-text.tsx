'use client'

import type { ReactNode } from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

type Props = {
  children?: ReactNode
  className?: string
  color?: string
}

export const HoverText = ({ children, color }: Props) => {
  return (
    <motion.span className="relative px-1" whileHover="hovered">
      {children}
      <motion.span
        className="absolute bottom-0 left-0 -z-10 block"
        style={{
          backgroundColor: color,
          height: '1em',
          width: 5,
        }}
        variants={{ hovered: { width: '100%' } }}
      />
    </motion.span>
  )
}
