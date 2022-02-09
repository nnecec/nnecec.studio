import Bio from '../components/bio'
import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import Post from '../types/post'
import { Container } from '@nextui-org/react'
import { SITE_CONFIG } from '../lib/constants'
import { getAllPosts } from '../lib/api'
import Intro from '../components/intro'

type Props = {
  posts: Post[]
}

const Index = ({ posts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{SITE_CONFIG.title}</title>
        </Head>
        <Container>
          <Intro />
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
