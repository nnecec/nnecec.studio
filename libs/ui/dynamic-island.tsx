'use client'

import type { HTMLMotionProps } from 'framer-motion'

import { useState } from 'react'

import { motion } from 'framer-motion'

export const DynamicIsland = ({
  children,
  ...props
}: { children: any } & HTMLMotionProps<'div'>) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <motion.div
      layout
      onPointerLeave={() => setIsHover(false)}
      onPointerOver={() => setIsHover(true)}
      {...props}
    >
      {children({ isHover })}
    </motion.div>
  )
}

export const DynamicIslandItem = ({ children, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div layout {...props}>
      {children}
    </motion.div>
  )
}
