import { motion } from 'framer-motion'

import { Layout } from '~/components/layout'
import { HoverText } from '~/ui/hover-text'

const WavingHand = () => (
  <motion.div
    style={{
      display: 'inline-block',
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: 'mirror',
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
      type: 'tween',
    }}
  >
    👋🏻
  </motion.div>
)

const Index = () => {
  return (
    <Layout>
      <section className="-mt-header pt-header flex h-screen items-center">
        <h1 className="max-w-5xl text-5xl md:text-8xl">
          <WavingHand />
          <br />
          Hi, I'm nnecec.
          <span className="text-4xl opacity-70 md:text-6xl">
            This is my blog about the understanding of{' '}
            <HoverText className="bg-[#FFE70B]">JavaScript</HoverText>, <HoverText className="bg-[rgb(20,158,202)]">React</HoverText>{' '}
            and more.
          </span>
        </h1>
      </section>
    </Layout>
  )
}

export default Index
