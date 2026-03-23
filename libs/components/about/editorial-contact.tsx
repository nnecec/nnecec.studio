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
    href: SITE_CONFIG.social.github,
    icon: IconBrandGithub,
    label: 'GitHub',
    meta: 'github.com/nnecec',
  },
  {
    href: SITE_CONFIG.social.twitter,
    icon: IconBrandTwitter,
    label: 'Twitter / X',
    meta: 'twitter.com/nnecec_cn',
  },
  {
    href: SITE_CONFIG.social.instagram,
    icon: IconBrandInstagram,
    label: 'Instagram',
    meta: 'instagram.com/nnecec',
  },
] as const

export function EditorialContact() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.from('[data-contact-reveal]', {
        duration: 0.95,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.1,
        y: 32,
        scrollTrigger: {
          start: 'top 80%',
          trigger: rootRef.current,
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <section
      className="relative overflow-hidden border-t border-black/10 px-5 pb-12 pt-14 sm:px-6 md:px-8 md:pb-16 dark:border-white/12"
      ref={rootRef}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_18%,rgba(235,184,77,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.28),transparent_60%)] dark:bg-[radial-gradient(circle_at_10%_18%,rgba(183,136,58,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_60%)]" />

      <div className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end" data-contact-reveal>
        <div className="space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/48 dark:text-white/45">
            Contact / final section
          </div>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
            If the work resonates, reach out.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-black/66 md:text-base dark:text-white/62">
            Best channel is email. Social links stay open for quick technical exchange and casual
            notes.
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
        {socialLinks.map(({ href, icon: Icon, label, meta }) => (
          <a
            className="group rounded-[1.3rem] border border-black/10 bg-black/[0.02] p-4 transition hover:-translate-y-1 hover:border-black/18 hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/18 dark:hover:bg-white/[0.05]"
            data-contact-reveal
            href={href}
            key={label}
            rel="noreferrer"
            target="_blank"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex size-9 items-center justify-center rounded-full border border-black/12 bg-white/68 dark:border-white/16 dark:bg-white/[0.04]">
                <Icon size={18} />
              </div>
              <IconArrowRight className="transition group-hover:translate-x-1" size={15} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold">{label}</h3>
              <p className="text-xs text-black/58 dark:text-white/56">{meta}</p>
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
              Scan if you prefer WeChat. This channel is available for direct, async conversations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
