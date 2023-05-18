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
        className="h-[30px] w-[30px] bg-current"
        animate={show ? 'show' : 'hide'}
        initial="hide"
        variants={{
          hide: { borderRadius: 0 },
          show: { borderRadius: '50%' },
        }}
       />
    </div>
  )
}
