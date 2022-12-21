import React, { useState } from 'react'

import {
  Album,
  Camera,
  Code,
  CoffeeCup,
  DesignPencil,
  Gamepad,
  Motorcycle,
  Stroller
} from 'iconoir-react'

import type { Variants } from 'framer-motion'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform
} from 'framer-motion'

const fe_stacks = [
  {
    name: 'HTML',
    color: '#DC351A'
  },
  {
    name: 'CSS',
    color: '#1D31DC'
  },
  {
    name: 'JavaScript',
    color: '#fcdc00'
  },
  {
    name: 'React',
    color: '#61dafb'
  },
  {
    name: 'Node.js',
    color: '#43853d'
  },
  {
    name: 'Next.js',
    color: '#111'
  },
  {
    name: 'Remix',
    color: '#2E7BFE'
  },
  {
    name: 'Docker',
    color: '#1F5ADB'
  },
  {
    name: 'Ant Design',
    color: '#1677ff'
  },
  {
    name: 'Material UI',
    color: '#0B66FE'
  },
  {
    name: 'Tailwind CSS',
    color: '#30AEF7'
  },
  {
    name: 'Markdown',
    color: '#000000'
  },
  {
    name: 'Git',
    color: '#ef391a'
  },
  {
    name: 'Flutter',
    color: '#3BC7FC'
  },
  {
    name: 'Three.js ',
    color: '#049EF4'
  }
]

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: i => ({
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      delay: i * 0.04
    }
  })
}

export const Tech = () => {
  return (
    <div className="relative h-[200vh]">
      <div className="sticky top-0 h-screen">
        <div className="h-screen">
          <div className="relative flex h-full items-center">
            <motion.div className="grid grow grid-cols-2">
              {fe_stacks.map((stack, i) => (
                <motion.div
                  className=""
                  style={{ backgroundColor: stack.color }}
                  key={stack.name}
                  initial="hidden"
                  variants={variants}
                  whileInView="show"
                  custom={i}
                >
                  {stack.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
