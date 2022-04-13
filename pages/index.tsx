import Head from 'next/head'
import { Layout } from 'components'
import { Container } from '@nextui-org/react'
import { SITE_CONFIG } from '../utils/constants'
import { getAllPosts } from '../utils/api'
import Link from 'next/link'
import { Text, Tooltip, Button } from '@nextui-org/react'
import { motion } from 'framer-motion'

const Index = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{SITE_CONFIG.title}</title>
        </Head>
        <Container>
          <section className="mt-[-96px] flex h-screen items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Text h1 className="mb-4">
                Focused on <span className="text-yellow-400">JavaScript</span>{' '}
                and <span className="text-cyan-500">React</span>.
              </Text>
              <Tooltip content="最近更新">
                <Link href="/posts" passHref>
                  <Button as="a">文章</Button>
                </Link>
              </Tooltip>
            </motion.div>
          </section>
        </Container>
      </Layout>
    </>
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
