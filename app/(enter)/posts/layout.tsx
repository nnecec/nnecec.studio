import { Suspense } from "react";

import { PostsScrollManager } from "~/libs/components/posts/posts-scroll-manager";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <PostsScrollManager />
      </Suspense>
      {children}
    </>
  );
}
