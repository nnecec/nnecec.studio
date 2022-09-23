import { motion } from 'framer-motion'
import { Layout } from '~/ui'

const WavingHand = () => (
  <motion.div
    style={{
      display: 'inline-block'
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: 'mirror',
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
      type: 'tween'
    }}
  >
    👋🏻
  </motion.div>
)

const Index = () => {
  return (
    <Layout>
      <section className="mt-[-96px] flex h-screen items-center">
        <h1 className="text-9xl">
          <WavingHand />
          <br />
          Hi, I'm nnecec.
        </h1>
      </section>
      {/* <section>
        <h1 className="text-8xl leading-tight">
          <div>
            {['这是我的个人博客。'].map(word => (
              <div key={word}>{word}</div>
            ))}
          </div>
        </h1>
      </section> */}
    </Layout>
  )
}

export default Index
