'use client'

import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { editorialExtendedPractice, editorialNotes } from './editorial-data'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function EditorialNotes() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.from('[data-notes-reveal]', {
        duration: 0.85,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.12,
        y: 24,
        scrollTrigger: { start: 'top 82%', trigger: rootRef.current },
      })
    },
    { scope: rootRef },
  )

  return (
    <section
      className="border-t border-black/10 px-5 py-12 sm:px-6 md:px-8 dark:border-white/12"
      ref={rootRef}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-3" data-notes-reveal>
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/48 dark:text-white/44">
            Engineering principles
          </div>
          <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            The value of a senior frontend engineer is judgment: where to keep flexibility, where
            to add structure, and where to reduce complexity before it spreads.
          </h2>
        </div>

        <div className="space-y-6">
          {editorialNotes.map(note => (
            <div
              className="border-l border-black/12 pl-4 md:pl-5 dark:border-white/16"
              data-notes-reveal
              key={note.label}
            >
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/46">
                {note.label}
              </div>
              <p className="max-w-2xl text-sm leading-6 text-black/66 dark:text-white/62">
                {note.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-black/10 pt-6 dark:border-white/12" data-notes-reveal>
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-black/46 dark:text-white/44">
          Broader technical surface area
        </div>
        <div className="flex flex-wrap gap-2.5">
          {editorialExtendedPractice.map(item => (
            <span
              className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-medium tracking-[0.02em] text-black/74 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/72"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
