'use client'

import { useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useGSAP } from '@gsap/react'
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconMail,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Button } from '~/libs/ui'
import { SITE_CONFIG } from '~/libs/utils/constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const socialLinks = [
  {
    accentClass:
      'border-black/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72))] hover:border-black/18 hover:shadow-[0_24px_52px_rgba(17,17,17,0.1)] dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] dark:hover:border-white/18 dark:hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]',
    href: SITE_CONFIG.social.github,
    highlightClass:
      'bg-[linear-gradient(90deg,transparent,rgba(17,17,17,0.12),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]',
    icon: IconBrandGithub,
    iconClass:
      'border-black/10 bg-white text-black/82 shadow-[0_6px_16px_rgba(17,17,17,0.08)] dark:border-white/14 dark:bg-white/[0.08] dark:text-white/86 dark:shadow-none',
    label: 'GitHub',
    meta: 'github.com/nnecec',
    metaClass: 'text-black/62 dark:text-white/58',
  },
  {
    accentClass:
      'border-sky-700/14 bg-[linear-gradient(180deg,rgba(240,247,255,0.96),rgba(229,240,255,0.78))] hover:border-sky-700/22 hover:shadow-[0_24px_52px_rgba(45,101,169,0.14)] dark:border-sky-300/18 dark:bg-[linear-gradient(180deg,rgba(108,153,214,0.15),rgba(255,255,255,0.03))] dark:hover:border-sky-200/28 dark:hover:bg-[linear-gradient(180deg,rgba(125,170,229,0.2),rgba(255,255,255,0.04))]',
    href: SITE_CONFIG.social.twitter,
    highlightClass:
      'bg-[linear-gradient(90deg,transparent,rgba(34,87,156,0.18),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(125,170,229,0.24),transparent)]',
    icon: IconBrandTwitter,
    iconClass:
      'border-sky-700/12 bg-white/88 text-sky-950 shadow-[0_6px_16px_rgba(45,101,169,0.12)] dark:border-sky-200/16 dark:bg-sky-300/12 dark:text-sky-50 dark:shadow-none',
    label: 'Twitter / X',
    meta: 'twitter.com/nnecec_cn',
    metaClass: 'text-sky-950/72 dark:text-sky-100/68',
  },
  {
    accentClass:
      'border-amber-800/14 bg-[linear-gradient(180deg,rgba(255,246,239,0.96),rgba(255,236,225,0.8))] hover:border-amber-800/22 hover:shadow-[0_24px_52px_rgba(170,92,35,0.14)] dark:border-orange-200/16 dark:bg-[linear-gradient(180deg,rgba(177,104,60,0.18),rgba(255,255,255,0.03))] dark:hover:border-orange-100/24 dark:hover:bg-[linear-gradient(180deg,rgba(195,115,69,0.22),rgba(255,255,255,0.04))]',
    href: SITE_CONFIG.social.instagram,
    highlightClass:
      'bg-[linear-gradient(90deg,transparent,rgba(170,92,35,0.18),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,183,131,0.22),transparent)]',
    icon: IconBrandInstagram,
    iconClass:
      'border-amber-800/12 bg-white/88 text-amber-950 shadow-[0_6px_16px_rgba(170,92,35,0.12)] dark:border-orange-100/16 dark:bg-orange-200/12 dark:text-orange-50 dark:shadow-none',
    label: 'Instagram',
    meta: 'instagram.com/nnecec',
    metaClass: 'text-amber-950/72 dark:text-orange-100/68',
  },
] as const

export function EditorialContact() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.fromTo(
        '[data-contact-reveal]',
        { opacity: 0, y: 32 },
        {
          clearProps: 'opacity,transform',
          duration: 0.95,
          ease: 'power3.out',
          opacity: 1,
          stagger: 0.1,
          y: 0,
          scrollTrigger: { start: 'top 80%', trigger: rootRef.current },
        },
      )
    },
    { scope: rootRef },
  )

  return (
    <section
      className="relative overflow-hidden border-t border-black/10 px-5 pb-12 pt-14 sm:px-6 md:px-8 md:pb-16 dark:border-white/12"
      ref={rootRef}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_18%,rgba(235,184,77,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.28),transparent_60%)] dark:bg-[radial-gradient(circle_at_10%_18%,rgba(183,136,58,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_60%)]" />

      <div
        className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
        data-contact-reveal
      >
        <div className="space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/48 dark:text-white/45">
            Contact / collaboration
          </div>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
            Open to senior frontend roles, platform-heavy product work, and teams that care about
            engineering quality.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-black/66 md:text-base dark:text-white/62">
            Email is the best channel for roles or collaboration involving frontend architecture,
            design systems, performance, or complex UI delivery.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button asChild className="h-11 rounded-full px-6 text-sm font-semibold">
            <Link href={`mailto:${SITE_CONFIG.email}`}>
              <IconMail size={16} />
              {SITE_CONFIG.email}
            </Link>
          </Button>
          <Button
            asChild
            className="h-11 rounded-full border-black/12 bg-transparent px-5 text-sm font-semibold hover:bg-black/5 dark:border-white/14 dark:hover:bg-white/8"
            variant="outline"
          >
            <a href={SITE_CONFIG.social.bento} rel="noreferrer" target="_blank">
              Bento profile
              <IconArrowRight size={16} />
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_1.06fr]">
        {socialLinks.map(({ accentClass, highlightClass, href, icon: Icon, iconClass, label, meta, metaClass }) => (
          <a
            className={`group relative overflow-hidden rounded-[1.3rem] border p-4 opacity-100 shadow-[0_18px_40px_rgba(17,17,17,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 dark:shadow-[0_18px_44px_rgba(0,0,0,0.32)] ${accentClass}`}
            data-contact-reveal
            href={href}
            key={label}
            rel="noreferrer"
            target="_blank"
          >
            <div className={`absolute inset-x-0 top-0 h-px ${highlightClass}`} />
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className={`flex size-9 items-center justify-center rounded-full border ${iconClass}`}>
                <Icon size={18} />
              </div>
              <IconArrowRight
                className="text-black/58 transition group-hover:translate-x-1 dark:text-white/58"
                size={15}
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-black/90 dark:text-white/88">{label}</h3>
              <p className={`text-xs ${metaClass}`}>{meta}</p>
            </div>
          </a>
        ))}

        <div
          className="rounded-[1.4rem] border border-black/10 bg-[#fffdf8] p-4 dark:border-white/10 dark:bg-[#141416]"
          data-contact-reveal
        >
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-black/52 dark:text-white/48">
            WeChat
          </div>
          <div className="grid gap-4 sm:grid-cols-[7.5rem_1fr] sm:items-center">
            <div className="relative aspect-square overflow-hidden rounded-[1rem] border border-black/10 bg-white p-2 dark:border-white/12 dark:bg-white/[0.04]">
              <Image
                alt="WeChat QR code"
                className="object-contain"
                fill
                sizes="(min-width: 640px) 120px, 96px"
                src="/assets/wechat.webp"
              />
            </div>
            <p className="text-xs leading-6 text-black/62 dark:text-white/62">
              Use WeChat if that is easier for async discussion about roles, projects, or technical
              collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
