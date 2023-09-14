'use client'

import { motion } from 'framer-motion'

export const WavingHand = () => (
  <motion.div
    animate={{ rotate: 20 }}
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
  >
    👋🏻
  </motion.div>
)
