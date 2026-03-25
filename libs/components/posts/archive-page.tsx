import type { Post } from "~/libs/types/post";
import {
  MotionSection,
  MotionStagger,
  MotionStaggerItem,
} from "~/libs/components/motion/reveal";

import { ArchiveLeadStory } from "./archive-lead-story";
import { ArchiveLedgerList } from "./archive-ledger-list";
import { TagPicker } from "./tag-picker";

type ArchivePageProps = {
  currentTag?: string;
  posts: Post[];
  tags: string[];
};

export function ArchivePage({ currentTag, posts, tags }: ArchivePageProps) {
  const leadPost = posts[0];
  const ledgerPosts = posts.slice(1);

  return (
    <div className="-mt-header pb-16 md:pb-24">
      <section className="page-bleed relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_14%_22%,rgba(245,158,11,0.18),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(234,88,12,0.16),transparent_22%),linear-gradient(180deg,#f7f1e6_0%,#fbf8f2_46%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_14%_22%,rgba(251,191,36,0.1),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(249,115,22,0.1),transparent_24%),linear-gradient(180deg,#141416_0%,#0e0e10_48%,#09090b_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_100%)] bg-[length:26px_26px] opacity-35 dark:opacity-10" />

        <div className="container relative px-4 pb-10 pt-[calc(var(--spacing-header)_+_1.5rem)] sm:px-6 md:pb-14 lg:px-8 lg:pt-[calc(var(--spacing-header)_+_2.25rem)]">
          <div className="flex min-h-[calc(100svh_-_var(--spacing-header)_+_1rem)] flex-col justify-end gap-10 md:gap-12">
            <MotionStagger
              className="grid gap-10 xl:grid-cols-[minmax(0,1.3fr)_21rem] xl:items-end xl:gap-12"
              delayChildren={0.06}
              stagger={0.1}
            >
              <MotionStaggerItem distance={22}>
                <div className="space-y-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-black/46 dark:text-white/42">
                    Signal ledger / technical archive
                  </div>

                  <div className="space-y-5">
                    <h1 className="max-w-5xl text-[clamp(3rem,6vw,6rem)] font-black leading-[0.92] tracking-[-0.06em] text-balance">
                      Notes arranged as an authored archive, not a conventional
                      blog feed.
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-black/68 sm:text-[1.0625rem] dark:text-white/66">
                      React, JavaScript, rendering, and frontend architecture
                      organized as a continuing ledger of implementation notes,
                      tradeoffs, and technical positions.
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>

              <MotionStaggerItem distance={16}>
                <aside className="rounded-[1.75rem] border border-black/10 bg-white/58 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="grid gap-5">
                    <div className="grid gap-4 border-b border-black/8 pb-4 dark:border-white/10">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/42 dark:text-white/40">
                          Visible
                        </span>
                        <span className="text-sm font-semibold text-black/72 dark:text-white/72">
                          {String(posts.length).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/42 dark:text-white/40">
                          Filter
                        </span>
                        <span className="text-sm font-medium text-black/66 dark:text-white/64">
                          {currentTag ? `# ${currentTag}` : "All sections"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/42 dark:text-white/40">
                        Section selector
                      </div>
                      <TagPicker tags={tags} />
                    </div>
                  </div>
                </aside>
              </MotionStaggerItem>
            </MotionStagger>

            <div>
              {leadPost ? (
                <ArchiveLeadStory post={leadPost} />
              ) : (
                <MotionSection distance={18} delay={0.12}>
                  <div className="rounded-[1.75rem] border border-dashed border-black/12 bg-white/48 p-8 dark:border-white/12 dark:bg-white/[0.04]">
                    <p className="text-sm leading-7 text-black/62 dark:text-white/60">
                      No posts matched this section yet. Switch the filter to
                      return to the full ledger.
                    </p>
                  </div>
                </MotionSection>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <MotionSection
          className="mb-5 flex items-center justify-between gap-4"
          distance={14}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-black/42 dark:text-white/40">
            Secondary ledger
          </div>
          <div className="text-xs text-black/42 dark:text-white/40">
            {ledgerPosts.length > 0
              ? `${ledgerPosts.length} more notes`
              : "No additional notes"}
          </div>
        </MotionSection>

        {ledgerPosts.length > 0 ? (
          <ArchiveLedgerList posts={ledgerPosts} />
        ) : leadPost ? (
          <MotionSection
            className="border-y border-black/10 py-6 text-sm leading-7 text-black/58 dark:border-white/10 dark:text-white/56"
            distance={12}
          >
            This issue currently holds a single visible note.
          </MotionSection>
        ) : null}
      </section>

      <section className="page-bleed border-y border-black/10 bg-[#f3ede1] dark:border-white/10 dark:bg-[#111114]">
        <MotionSection
          className="container grid gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8"
          distance={14}
        >
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-black/42 dark:text-white/40">
              Archive note
            </div>
            <p className="max-w-2xl text-base leading-8 text-black/68 dark:text-white/64">
              This ledger tracks frontend systems, rendering behavior, and
              implementation choices as designed notes rather than chronological
              blog drops.
            </p>
          </div>

          <div className="text-sm leading-7 text-black/58 dark:text-white/56">
            Read the lead, move through the ledger, and treat each post as part
            of a continuing technical publication.
          </div>
        </MotionSection>
      </section>
    </div>
  );
}
