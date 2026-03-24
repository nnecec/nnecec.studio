'use client'

import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { SITE_CONFIG } from '~/libs/utils/constants'

import { editorialHero } from './editorial-data'
import { EditorialSignalField } from './editorial-signal-field'

gsap.registerPlugin(useGSAP)

const heroFragments = [
  {
    label: 'Primary focus',
    value:
      'Scalable frontend architecture for products with evolving requirements, multiple contributors, and real production traffic.',
  },
  {
    label: 'Core stack',
    value:
      'TypeScript, React, Next.js, Tailwind CSS, testing, and the tooling needed to keep delivery predictable.',
  },
  {
    label: 'What teams rely on',
    value:
      'Clear abstractions, measurable performance, reliable UI behavior, and codebases that remain workable over time.',
  },
] as const

export function EditorialHero() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.from('[data-hero-reveal]', {
        delay: 0.06,
        duration: 0.95,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.08,
        y: 30,
      })

      gsap.from('[data-hero-fragment]', {
        delay: 0.32,
        duration: 0.9,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.08,
        y: 24,
      })
    },
    { scope: rootRef },
  )

  return (
    <section
      className="page-bleed relative overflow-hidden border-black/8 dark:border-white/10"
      ref={rootRef}
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_12%_16%,rgba(250,204,21,0.2),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(180,138,78,0.18),transparent_22%),linear-gradient(180deg,#fff8ec_0%,#fffdf8_42%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_12%_16%,rgba(250,204,21,0.12),transparent_25%),radial-gradient(circle_at_84%_12%,rgba(161,118,67,0.18),transparent_22%),linear-gradient(180deg,#171718_0%,#101012_46%,#0a0a0c_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(17,17,17,0.055)_1px,transparent_1px),linear-gradient(rgba(17,17,17,0.045)_1px,transparent_1px)] bg-[size:26px_26px] opacity-35 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] dark:opacity-15" />

      <div className="container relative px-4 pb-12 pt-[calc(var(--spacing-header)_+_1.25rem)] sm:px-6 md:pb-16 lg:px-8 lg:pt-[calc(var(--spacing-header)_+_2rem)]">
        <div className="grid gap-10 lg:min-h-[calc(100svh_-_var(--spacing-header)_-_3rem)] lg:grid-cols-[minmax(0,1.02fr)_0.98fr] lg:items-end xl:grid-cols-[minmax(0,1.08fr)_0.92fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <div
                className="text-xs font-semibold uppercase tracking-[0.32em] text-black/52 dark:text-white/52"
                data-hero-reveal
              >
                {editorialHero.label}
              </div>

              <h1
                className="max-w-5xl text-[clamp(3.15rem,7vw,7rem)] font-black leading-[0.9] tracking-[-0.058em] text-balance"
                data-hero-reveal
              >
                {editorialHero.title}
              </h1>

              <p
                className="max-w-2xl text-base leading-7 text-black/72 sm:text-lg md:text-xl md:leading-8 dark:text-white/68"
                data-hero-reveal
              >
                {editorialHero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5" data-hero-reveal>
              {editorialHero.pills.map(pill => (
                <span
                  className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-medium tracking-[0.02em] text-black/72 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/74"
                  key={pill}
                >
                  {pill}
                </span>
              ))}
            </div>

            <div
              className="max-w-xl text-sm leading-6 text-black/58 dark:text-white/56"
              data-hero-reveal
            >
              {SITE_CONFIG.author.name} / senior frontend engineer / architecture, performance, delivery
            </div>
          </div>

          <div className="lg:pb-4" data-hero-reveal>
            <EditorialSignalField />
          </div>
        </div>

        <div className="mt-8 border border-black/8 dark:border-white/10">
          <div className="grid gap-0 md:grid-cols-[1.12fr_1fr_0.88fr]">
            {heroFragments.map(({ label, value }) => (
              <div
                className="border-b border-black/8 px-0 py-5 md:border-b-0 md:border-r md:border-black/8 md:px-5 last:border-r-0 dark:border-white/10"
                data-hero-fragment
                key={label}
              >
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 dark:text-white/42">
                  {label}
                </div>
                <p className="max-w-[30rem] text-sm leading-6 text-black/68 dark:text-white/65">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
