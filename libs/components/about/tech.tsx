'use client'

import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import {
  IconBinaryTree2,
  IconBraces,
  IconBrandReact,
  IconDeviceDesktopCode,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const stackRow = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'MDX',
  'GSAP',
]

const toolRow = [
  'Architecture',
  'Rendering',
  'Design systems',
  'Developer tooling',
  'Performance',
  'Content systems',
  'Open source',
  'DX',
]

const focusAreas = [
  {
    description:
      'Component architecture, state boundaries, rendering behavior, and how interfaces evolve in real products.',
    icon: IconBrandReact,
    title: 'Frontend systems',
  },
  {
    description:
      'Build tooling, reusable config, and the small developer-experience wins that save teams time every week.',
    icon: IconBraces,
    title: 'Tooling and workflow',
  },
  {
    description:
      'Tradeoffs around readability, maintainability, and shipping software that stays understandable later.',
    icon: IconBinaryTree2,
    title: 'Engineering judgment',
  },
]

function MarqueeRow({
  direction = 'left',
  items,
  rowRef,
}: {
  direction?: 'left' | 'right'
  items: string[]
  rowRef: React.RefObject<HTMLDivElement | null>
}) {
  const duplicated = [...items, ...items]

  return (
    <div className="overflow-hidden rounded-full border border-black/8 bg-black/[0.03] px-0 py-3 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex w-max gap-3 whitespace-nowrap will-change-transform" ref={rowRef}>
        {duplicated.map((item, index) => (
          <div
            className="rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm font-semibold text-black/75 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75"
            data-direction={direction}
            key={`${item}-${index}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export const Tech = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const rowOneRef = useRef<HTMLDivElement>(null)
  const rowTwoRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const rows = [
        { duration: 24, ref: rowOneRef, startAt: 0, to: -1 },
        { duration: 21, ref: rowTwoRef, startAt: -0.5, to: 0.5 },
      ]

      rows.forEach(({ duration, ref, startAt, to }) => {
        const row = ref.current
        if (!row) {
          return
        }

        const distance = row.scrollWidth / 2
        gsap.fromTo(
          row,
          { x: distance * startAt },
          { duration, ease: 'none', repeat: -1, x: distance * to },
        )
      })

      gsap.from('[data-tech-heading], [data-tech-copy]', {
        delay: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.1,
        y: 24,
      })

      gsap.from('[data-tech-row]', {
        duration: 1,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.1,
        x: 40,
      })

      gsap.from('[data-tech-card]', {
        duration: 0.85,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.12,
        y: 36,
        scrollTrigger: { start: 'top 78%', trigger: '[data-tech-card-grid]' },
      })

      gsap.to('[data-tech-orb]', { rotation: 360, duration: 26, ease: 'none', repeat: -1 })
    },
    { scope: rootRef },
  )

  return (
    <div
      className="relative overflow-hidden border-b border-black/8 py-14 md:py-18 dark:border-white/10"
      ref={rootRef}
    >
      <div className="absolute right-[-8rem] top-10 -z-10 size-56 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-300/10" />
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
        <div className="space-y-5">
          <div
            className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45"
            data-tech-heading
          >
            Technologies / interests
          </div>
          <h2
            className="max-w-xl text-3xl font-black tracking-[-0.04em] md:text-5xl"
            data-tech-heading
          >
            The stack matters, but the thinking around the stack matters more.
          </h2>
          <p
            className="max-w-xl text-base leading-7 text-black/65 dark:text-white/65"
            data-tech-copy
          >
            I work across UI architecture, application performance, component systems, and developer
            tooling. The technologies below are part of the day-to-day surface area, but the real
            interest is how they behave together when products scale.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/8 bg-[#faf7ef] p-5 dark:border-white/10 dark:bg-[#151515]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-black/70 dark:text-white/70">
              Current rotation
            </div>
            <div
              className="flex size-10 items-center justify-center rounded-full border border-black/8 bg-white/70 dark:border-white/10 dark:bg-white/[0.04]"
              data-tech-orb
            >
              <IconDeviceDesktopCode size={18} />
            </div>
          </div>
          <div className="space-y-3">
            <div data-tech-row>
              <MarqueeRow items={stackRow} rowRef={rowOneRef} />
            </div>
            <div data-tech-row>
              <MarqueeRow direction="right" items={toolRow} rowRef={rowTwoRef} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3" data-tech-card-grid>
        {focusAreas.map(({ description, icon: Icon, title }) => (
          <div
            className="rounded-[1.75rem] border border-black/8 bg-white/72 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
            data-tech-card
            key={title}
          >
            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-orange-300/25 text-orange-900 dark:bg-orange-300/12 dark:text-orange-100">
              <Icon size={20} />
            </div>
            <h3 className="mb-2 text-xl font-bold tracking-[-0.03em]">{title}</h3>
            <p className="text-sm leading-6 text-black/64 dark:text-white/64">{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
