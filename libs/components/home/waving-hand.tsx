'use client'

import { motion } from 'framer-motion'

export const WavingHand = () => {
  return (
    <motion.div
      style={{
        display: 'inline-block',
      }}
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
        repeat: 7,
        repeatType: 'mirror',
        type: 'tween',
      }}
      whileHover={{ rotate: 20 }}
    >
      👋🏻
    </motion.div>
  )
}
