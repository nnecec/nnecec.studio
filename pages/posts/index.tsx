import { Layout, Tag } from 'components'
import Link from 'next/link'
import { Post } from 'types/post'
import { Card, Container, Row, Text } from '@nextui-org/react'
import { getAllPosts } from 'lib/api'

type Props = {
  posts: Post[]
}

const PostsPage = ({ posts }: Props) => {
  return (
    <Layout title="nnecec | 文章列表">
      <Container sm>
        {posts.map(post => {
          return (
            <Link href={`/posts${post.slug}`} passHref key={post.slug}>
              <Card className="mb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
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
    </Layout>
  )
}

export default PostsPage

export const getStaticProps = async () => {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'tags',
    'description',
    'excerpt'
  ])

  return {
    props: { posts }
  }
}
