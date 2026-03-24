'use client'

import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const markerPositions = [
  'left-[8%] top-[16%]',
  'left-[20%] top-[62%]',
  'left-[36%] top-[24%]',
  'left-[58%] top-[72%]',
  'left-[72%] top-[34%]',
  'left-[84%] top-[58%]',
] as const

export function EditorialSignalField() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.to('[data-field-orb]', {
        duration: 4.8,
        ease: 'sine.inOut',
        repeat: -1,
        scale: 1.06,
        y: -12,
        yoyo: true,
      })

      gsap.to('[data-field-ring]', { duration: 10, ease: 'none', repeat: -1, rotate: 360 })

      gsap.to('[data-field-sweep="left"]', {
        duration: 7.5,
        ease: 'sine.inOut',
        repeat: -1,
        xPercent: -8,
        yoyo: true,
      })

      gsap.to('[data-field-sweep="right"]', {
        duration: 9.5,
        ease: 'sine.inOut',
        repeat: -1,
        xPercent: 8,
        yoyo: true,
      })

      gsap.to('[data-field-marker]', {
        duration: 3.6,
        ease: 'sine.inOut',
        opacity: 0.26,
        repeat: -1,
        stagger: { each: 0.22, from: 'random', repeat: -1, yoyo: true },
        scale: 1.4,
        yoyo: true,
      })
    },
    { scope: rootRef },
  )

  return (
    <div
      className="relative isolate overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(255,255,255,0.28))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]"
      ref={rootRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(214,171,92,0.34),transparent_24%),radial-gradient(circle_at_72%_78%,rgba(107,85,60,0.18),transparent_28%)] dark:bg-[radial-gradient(circle_at_28%_24%,rgba(214,171,92,0.18),transparent_26%),radial-gradient(circle_at_72%_78%,rgba(133,98,61,0.14),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.08)_1px,transparent_1px),linear-gradient(rgba(17,17,17,0.07)_1px,transparent_1px)] bg-[size:32px_32px] opacity-45 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] dark:opacity-22" />

      <div className="relative aspect-[0.95] min-h-[24rem] md:min-h-[28rem]">
        <div
          className="absolute inset-x-[10%] top-[14%] h-px bg-[linear-gradient(90deg,transparent,rgba(17,17,17,0.4),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]"
          data-field-sweep="left"
        />
        <div
          className="absolute inset-x-[18%] top-[58%] h-px bg-[linear-gradient(90deg,transparent,rgba(17,17,17,0.26),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]"
          data-field-sweep="right"
        />
        <div
          className="absolute inset-[16%] rounded-full border border-black/10 dark:border-white/10"
          data-field-ring
        />
        <div className="absolute inset-[28%] rounded-full border border-black/8 dark:border-white/8" />

        <div
          className="absolute left-1/2 top-[46%] h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/12 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.92),transparent_22%),radial-gradient(circle_at_70%_72%,rgba(0,0,0,0.14),transparent_28%),linear-gradient(160deg,rgba(227,203,160,0.94),rgba(190,160,113,0.78))] shadow-[0_20px_80px_rgba(160,124,62,0.18)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.26),transparent_22%),radial-gradient(circle_at_70%_72%,rgba(0,0,0,0.24),transparent_28%),linear-gradient(160deg,rgba(121,93,55,0.94),rgba(75,57,37,0.72))] dark:shadow-[0_22px_80px_rgba(98,72,31,0.18)]"
          data-field-orb
        />

        {markerPositions.map((position, index) => (
          <div
            className={`absolute ${position} h-2.5 w-2.5 rounded-full bg-black/55 dark:bg-white/62`}
            data-field-marker
            key={index}
          />
        ))}

        <div className="absolute bottom-5 left-5 max-w-[14rem] rounded-[1.25rem] border border-black/10 bg-white/68 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/46 dark:text-white/42">
            Frontend scope
          </div>
          <p className="text-sm leading-6 text-black/66 dark:text-white/62">
            Component architecture, rendering behavior, and interface systems designed to stay
            clear as products scale.
          </p>
        </div>

        <div className="absolute right-5 top-5 rounded-full border border-black/10 bg-white/64 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/48 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-white/48">
          01 / frontend scope
        </div>
      </div>
    </div>
  )
}
