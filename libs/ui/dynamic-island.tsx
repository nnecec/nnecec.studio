'use client'

import { HTMLMotionProps, motion } from 'framer-motion'
import { useState } from 'react'

export const DynamicIsland = ({ children, ...props }: HTMLMotionProps<'div'> & { children: any }) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <motion.div layout onPointerOver={() => setIsHover(true)} onPointerLeave={() => setIsHover(false)} {...props}>
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
