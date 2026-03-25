import type { Metadata } from "next"

import { getAllPosts } from "~/libs/api/post"
import { ArchivePage } from "~/libs/components/posts"

export const metadata: Metadata = { title: "Posts" }

export default async function PostsPage(props: { searchParams: Promise<{ tag?: string }> }) {
  const searchParams = await props.searchParams
  const { posts, tags } = await getAllPosts(searchParams.tag)

  return <ArchivePage currentTag={searchParams.tag} posts={posts} tags={tags} />
}
