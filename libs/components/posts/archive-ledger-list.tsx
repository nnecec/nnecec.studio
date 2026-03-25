"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "next-view-transitions";

import {
  MotionStagger,
  MotionStaggerItem,
} from "~/libs/components/motion/reveal";
import type { PostPreview } from "~/libs/types/post";
import { Badge } from "~/libs/ui";

import {
  getPostSectionLabel,
  getPostSummary,
  getVisibleTags,
} from "./archive-summary";

export function ArchiveLedgerList({ posts }: { posts: PostPreview[] }) {
  return (
    <MotionStagger
      amount={0.04}
      className="border-y border-black/10 dark:border-white/10"
      delayChildren={0.05}
      stagger={0.06}
    >
      {posts.map((post, index) => {
        const visibleTags = getVisibleTags(post);
        const sectionLabel = getPostSectionLabel(post.slug);
        const summary = getPostSummary(post, 154);

        return (
          <MotionStaggerItem distance={12} key={post.slug}>
            <Link
              className="group block no-underline"
              href={`/posts${post.slug}`}
            >
              <article className="grid gap-4 border-b border-black/10 py-6 transition duration-200 last:border-b-0 hover:bg-black/[0.015] dark:border-white/10 dark:hover:bg-white/[0.025] md:grid-cols-[3.75rem_minmax(0,1fr)_12.5rem] md:items-start md:gap-6 md:px-2">
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-black/42 dark:text-white/40">
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  <span className="hidden h-px w-6 bg-current/35 md:block" />
                </div>

                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/35 dark:text-white/35 md:hidden">
                    <span>{sectionLabel}</span>
                    <span>{post.date}</span>
                  </div>

                  <div className="hidden flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/35 dark:text-white/35 md:flex">
                    <span>{sectionLabel}</span>
                  </div>

                  <h3 className="max-w-3xl text-[1.45rem] font-black leading-tight tracking-[-0.04em] text-black/92 transition group-hover:text-primary md:text-[1.55rem] dark:text-white/92">
                    {post.title}
                  </h3>

                  <p className="max-w-2xl text-sm leading-7 text-black/62 dark:text-white/60">
                    {summary}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 pt-1 md:items-end">
                  <div className="hidden text-xs text-black/42 md:block dark:text-white/40">
                    {post.date}
                  </div>

                  {visibleTags.length > 0 ? (
                    <div className="flex flex-wrap gap-2 md:justify-end">
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
                  ) : null}

                  <div className="inline-flex size-9 items-center justify-center rounded-full text-black/66 transition duration-200 group-hover:translate-x-1 group-hover:border-black/18 group-hover:text-black/84 dark:border-white/10 dark:text-white/62 dark:group-hover:border-white/16 dark:group-hover:text-white/84">
                    <IconArrowRight size={16} />
                  </div>
                </div>
              </article>
            </Link>
          </MotionStaggerItem>
        );
      })}
    </MotionStagger>
  );
}
