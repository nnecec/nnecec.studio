'use client'

import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { editorialCapabilities } from './editorial-data'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function EditorialCapabilities() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.from('[data-capability-row]', {
        duration: 0.8,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.12,
        x: 24,
        scrollTrigger: {
          start: 'top 82%',
          trigger: rootRef.current,
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <section className="border-t border-black/10 px-5 py-10 sm:px-6 md:px-8 dark:border-white/12" ref={rootRef}>
      <div className="mb-7 space-y-2">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/48 dark:text-white/45">
          Capability map
        </div>
        <h2 className="max-w-3xl text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Tools matter, but the system-level decisions around those tools matter more.
        </h2>
      </div>

      <div className="space-y-0 border-y border-black/10 dark:border-white/12">
        {editorialCapabilities.map((group, index) => (
          <article
            className="grid gap-5 border-b border-black/10 py-6 last:border-b-0 md:grid-cols-[13rem_1fr] md:gap-7 md:py-7 lg:grid-cols-[15rem_1fr]"
            data-capability-row
            key={group.title}
          >
            <div className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/44 dark:text-white/42">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-black/88 dark:text-white/86">
                {group.title}
              </h3>
            </div>

            <div className="space-y-4">
              <p className="max-w-3xl text-sm leading-6 text-black/66 dark:text-white/64">
                {group.description}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span
                    className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-medium tracking-[0.02em] text-black/74 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/74"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
