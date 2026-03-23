import type { Metadata } from 'next'

import { Link } from 'next-view-transitions'

import {
  IconArrowRight,
  IconBrandGithub,
  IconCircuitCapacitor,
  IconCode,
  IconCpu,
  IconPencil,
  IconSparkles,
} from '@tabler/icons-react'

import { getAllPosts } from '~/libs/api/post'
import { Badge, Button } from '~/libs/ui'
import { ProjectsList } from '~/libs/utils/constants'

export const metadata: Metadata = { title: 'Home' }

const profilePillars = [
  {
    description: 'JavaScript, React, and systems that stay readable as products grow.',
    icon: IconCode,
    title: 'Focused on frontend engineering',
  },
  {
    description: 'Performance, architecture, DX, and the small constraints that decide scale.',
    icon: IconCircuitCapacitor,
    title: 'Interested in how software holds up',
  },
  {
    description:
      'Articles and experiments that turn implementation details into shareable judgment.',
    icon: IconPencil,
    title: 'Writing to clarify ideas',
  },
]

const engineeringSignals = [
  'React architecture',
  'JavaScript internals',
  'Performance thinking',
  'Developer tooling',
  'Readable systems',
]

function stripMarkdown(content: string) {
  return content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ')
    .replace(/\!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getPostSummary(description?: string, content?: string) {
  if (description?.trim()) {
    return description.trim()
  }

  if (!content) {
    return 'Notes, ideas, and implementation details from recent engineering work.'
  }

  const plainText = stripMarkdown(content)
  return plainText.slice(0, 132) + (plainText.length > 132 ? '...' : '')
}

export default async function Page() {
  const [{ posts, tags }] = await Promise.all([getAllPosts()])
  const recentPosts = posts.slice(0, 3)
  const selectedProjects = ProjectsList.slice(0, 4)
  const featuredTags = tags.filter(Boolean).slice(0, 8)

  return (
    <div className="-mt-header pb-16 md:pb-24">
      <section className="page-bleed relative overflow-hidden border-b border-black/8 dark:border-white/10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(250,204,21,0.22),transparent_24%),radial-gradient(circle_at_88%_16%,rgba(251,146,60,0.16),transparent_22%),linear-gradient(180deg,#fff8eb_0%,#fffdf8_42%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(250,204,21,0.14),transparent_25%),radial-gradient(circle_at_88%_16%,rgba(249,115,22,0.14),transparent_24%),linear-gradient(180deg,#171717_0%,#0f0f10_46%,#09090b_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_100%)] bg-[length:24px_24px] opacity-35 dark:opacity-10" />
        <div className="container relative min-h-[calc(100svh_-_var(--spacing-header)_+_1rem)] px-4 pb-12 pt-[calc(var(--spacing-header)_+_1.25rem)] sm:px-6 md:pb-16 lg:px-8 lg:pt-[calc(var(--spacing-header)_+_2rem)]">
          <div className="grid gap-10 lg:min-h-[calc(100svh_-_var(--spacing-header)_-_3rem)] lg:grid-cols-[minmax(0,1.35fr)_22rem] lg:items-end xl:grid-cols-[minmax(0,1.4fr)_24rem]">
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="text-xs font-semibold uppercase tracking-[0.32em] text-black/55 dark:text-white/55">
                  nnecec studio / frontend engineering notes
                </div>
                <h1 className="max-w-5xl text-[clamp(3.2rem,7vw,7.4rem)] font-black leading-[0.92] tracking-[-0.055em] text-balance">
                  Engineering ideas for interfaces that need to stay fast, legible, and worth
                  maintaining.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-black/72 sm:text-lg md:text-xl md:leading-8 dark:text-white/70">
                  I write about React, JavaScript, performance, and the decisions that let frontend
                  systems scale without losing clarity.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="h-11 rounded-full px-6 text-sm font-semibold">
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
                  <a href="https://github.com/nnecec/" rel="noreferrer" target="_blank">
                    View GitHub
                    <IconBrandGithub size={18} />
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {engineeringSignals.map(signal => (
                  <span
                    className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-medium tracking-[0.02em] text-black/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/72"
                    key={signal}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <aside className="grid gap-5 self-end lg:pb-4">
              <div className="rounded-[2rem] border border-black/10 bg-white/72 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
                <div className="mb-8 flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
                    Profile
                  </div>
                  <div className="text-sm font-semibold text-black/48 dark:text-white/48">01</div>
                </div>
                <div className="space-y-6">
                  {profilePillars.map(({ description, icon: Icon, title }) => (
                    <div
                      className="space-y-2 border-t border-black/8 pt-4 first:border-t-0 first:pt-0 dark:border-white/10"
                      key={title}
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-black/80 dark:text-white/80">
                        <Icon size={18} />
                        {title}
                      </div>
                      <p className="text-sm leading-6 text-black/62 dark:text-white/62">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-black/8 py-14 md:py-18 xl:grid-cols-[minmax(0,1fr)_18rem] dark:border-white/10">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45">
              Recent writing
            </div>
            <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
              The latest notes from the frontend side of the desk.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {recentPosts.map((post, index) => (
              <Link
                className="group flex h-full flex-col rounded-[1.75rem] border border-black/8 bg-black/[0.02] p-5 no-underline transition hover:-translate-y-1 hover:border-black/15 hover:bg-black/[0.035] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/18 dark:hover:bg-white/[0.05]"
                href={`/posts${post.slug}`}
                key={post.slug}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/38 dark:text-white/38">
                    0{index + 1}
                  </span>
                  <span className="text-xs text-black/45 dark:text-white/45">{post.date}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold leading-tight tracking-[-0.03em] transition group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mb-5 text-sm leading-6 text-black/62 dark:text-white/62">
                  {getPostSummary(post.description, post.content)}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.tags?.slice(0, 3).map(tag => (
                    <Badge
                      className="rounded-full bg-transparent px-2.5 py-1 text-[11px] font-semibold text-black/70 dark:text-white/70"
                      key={tag}
                      variant="outline"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-black/75 transition group-hover:gap-3 dark:text-white/75">
                  Read article <IconArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-4 rounded-[1.75rem] border border-black/8 bg-[#faf7ef] p-6 dark:border-white/10 dark:bg-[#151515]">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
            Topics in rotation
          </div>
          <div className="flex flex-wrap gap-2">
            {featuredTags.map(tag => (
              <Badge
                className="rounded-full border-black/10 bg-transparent px-3 py-1 text-[11px] font-semibold text-black/75 dark:border-white/10 dark:text-white/75"
                key={tag}
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm leading-6 text-black/60 dark:text-white/60">
            Most writing here is driven by implementation details, framework behavior, and the
            tradeoffs behind engineering choices.
          </p>
        </aside>
      </section>

      <section className="grid gap-10 border-b border-black/8 py-14 md:py-18 xl:grid-cols-[0.9fr_1.1fr] dark:border-white/10">
        <div className="space-y-5">
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45">
            Engineering profile
          </div>
          <h2 className="max-w-xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
            A personal technical site built for developers, not a generic portfolio shell.
          </h2>
          <p className="max-w-xl text-base leading-7 text-black/65 dark:text-white/65">
            The goal is to document ideas clearly, keep experiments close to the writing, and make
            it easy for other engineers to understand what I care about in day-to-day frontend work.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-black/8 p-5 dark:border-white/10">
            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-amber-300/30 text-amber-900 dark:bg-amber-300/15 dark:text-amber-100">
              <IconCpu size={20} />
            </div>
            <h3 className="mb-2 text-lg font-bold">What I care about</h3>
            <p className="text-sm leading-6 text-black/62 dark:text-white/62">
              Systems with clear boundaries, predictable rendering behavior, and code that survives
              maintenance.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-black/8 p-5 dark:border-white/10">
            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-orange-300/30 text-orange-900 dark:bg-orange-300/15 dark:text-orange-100">
              <IconSparkles size={20} />
            </div>
            <h3 className="mb-2 text-lg font-bold">How I work</h3>
            <p className="text-sm leading-6 text-black/62 dark:text-white/62">
              I usually write to sharpen decisions, then turn those decisions into interfaces,
              tools, and implementation notes.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-black/8 p-5 dark:border-white/10">
            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-lime-300/30 text-lime-900 dark:bg-lime-300/15 dark:text-lime-100">
              <IconBrandGithub size={20} />
            </div>
            <h3 className="mb-2 text-lg font-bold">What this site connects</h3>
            <p className="text-sm leading-6 text-black/62 dark:text-white/62">
              Writing, open-source experiments, and the engineering context behind the things I
              choose to build.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45">
              Selected work
            </div>
            <h2 className="text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Small tools, experiments, and the systems thinking behind them.
            </h2>
          </div>
          <Button asChild className="h-10 rounded-full px-5 font-semibold" variant="outline">
            <a href="https://github.com/nnecec/" rel="noreferrer" target="_blank">
              Browse more on GitHub
              <IconArrowRight size={16} />
            </a>
          </Button>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {selectedProjects.map(project => (
            <a
              className="group rounded-[1.75rem] border border-black/8 bg-black/[0.02] p-6 transition hover:-translate-y-1 hover:border-black/15 hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/18 dark:hover:bg-white/[0.05]"
              href={project.link}
              key={project.title}
              rel="noreferrer"
              target="_blank"
            >
              <div className="mb-10 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-black/38 dark:text-white/38">
                    GitHub project
                  </div>
                  <h3 className="text-2xl font-bold tracking-[-0.03em]">{project.title}</h3>
                </div>
                <IconArrowRight
                  className="shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={18}
                />
              </div>
              <p className="max-w-md text-sm leading-6 text-black/62 dark:text-white/62">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
