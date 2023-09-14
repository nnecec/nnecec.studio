'use client'

import type { ReactNode } from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

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
        style={{
          height: 3,
          width: '10%',
        }}
        variants={{ hovered: { width: '100%' } }}
      />
    </motion.span>
  )
}
