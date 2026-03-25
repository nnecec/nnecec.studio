import type { Post, PostPreview } from "~/libs/types/post";

import { createPostSummary } from "~/libs/utils/post-summary";

type PostSummarySource = {
  content?: string;
  description?: string;
  summary?: string;
};

export function getPostSummary(
  post: PostSummarySource,
  maxLength = 168,
  fallback = "Notes on frontend systems, rendering, and implementation tradeoffs.",
) {
  if (post.summary) {
    return createPostSummary({
      description: post.summary,
      fallback,
      maxLength,
    });
  }

  return createPostSummary({
    content: post.content,
    description: post.description,
    fallback,
    maxLength,
  });
}

export function getPostSectionLabel(slug?: string) {
  const rawSection = slug?.split("/").filter(Boolean)[0];

  if (!rawSection) {
    return "Ledger";
  }

  return rawSection
    .split(/[-.]/g)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function getVisibleTags(
  post: Pick<Post | PostPreview, "tags">,
  limit = 3,
) {
  return post.tags?.slice(0, limit) ?? [];
}
