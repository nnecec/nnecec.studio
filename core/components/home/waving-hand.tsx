'use client'

import { motion } from 'framer-motion'

export const WavingHand = () => (
  <motion.div
    style={{
      display: 'inline-block',
    }}
    transition={{
      delay: 0.5,
      duration: 0.2,
      ease: 'easeInOut',
      repeat: 7,
      repeatType: 'mirror',
      type: 'tween',
    }}
    animate={{ rotate: 20 }}
  >
    👋🏻
  </motion.div>
)
