import { useLayoutEffect, useRef, useState } from 'react'


import type { Variants } from "framer-motion";
import { useTransform } from "framer-motion"
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";

import type { LinksFunction } from '@remix-run/node';

import { Layout } from '~/ui'
import { Intro } from '~/components/about'

const Resume = () => {
  const [clientHeight, setClientHeight] = useState<number>()
  const section0 = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      setClientHeight(document.documentElement.clientHeight)
    }
    if (typeof document !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)
    }
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return <Layout>
    <section className="mt-[-96px]" ref={section0}>
      <Intro />
    </section>
    <section className="flex items-center justify-center" ref={section0}>
      <div className="relative h-[300vh]">
        <div className="sticky top-0 h-screen">
          <div className='absolute top-1/2 left-1/2 h-[786px] w-[1336px] -translate-x-1/2 -translate-y-1/2'>
            <h1 className='text-8xl'>Tea</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="flex items-center justify-center" ref={section0}>
      <div className="h-[100vh]">
        <h1 className='text-5xl'>Coffee is a drink prepared from roasted coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content. It is the most popular hot drink in the world.</h1>
      </div>
    </section>
  </Layout>
}


export default Resume
