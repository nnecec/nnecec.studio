'use client'
import type { Variants } from 'framer-motion'

import type { PropsWithChildren } from 'react'

import { motion } from 'framer-motion'

import { Footer } from './footer'
import { Header } from './header'
import clsx from 'clsx'

type Props = {
  className?: string
  title?: string
  fullwidth?: boolean
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

export const Layout = ({ children, className, fullwidth = false }: PropsWithChildren<Props>) => {
  return (
    <div>
      <Header />
      <motion.main
        animate="enter"
        className={clsx(`mx-auto min-h-screen px-4 pt-header md:px-0`, !fullwidth && 'container')}
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
