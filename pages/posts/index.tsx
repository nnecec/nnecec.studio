import { Tag } from 'components'
import Head from 'next/head'
import Link from 'next/link'
import Post from 'types/post'
import { Card, Container, Row, Text } from '@nextui-org/react'
import { getAllPosts } from 'lib/api'

type Props = {
  posts: Post[]
}

const PostsPage = ({ posts }: Props) => {
  return (
    <>
      <Head>
        <title>nnecec | 文章列表</title>
      </Head>
      <Container sm>
        {posts.map(post => {
          return (
            <Link href={`/posts${post.slug}`} passHref key={post.slug}>
              <Card className="mb-4 cursor-pointer">
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
          )
        })}
      </Container>
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
