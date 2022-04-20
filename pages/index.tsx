import { Text, Tooltip, Button } from '@nextui-org/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Layout } from 'components'

const Index = () => {
  return (
    <Layout>
      <section className="mt-[-96px] flex h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Text h1 className="mb-4">
            Focused on{' '}
            <span className="inline-block w-[220px] overflow-hidden align-bottom">
              <motion.span
                className="inline-flex h-[72px] flex-col"
                animate={{
                  transform: [
                    'translateY(0)',
                    'translateY(-100%)',
                    'translateY(-100%)',
                    'translateY(-200%)',
                    'translateY(-200%)',
                    'translateY(-300%)',
                    'translateY(-300%)'
                  ]
                }}
                transition={{
                  duration: 12,
                  ease: 'ease',
                  times: [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
                  repeat: Infinity,
                  delay: 2
                }}
              >
                <span style={{ color: '#fcdc00' }}>JavaScript</span>
                <span style={{ color: '#3178c6' }}>TypeScript</span>
                <span style={{ color: '#61dafb' }}>React</span>
                <span style={{ color: '#fcdc00' }}>JavaScript</span>
              </motion.span>
            </span>
          </Text>
          <Tooltip content="最近更新">
            <Link href="/posts" passHref>
              <Button as="a">文章</Button>
            </Link>
          </Tooltip>
        </motion.div>
      </section>
    </Layout>
  )
}

export default Index
