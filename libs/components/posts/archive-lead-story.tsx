"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
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

export function ArchiveLeadStory({ post }: { post: PostPreview }) {
  const summary = getPostSummary(post, 220);
  const sectionLabel = getPostSectionLabel(post.slug);
  const visibleTags = getVisibleTags(post);

  return (
    <MotionStagger delayChildren={0.12} stagger={0.08}>
      <Link className="group block no-underline" href={`/posts${post.slug}`}>
        <article className="grid gap-8 rounded-[2rem] border border-black/10 bg-[#171716] p-6 text-[#f7efdf] transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_60px_rgba(23,23,22,0.14)] dark:border-white/10 dark:bg-[#141416] dark:text-[#f5efe1] md:p-8 lg:grid-cols-[minmax(0,1.2fr)_16rem] lg:gap-10">
          <MotionStaggerItem distance={18}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f7efdf]/60 dark:text-white/52">
                <span>Lead story</span>
                <span className="h-px w-10 bg-current/35" />
                <span>{sectionLabel}</span>
              </div>

              <div className="space-y-4">
                <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,4.9rem)] font-black leading-[0.92] tracking-[-0.055em] text-balance transition group-hover:text-[#ffd39a]">
                  {post.title}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[#f7efdf]/72 sm:text-[1.0625rem]">
                  {summary}
                </p>
              </div>
            </div>
          </MotionStaggerItem>

          <MotionStaggerItem distance={14}>
            <div className="flex flex-col justify-between gap-8 border-t border-[#f7efdf]/14 pt-6 text-[#f7efdf]/72 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0 dark:border-white/10 dark:text-white/66">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f7efdf]/48 dark:text-white/42">
                    Updated
                  </div>
                  <div className="text-sm font-medium text-[#f7efdf]/82 dark:text-white/80">
                    {post.date}
                  </div>
                </div>

                {visibleTags.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f7efdf]/48 dark:text-white/42">
                      Labels
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {visibleTags.map((tag) => (
                        <Badge
                          className="rounded-full border-[#f7efdf]/14 bg-white/0 px-2.5 py-1 text-[11px] font-semibold text-[#f7efdf]/74 dark:border-white/12 dark:text-white/70"
                          key={tag}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#f7efdf] transition group-hover:gap-3 dark:text-white">
                Enter article
                <IconArrowUpRight size={18} />
              </div>
            </div>
          </MotionStaggerItem>
        </article>
      </Link>
    </MotionStagger>
  );
}
