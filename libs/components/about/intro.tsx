'use client'

import { useRef } from 'react'

import Image from 'next/image'

import { useGSAP } from '@gsap/react'
import { IconCamera, IconCode, IconCompass, IconCpu, IconTools } from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const profileCards = [
  {
    description:
      'I care about how frontend systems age: readability, performance, and architecture under real product pressure.',
    icon: IconCpu,
    title: 'Engineering lens',
  },
  {
    description:
      'I build with React and JavaScript, but I am usually thinking one layer deeper about constraints, state, and rendering behavior.',
    icon: IconCode,
    title: 'What I build around',
  },
  {
    description:
      'Tooling, workflows, and small abstractions that help teams keep momentum without losing clarity.',
    icon: IconTools,
    title: 'What I improve for',
  },
]

const personalSignals = [
  {
    icon: IconCompass,
    label: 'Outside work',
    text: 'Travel, family routines, and staying curious about how people actually use what we ship.',
  },
  {
    icon: IconCamera,
    label: 'Off-screen habits',
    text: 'Photography, visual references, and noticing composition in ordinary things.',
  },
]

export const Intro = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const cards = gsap.utils.toArray<HTMLElement>('[data-intro-card]')

      gsap.from(
        '[data-intro-kicker], [data-intro-title], [data-intro-copy], [data-intro-actions]',
        { duration: 0.9, ease: 'power3.out', opacity: 0, stagger: 0.1, y: 28 },
      )

      gsap.from(cards, { duration: 0.9, ease: 'power3.out', opacity: 0, stagger: 0.1, y: 40 })

      gsap.from('[data-intro-signal]', {
        delay: 0.35,
        duration: 0.8,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.12,
        x: 24,
      })

      cards.forEach((card, index) => {
        gsap.to(card, {
          rotate: index % 2 === 0 ? -1.5 : 1.5,
          scrollTrigger: {
            end: 'bottom top',
            scrub: true,
            start: 'top top',
            trigger: rootRef.current,
          },
          yPercent: index % 2 === 0 ? -8 : 8,
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <div
      className="page-bleed relative overflow-hidden border-b border-black/8 dark:border-white/10"
      ref={rootRef}
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.14),transparent_26%),linear-gradient(180deg,rgba(255,248,235,0.94),rgba(255,255,255,0.98))] dark:bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.1),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.12),transparent_28%),linear-gradient(180deg,rgba(24,24,27,0.96),rgba(9,9,11,1))]" />
      <div className="container px-4 py-12 sm:px-6 md:py-18 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_0.95fr]">
          <div className="space-y-7">
            <div className="space-y-4">
              <div
                className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45"
                data-intro-kicker
              >
                About / engineering profile
              </div>
              <h1
                className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.05em] text-balance"
                data-intro-title
              >
                I build frontend systems, then write to make the reasoning visible.
              </h1>
              <p
                className="max-w-2xl text-lg leading-8 text-black/68 md:text-xl dark:text-white/68"
                data-intro-copy
              >
                This site sits between engineering notebook and personal studio. It is where
                implementation details, open-source work, and the habits behind my frontend practice
                come together.
              </p>
            </div>

            <div className="flex flex-wrap gap-3" data-intro-actions>
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-medium text-black/72 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/72">
                React + JavaScript
              </div>
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-medium text-black/72 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/72">
                Performance + architecture
              </div>
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-medium text-black/72 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/72">
                Writing + tooling
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-white/70 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="grid gap-5 sm:grid-cols-[8rem_1fr] sm:items-center">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#f5efe3] dark:bg-[#171717]">
                  <Image
                    alt="nnecec avatar"
                    className="object-cover"
                    fill
                    src="/assets/avatar.webp"
                  />
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-black/42 dark:text-white/42">
                    nnecec
                  </div>
                  <p className="text-base leading-7 text-black/66 dark:text-white/66">
                    A frontend engineer focused on product-facing systems, developer experience, and
                    interfaces that stay understandable as they grow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 self-end lg:grid-cols-2 xl:grid-cols-1">
            {profileCards.map(({ description, icon: Icon, title }) => (
              <div
                className="rounded-[1.75rem] border border-black/8 bg-white/72 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
                data-intro-card
                key={title}
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-amber-300/25 text-amber-900 dark:bg-amber-300/12 dark:text-amber-100">
                  <Icon size={20} />
                </div>
                <h2 className="mb-2 text-xl font-bold tracking-[-0.03em]">{title}</h2>
                <p className="text-sm leading-6 text-black/64 dark:text-white/64">{description}</p>
              </div>
            ))}

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 xl:col-span-1">
              {personalSignals.map(({ icon: Icon, label, text }) => (
                <div
                  className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]"
                  data-intro-signal
                  key={label}
                >
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-black/78 dark:text-white/78">
                    <Icon size={18} />
                    {label}
                  </div>
                  <p className="text-sm leading-6 text-black/62 dark:text-white/62">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
