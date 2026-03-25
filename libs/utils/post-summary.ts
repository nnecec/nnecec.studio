const MARKDOWN_PUNCTUATION = /[#>*_\-]+/g;

export function stripMarkdown(content: string) {
  return content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/`{1,3}[^`]*`{1,3}/g, " ")
    .replace(/\!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(MARKDOWN_PUNCTUATION, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
}

export function createPostSummary({
  content,
  description,
  fallback = "Notes on frontend systems, rendering, and implementation tradeoffs.",
  maxLength = 168,
}: {
  content?: string;
  description?: string;
  fallback?: string;
  maxLength?: number;
}) {
  if (description?.trim()) {
    return truncateText(description.trim(), maxLength);
  }

  if (!content) {
    return fallback;
  }

  return truncateText(stripMarkdown(content), maxLength);
}
