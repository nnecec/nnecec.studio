"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/libs/ui"

export const TagPicker = ({ tags }: { tags: string[] }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tag = searchParams.get("tag") ?? ""

  return (
    <Select
      onValueChange={(value) =>
        value === "all"
          ? router.replace("/posts")
          : router.replace(`/posts?tag=${encodeURIComponent(value)}`)
      }
      value={tag || "all"}
    >
      <SelectTrigger
        aria-label="Filter posts by tag"
        className="h-11 w-full rounded-full border-black/10 bg-white/72 px-4 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-black/70 shadow-none transition-colors hover:border-black/16 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white/72 dark:hover:border-white/16 dark:hover:bg-white/[0.06]"
      >
        <SelectValue placeholder="All sections" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-black/10 bg-[#f7f1e8] p-1 shadow-lg dark:border-white/10 dark:bg-[#111114]">
        <SelectItem
          className="rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/72 dark:text-white/72"
          value="all"
        >
          All sections
        </SelectItem>
        {tags.map((tag) => (
          <SelectItem
            className="rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/72 dark:text-white/72"
            key={tag}
            value={tag}
          >
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
