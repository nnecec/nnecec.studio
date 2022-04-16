import { Text, Tooltip, Button } from '@nextui-org/react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { getAllPosts } from 'lib/api'
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
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'tags',
    'description',
    'excerpt'
  ])

  return {
    props: { posts }
  }
}
