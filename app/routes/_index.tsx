import { motion } from 'framer-motion'

import { Layout } from '~/components/layout'

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
      <section className="-mt-header flex h-screen items-center">
        <h1 className="max-w-5xl text-7xl">
          <WavingHand />
          <br />
          Hi, I'm nnecec.
          <span className="text-5xl opacity-70">
            This is my blog. I share through my writing my experience as a frontend engineer and
            everything I'm learning about on JavaScript, React and more.
          </span>
        </h1>
      </section>
    </Layout>
  )
}

export default Index
