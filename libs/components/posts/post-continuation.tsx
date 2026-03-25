import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { Link } from "next-view-transitions"
import type { ReactNode } from "react"

import type { Post } from "~/libs/types/post"

import { getPostSummary } from "./archive-summary"

type PostContinuationProps = {
  newerPost?: Post
  olderPost?: Post
}

function ContinuationLink({
  direction,
  icon,
  label,
  post
}: {
  direction: "left" | "right"
  icon: ReactNode
  label: string
  post: Post
}) {
  return (
    <Link className="group block no-underline" href={`/posts${post.slug}`}>
      <article className="flex h-full flex-col gap-4 rounded-[1.5rem] border border-black/10 bg-black/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-black/16 hover:bg-black/[0.035] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/16 dark:hover:bg-white/[0.05]">
        <div
          className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-black/42 dark:text-white/40 ${direction === "right" ? "justify-end text-right" : ""}`}
        >
          {direction === "left" ? icon : null}
          <span>{label}</span>
          {direction === "right" ? icon : null}
        </div>

        <div className={`space-y-3 ${direction === "right" ? "text-right" : ""}`}>
          <h3 className="text-[1.35rem] font-black leading-tight tracking-[-0.04em] text-black/92 transition group-hover:text-primary dark:text-white/92">
            {post.title}
          </h3>
          <p className="text-sm leading-7 text-black/62 dark:text-white/60">
            {getPostSummary(post, 132)}
          </p>
        </div>
      </article>
    </Link>
  )
}

export function PostContinuation({ newerPost, olderPost }: PostContinuationProps) {
  if (!newerPost && !olderPost) {
    return null
  }

  return (
    <section className="page-bleed mt-16 border-y border-black/10 bg-[#f3ede1] dark:border-white/10 dark:bg-[#111114] md:mt-20">
      <div className="container px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-black/42 dark:text-white/40">
              Continue through the ledger
            </div>
            <h2 className="max-w-2xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Move to the next note without dropping back into a generic post footer.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {newerPost ? (
            <ContinuationLink
              direction="left"
              icon={<IconArrowLeft size={16} />}
              label="Newer note"
              post={newerPost}
            />
          ) : (
            <div />
          )}
          {olderPost ? (
            <ContinuationLink
              direction="right"
              icon={<IconArrowRight size={16} />}
              label="Older note"
              post={olderPost}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
