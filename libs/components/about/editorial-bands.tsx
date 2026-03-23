'use client'

import { useRef, type RefObject } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { editorialBands } from './editorial-data'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function BandRow({
  items,
  rowRef,
}: {
  items: readonly string[]
  rowRef: RefObject<HTMLDivElement | null>
}) {
  const repeated = [...items, ...items]

  return (
    <div className="overflow-hidden rounded-full border border-black/10 bg-black/[0.03] py-2 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex w-max gap-2.5 whitespace-nowrap px-2 will-change-transform" ref={rowRef}>
        {repeated.map((item, index) => (
          <span
            className="rounded-full border border-black/10 bg-white/72 px-3 py-1.5 text-xs font-semibold tracking-[0.02em] text-black/74 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/74"
            key={`${item}-${index}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function EditorialBands() {
  const rootRef = useRef<HTMLDivElement>(null)
  const rowOneRef = useRef<HTMLDivElement>(null)
  const rowTwoRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = [
          { duration: 24, ref: rowOneRef, start: 0, end: -1 },
          { duration: 20, ref: rowTwoRef, start: -0.5, end: 0.5 },
        ]

        rows.forEach(({ duration, end, ref, start }) => {
          const row = ref.current
          if (!row) {
            return
          }

          const distance = row.scrollWidth / 2
          gsap.fromTo(
            row,
            { x: distance * start },
            { duration, ease: 'none', repeat: -1, x: distance * end },
          )
        })

        gsap.from('[data-bands-reveal]', {
          duration: 0.75,
          ease: 'power3.out',
          opacity: 0,
          stagger: 0.08,
          y: 20,
          scrollTrigger: {
            start: 'top 82%',
            trigger: rootRef.current,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="border-t border-black/10 px-5 py-10 sm:px-6 md:px-8 dark:border-white/12" ref={rootRef}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3" data-bands-reveal>
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/48 dark:text-white/45">
            Stack signals
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            Technologies in active rotation.
          </h2>
        </div>
        <p className="max-w-[30rem] text-sm leading-6 text-black/62 dark:text-white/62">
          Grouped by practice so the stack reads as working context instead of inventory.
        </p>
      </div>

      <div className="space-y-3">
        <div data-bands-reveal>
          <BandRow items={editorialBands.coreFrontend} rowRef={rowOneRef} />
        </div>
        <div data-bands-reveal>
          <BandRow items={editorialBands.systemsAndTooling} rowRef={rowTwoRef} />
        </div>
      </div>
    </section>
  )
}
