import { motion } from 'framer-motion'

import { SITE_CONFIG } from '~/utils/constants'

import type { Variants } from 'framer-motion'
import type { PropsWithChildren } from 'react'

import { Footer } from './footer'
import { Header } from './header'

type Props = {
  preview?: boolean
  title?: string
  className?: string
  container?: boolean
}

const variants: Variants = {
  exit: {
    y: 8,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
    },
  },
}

export const Layout = ({
  children,
  title = SITE_CONFIG.title,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <Header />
      <motion.main
        variants={variants}
        initial="exit"
        animate="enter"
        exit="exit"
        className={`pt-header container mx-auto min-h-screen px-4 md:px-0`}
      >
        <div className={className}>{children}</div>
      </motion.main>
      <Footer />
    </>
  )
}
