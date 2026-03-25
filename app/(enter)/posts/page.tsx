import type { Metadata } from "next";

import { getAllPosts } from "~/libs/api/post";
import { ArchivePage } from "~/libs/components/posts";

export const metadata: Metadata = { title: "Posts" };
export const dynamic = "force-static";

export default async function PostsPage() {
  const { posts, tags } = await getAllPosts();

  return <ArchivePage posts={posts} tags={tags} />;
}
