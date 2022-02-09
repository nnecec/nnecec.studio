import Bio from '../../components/bio'
import Head from 'next/head'
import Layout from '../../components/layout'
import Link from 'next/link'
import Post from '../../types/post'
import Tag from '../../components/tag'
import { Spacer, Card, Container, Grid, Row, Text } from '@nextui-org/react'
import { getAllPosts } from '../../lib/api'

type Props = {
  posts: Post[]
}

const PostsPage = ({ posts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>nnecec | 文章列表</title>
        </Head>
        <Container sm>
          <Grid.Container gap={2}>
            {posts.map(post => {
              return (
                <Grid xs={12} sm={6} md={6} key={post.slug}>
                  <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                    <Card hoverable clickable>
                      <Card.Header>
                        <Text h4>{post.title}</Text>
                      </Card.Header>
                      <Text>{post.description || post.excerpt}</Text>
                      <Card.Footer>
                        <Row wrap="wrap" justify="space-between">
                          <Text b>
                            {post.tags?.map(tag => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </Text>
                          <Text
                            css={{
                              color: '$accents4',
                              fontWeight: '$semibold'
                            }}
                          >
                            <Text small>{post.date}</Text>
                          </Text>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Link>
                </Grid>
              )
            })}
          </Grid.Container>
          <Spacer y={2} />
          <Bio />
        </Container>
      </Layout>
    </>
  )
}

export default PostsPage

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
