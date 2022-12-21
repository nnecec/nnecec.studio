import { useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from 'framer-motion'

import { Layout } from '~/ui'
import { Intro, Tech } from '~/components/about'

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

  return (
    <Layout>
      <section className="mt-[-96px]" ref={section0}>
        <Intro />
      </section>
      <section className="">
        <div className="relative h-[200vh]">
          <div className="sticky top-0 h-screen">
            <div className="h-screen">
              <h1 className="text-8xl">History</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Tech />
      </section>

      <section className="flex items-center justify-center" ref={section0}>
        <div className="h-[100vh]">
          <h1 className="text-5xl">
            Coffee is a drink prepared from roasted coffee beans. Darkly
            colored, bitter, and slightly acidic, coffee has a stimulating
            effect on humans, primarily due to its caffeine content. It is the
            most popular hot drink in the world.
          </h1>
        </div>
      </section>
    </Layout>
  )
}

export default Resume
