'use client'
import { motion } from 'framer-motion'

import type { Variants } from 'framer-motion'
import type { PropsWithChildren } from 'react'

import { Footer } from './footer'
import { Header } from './header'

type Props = {
  className?: string
  title?: string
}

const variants: Variants = {
  enter: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
    },
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
    },
    y: 8,
  },
}

export const Layout = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div>
      <Header />
      <motion.main
        animate="enter"
        className={`container mx-auto min-h-screen px-4 pt-header md:px-0`}
        exit="exit"
        initial="exit"
        variants={variants}
      >
        <div className={className}>{children}</div>
      </motion.main>
      <Footer />
    </div>
  )
}
