'use client'
import { motion } from 'framer-motion'

import type { Variants } from 'framer-motion'
import type { PropsWithChildren } from 'react'

import { Footer } from './footer'
import { Header } from './header'

type Props = {
  title?: string
  className?: string
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

export const Layout = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div>
      <Header />
      <motion.main
        variants={variants}
        initial="exit"
        animate="enter"
        exit="exit"
        className={`container mx-auto min-h-screen px-4 pt-header md:px-0`}
      >
        <div className={className}>{children}</div>
      </motion.main>
      <Footer />
    </div>
  )
}
