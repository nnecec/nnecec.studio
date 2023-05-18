'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  className?: string
}

export const HoverText = ({ children, className }: Props) => {
  return (
    <motion.span className="relative" whileHover="hovered">
      {children}
      <motion.span
        className={clsx('absolute bottom-0 left-0 block', className)}
        variants={{ hovered: { width: '100%' } }}
        style={{
          width: '10%',
          height: 3,
        }}
      />
    </motion.span>
  )
}
