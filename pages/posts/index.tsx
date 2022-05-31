import { Card, Row, Text } from '@nextui-org/react'
import Link from 'next/link'

import { Layout, Tag } from 'components'
import { getAllPosts } from 'lib/api'
import { Post } from 'types/post'

type Props = {
  posts: Post[]
  tags: string[]
}

const PostsPage = ({ posts }: Props) => {
  return (
    <Layout title="文章列表" xs>
      {posts.map(post => {
        return (
          <Link href={`/posts${post.slug}`} passHref key={post.slug}>
            <div className="mb-4 cursor-pointer p-4 hover:bg-stone-100 dark:hover:bg-stone-900">
              <Text h4>{post.title}</Text>
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
            </div>
          </Link>
        )
      })}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const { posts, tags } = getAllPosts([
    'title',
    'slug',
    'date',
    'tags',
    'description',
    'excerpt'
  ])

  return {
    props: { posts, tags }
  }
}

export default PostsPage
