import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { SITE_CONFIG } from 'lib/constants'

export const Logo = () => {
  const [show, setShow] = useState(false)

  const onHoverStart = () => setShow(true)
  const onHoverEnd = () => setShow(false)

  return (
    <div
      className="flex cursor-pointer items-center overflow-hidden"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <motion.div
        className="h-[30px] w-[30px] bg-current"
        animate={show ? 'show' : 'hide'}
        initial="hide"
        variants={{
          show: { borderRadius: 0 },
          hide: { borderRadius: '50%' }
        }}
      ></motion.div>
      <motion.h1
        animate={show ? 'show' : 'hide'}
        initial="hide"
        variants={{
          show: { opacity: 1, x: 0 },
          hide: { opacity: 0, x: -100 }
        }}
        transition={{ type: 'tween' }}
      >
        {SITE_CONFIG.title}
      </motion.h1>
    </div>
  )
}
