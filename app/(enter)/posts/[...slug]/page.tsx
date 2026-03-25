import type { Metadata } from "next"

import { getAllPosts, getPost } from "~/libs/api/post"
import { PostPage as SignalLedgerPostPage } from "~/libs/components/posts"

type Props = {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  if (!params) {
    return { title: "Missing post" }
  }

  const post = await getPost(params.slug.join("/"))
  return { title: post.title }
}

export default async function PostRoutePage({ params }: Props) {
  const { slug } = await params
  const slugPath = slug.join("/")

  const [post, { posts }] = await Promise.all([getPost(slugPath), getAllPosts()])
  const currentSlug = `/${slugPath}`
  const normalizedPost = { ...post, slug: currentSlug }
  const currentIndex = posts.findIndex((item) => item.slug === currentSlug)

  return (
    <SignalLedgerPostPage
      newerPost={currentIndex > 0 ? posts[currentIndex - 1] : undefined}
      olderPost={currentIndex >= 0 ? posts[currentIndex + 1] : undefined}
      post={normalizedPost}
    />
  )
}
