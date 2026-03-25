import type { Post } from "~/libs/types/post"

function stripMarkdown(content: string) {
  return content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/`{1,3}[^`]*`{1,3}/g, " ")
    .replace(/\!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength).trimEnd()}...`
}

export function getPostSummary(
  post: Pick<Post, "content" | "description">,
  maxLength = 168,
  fallback = "Notes on frontend systems, rendering, and implementation tradeoffs."
) {
  if (post.description?.trim()) {
    return truncate(post.description.trim(), maxLength)
  }

  if (!post.content) {
    return fallback
  }

  return truncate(stripMarkdown(post.content), maxLength)
}

export function getPostSectionLabel(slug?: string) {
  const rawSection = slug?.split("/").filter(Boolean)[0]

  if (!rawSection) {
    return "Ledger"
  }

  return rawSection
    .split(/[-.]/g)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

export function getVisibleTags(post: Pick<Post, "tags">, limit = 3) {
  return post.tags?.slice(0, limit) ?? []
}
