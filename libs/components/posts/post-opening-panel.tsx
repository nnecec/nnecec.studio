import { IconCopyright, IconExternalLink } from "@tabler/icons-react"

import type { Post } from "~/libs/types/post"
import { Badge } from "~/libs/ui"
import { SITE_CONFIG } from "~/libs/utils/constants"

import { getPostSectionLabel, getPostSummary, getVisibleTags } from "./archive-summary"

export function PostOpeningPanel({ post }: { post: Post }) {
  const subtitle = getPostSummary(post, 220)
  const sectionLabel = getPostSectionLabel(post.slug)
  const visibleTags = getVisibleTags(post, 6)

  return (
    <div className="grid gap-8 xl:grid-cols-[17rem_minmax(0,1fr)] xl:gap-10">
      <aside className="order-2 xl:order-none">
        <div className="grid gap-5 rounded-[1.75rem] border border-black/10 bg-white/58 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="space-y-2 border-b border-black/8 pb-4 dark:border-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/42 dark:text-white/40">
              Section
            </div>
            <div className="text-sm font-medium text-black/76 dark:text-white/74">
              {sectionLabel}
            </div>
          </div>

          <div className="space-y-2 border-b border-black/8 pb-4 dark:border-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/42 dark:text-white/40">
              Updated
            </div>
            <div className="text-sm font-medium text-black/76 dark:text-white/74">{post.date}</div>
          </div>

          {visibleTags.length > 0 ? (
            <div className="space-y-3 border-b border-black/8 pb-4 dark:border-white/10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/42 dark:text-white/40">
                Labels
              </div>
              <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag) => (
                  <Badge
                    className="rounded-full border-black/10 bg-transparent px-2.5 py-1 text-[11px] font-semibold text-black/68 dark:border-white/10 dark:text-white/66"
                    key={tag}
                    variant="outline"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-3 text-sm leading-7 text-black/66 dark:text-white/62">
            <a
              className="inline-flex items-center gap-2 transition-colors hover:text-black dark:hover:text-white"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              referrerPolicy="no-referrer"
              rel="noreferrer"
              target="_blank"
            >
              <IconCopyright size={16} />
              CC BY-NC 4.0
            </a>
            <a
              className="inline-flex items-center gap-2 transition-colors hover:text-black dark:hover:text-white"
              href={`${SITE_CONFIG.repositoryUrl}/issues`}
              referrerPolicy="no-referrer"
              rel="noreferrer"
              target="_blank"
            >
              <IconExternalLink size={16} />
              Feedback
            </a>
          </div>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-black/46 dark:text-white/42">
          Signal ledger / designed reading stage
        </div>

        <div className="space-y-5">
          <h1 className="max-w-5xl text-[clamp(3rem,6vw,6.8rem)] font-black leading-[0.9] tracking-[-0.065em] text-balance">
            {post.title}
          </h1>

          <p className="max-w-3xl text-base leading-8 text-black/68 sm:text-[1.125rem] dark:text-white/66">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
