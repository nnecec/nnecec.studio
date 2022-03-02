import Link from 'next/link'
import { Text, Tooltip, Button } from '@nextui-org/react'
import { motion } from 'framer-motion'

const Intro = () => {
  return (
    <section className="flex h-[calc(100vh-96px)] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween' }}
      >
        <Text h1 className="mb-4">
          Focused on <span className="text-yellow-400">JavaScript</span> and{' '}
          <span className="text-cyan-500">React</span>.
        </Text>
        <Tooltip content="最近更新">
          <Link href="/posts" passHref>
            <Button as="a">文章</Button>
          </Link>
        </Tooltip>
      </motion.div>
    </section>
  )
}

export default Intro
