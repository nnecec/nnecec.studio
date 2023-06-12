import { useState } from 'react'
import { motion } from 'framer-motion'

export const Logo = () => {
  const [show, setShow] = useState(false)

  const onHoverStart = () => setShow(true)
  const onHoverEnd = () => setShow(false)

  return (
    <div
      className="flex cursor-pointer items-center"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <motion.div
        variants={{
          hide: { borderRadius: 0 },
          show: { borderRadius: '50%' },
        }}
        animate={show ? 'show' : 'hide'}
        className="h-[30px] w-[30px] bg-current"
        initial="hide"
       />
    </div>
  )
}
