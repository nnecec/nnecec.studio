import {
  IconArrowRight,
  IconBrandGithub,
  IconCircuitCapacitor,
  IconCode,
  IconCpu,
  IconPencil,
  IconSparkles,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { getAllPosts } from "~/libs/api/post";
import {
  MotionSection,
  MotionStagger,
  MotionStaggerItem,
} from "~/libs/components/motion/reveal";
import { getPostSummary } from "~/libs/components/posts/archive-summary";
import { Badge, Button } from "~/libs/ui";
import { ProjectsList } from "~/libs/utils/constants";

export const metadata: Metadata = { title: "Home" };

const profilePillars = [
  {
    description:
      "React, JavaScript, and UI systems built to stay readable as products grow.",
    icon: IconCode,
    title: "Frontend systems",
  },
  {
    description:
      "Performance, rendering, tooling, and the engineering constraints behind scale.",
    icon: IconCircuitCapacitor,
    title: "Performance and delivery",
  },
  {
    description:
      "Technical writing and experiments focused on tradeoffs, patterns, and execution.",
    icon: IconPencil,
    title: "Technical writing",
  },
];

const engineeringSignals = [
  "React architecture",
  "Rendering performance",
  "Design systems",
  "Developer tooling",
  "Frontend delivery",
];

export default async function Page() {
  const { posts } = await getAllPosts();
  const recentPosts = posts.slice(0, 3);
  const selectedProjects = ProjectsList.slice(0, 4);

  return (
    <div className="-mt-header pb-16 md:pb-24">
      <section className="page-bleed relative overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(250,204,21,0.22),transparent_24%),radial-gradient(circle_at_88%_16%,rgba(251,146,60,0.16),transparent_22%),linear-gradient(180deg,#fff8eb_0%,#fffdf8_42%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(250,204,21,0.14),transparent_25%),radial-gradient(circle_at_88%_16%,rgba(249,115,22,0.14),transparent_24%),linear-gradient(180deg,#171717_0%,#0f0f10_46%,#09090b_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_100%)] bg-[length:24px_24px] opacity-35 dark:opacity-10" />
        <div className="container relative min-h-[calc(100svh_-_var(--spacing-header)_+_1rem)] px-4 pb-16 pt-[calc(var(--spacing-header)_+_1.5rem)] sm:px-6 md:pb-20 lg:px-8 lg:pt-[calc(var(--spacing-header)_+_2.5rem)]">
          <div className="grid gap-12 lg:min-h-[calc(100svh_-_var(--spacing-header)_-_3rem)] lg:grid-cols-[minmax(0,1.35fr)_22rem] lg:items-end lg:gap-16 xl:grid-cols-[minmax(0,1.4fr)_24rem]">
            <MotionStagger
              className="space-y-10"
              delayChildren={0.05}
              stagger={0.1}
            >
              <MotionStaggerItem distance={24}>
                <div className="space-y-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.32em] text-black/55 dark:text-white/55">
                    nnecec studio / senior frontend engineer
                  </div>
                  <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,7.4rem)] font-black leading-[0.92] tracking-[-0.055em] text-balance">
                    Frontend engineering for product interfaces that need to
                    stay fast, clear, and maintainable.
                  </h1>
                  <p className="max-w-xl text-base leading-8 text-black/72 sm:text-lg md:text-[1.125rem] md:leading-8 dark:text-white/70">
                    Notes on React, JavaScript, performance, and the decisions
                    behind scalable frontend systems.
                  </p>
                </div>
              </MotionStaggerItem>

              <MotionStaggerItem distance={18}>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="h-11 rounded-full px-6 text-sm font-semibold"
                  >
                    <Link href="/posts">
                      Read recent posts
                      <IconArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="h-11 rounded-full border-black/15 bg-transparent px-6 text-sm font-semibold hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/8"
                    variant="outline"
                  >
                    <a
                      href="https://github.com/nnecec/"
                      rel="noreferrer"
                      target="_blank"
                    >
                      View GitHub
                      <IconBrandGithub size={18} className="ml-2" />
                    </a>
                  </Button>
                </div>
              </MotionStaggerItem>

              <MotionStaggerItem distance={14}>
                <div className="flex flex-wrap gap-3">
                  {engineeringSignals.map((signal) => (
                    <span
                      className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-medium tracking-[0.02em] text-black/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/72"
                      key={signal}
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </MotionStaggerItem>
            </MotionStagger>

            <MotionSection
              className="grid gap-6 self-end lg:pb-6"
              delay={0.18}
              distance={22}
            >
              <div className="rounded-[2rem] border border-black/10 bg-white/72 p-7 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
                <div className="mb-8 flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
                    Focus
                  </div>
                  <div className="text-sm font-semibold text-black/48 dark:text-white/48">
                    01
                  </div>
                </div>
                <div className="space-y-7">
                  {profilePillars.map(({ description, icon: Icon, title }) => (
                    <div
                      className="space-y-3 border-t border-black/8 pt-5 first:border-t-0 first:pt-0 dark:border-white/10"
                      key={title}
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-black/80 dark:text-white/80">
                        <Icon size={18} />
                        {title}
                      </div>
                      <p className="max-w-[17rem] text-sm leading-7 text-black/62 dark:text-white/62">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="space-y-8">
          <MotionSection className="space-y-4" distance={16}>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45">
              Recent writing
            </div>
            <h2 className="max-w-2xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Recent notes on React, JavaScript, performance, and frontend
              architecture.
            </h2>
          </MotionSection>

          <MotionStagger
            className="grid gap-5 lg:grid-cols-3"
            delayChildren={0.08}
            stagger={0.1}
          >
            {recentPosts.map((post, index) => {
              const visibleTags = post.tags?.slice(0, 3) ?? [];

              return (
                <MotionStaggerItem
                  className="h-full"
                  distance={16}
                  key={post.slug}
                >
                  <Link
                    className="group flex h-full flex-col rounded-[1.75rem] border border-black/8 bg-black/[0.02] p-6 no-underline transition hover:-translate-y-1 hover:border-black/15 hover:bg-black/[0.035] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/18 dark:hover:bg-white/[0.05]"
                    href={`/posts${post.slug}`}
                  >
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/38 dark:text-white/38">
                        0{index + 1}
                      </span>
                      <span className="text-xs text-black/45 dark:text-white/45">
                        {post.date}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div>
                        <h3 className="mb-3 text-xl font-bold leading-tight tracking-[-0.03em] transition group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="text-sm leading-7 text-black/62 dark:text-white/62">
                          {getPostSummary(
                            post,
                            132,
                            "Implementation notes from recent frontend engineering work.",
                          )}
                        </p>
                      </div>

                      <div className="mt-auto border-t border-black/8 pt-4 sm:pt-5 dark:border-white/10">
                        {visibleTags.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {visibleTags.map((tag) => (
                              <Badge
                                className="rounded-full bg-transparent px-2.5 py-1 text-[11px] font-semibold text-black/70 dark:text-white/70"
                                key={tag}
                                variant="outline"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                        <div
                          className={`${visibleTags.length > 0 ? "mt-3" : "mt-0"} flex items-center gap-2 text-sm font-semibold text-black/75 transition group-hover:gap-3 dark:text-white/75`}
                        >
                          Read article <IconArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </MotionStaggerItem>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      <section className="grid gap-12 py-16 md:py-20 xl:grid-cols-[0.9fr_1.1fr]">
        <MotionSection className="space-y-6" distance={16}>
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45">
            Working approach
          </div>
          <h2 className="max-w-lg text-3xl font-black tracking-[-0.04em] md:text-5xl">
            This site is a record of frontend architecture, performance work,
            and engineering decisions.
          </h2>
          <p className="max-w-lg text-base leading-8 text-black/65 dark:text-white/65">
            It connects writing, experiments, and small tools so the reasoning
            behind the work stays visible.
          </p>
        </MotionSection>

        <MotionStagger
          className="grid gap-5 lg:grid-cols-3"
          delayChildren={0.06}
          stagger={0.08}
        >
          <MotionStaggerItem distance={14}>
            <div className="rounded-[1.5rem] border border-black/8 p-6 dark:border-white/10">
              <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-amber-300/30 text-amber-900 dark:bg-amber-300/15 dark:text-amber-100">
                <IconCpu size={20} />
              </div>
              <h3 className="mb-2 text-lg font-bold">What I optimize for</h3>
              <p className="text-sm leading-7 text-black/62 dark:text-white/62">
                Clear boundaries, predictable rendering, and code that survives
                maintenance.
              </p>
            </div>
          </MotionStaggerItem>
          <MotionStaggerItem distance={14}>
            <div className="rounded-[1.5rem] border border-black/8 p-6 dark:border-white/10">
              <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-orange-300/30 text-orange-900 dark:bg-orange-300/15 dark:text-orange-100">
                <IconSparkles size={20} />
              </div>
              <h3 className="mb-2 text-lg font-bold">How I decide</h3>
              <p className="text-sm leading-7 text-black/62 dark:text-white/62">
                Prefer explicit tradeoffs, small abstractions, and changes teams
                can safely build on.
              </p>
            </div>
          </MotionStaggerItem>
          <MotionStaggerItem distance={14}>
            <div className="rounded-[1.5rem] border border-black/8 p-6 dark:border-white/10">
              <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-lime-300/30 text-lime-900 dark:bg-lime-300/15 dark:text-lime-100">
                <IconBrandGithub size={20} />
              </div>
              <h3 className="mb-2 text-lg font-bold">What lives here</h3>
              <p className="text-sm leading-7 text-black/62 dark:text-white/62">
                Writing, experiments, and implementation notes from real
                frontend work.
              </p>
            </div>
          </MotionStaggerItem>
        </MotionStagger>
      </section>

      <section className="py-16 md:py-20">
        <MotionSection
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          distance={16}
        >
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45">
              Selected work
            </div>
            <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Tools and experiments shaped by frontend systems and developer
              workflow.
            </h2>
          </div>
          <Button
            asChild
            className="h-10 rounded-full px-5 font-semibold"
            variant="outline"
          >
            <a
              href="https://github.com/nnecec/"
              rel="noreferrer"
              target="_blank"
            >
              Browse more on GitHub
              <IconArrowRight size={16} />
            </a>
          </Button>
        </MotionSection>

        <MotionStagger
          className="grid gap-5 xl:grid-cols-2"
          delayChildren={0.06}
          stagger={0.09}
        >
          {selectedProjects.map((project) => (
            <MotionStaggerItem distance={14} key={project.title}>
              <a
                className="group block rounded-[1.75rem] border border-black/8 bg-black/[0.02] p-7 transition hover:-translate-y-1 hover:border-black/15 hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/18 dark:hover:bg-white/[0.05]"
                href={project.link}
                rel="noreferrer"
                target="_blank"
              >
                <div className="mb-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-black/38 dark:text-white/38">
                      GitHub project
                    </div>
                    <h3 className="text-2xl font-bold tracking-[-0.03em]">
                      {project.title}
                    </h3>
                  </div>
                  <IconArrowRight
                    className="shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={18}
                  />
                </div>
                <p className="max-w-md text-sm leading-7 text-black/62 dark:text-white/62">
                  {project.description}
                </p>
              </a>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </section>
    </div>
  );
}
