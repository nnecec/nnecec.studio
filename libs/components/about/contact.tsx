'use client'

import { useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useGSAP } from '@gsap/react'
import {
  IconArrowRight,
  IconBookmarks,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWechat,
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
  { href: SITE_CONFIG.social.bento, icon: IconBookmarks, label: 'Bento', meta: 'bento.me/nnecec' },
]

const qrCards = [
  { icon: IconBrandWechat, image: '/assets/wechat.webp', label: 'WeChat' },
  { icon: IconBrandTelegram, image: '/assets/telegram.webp', label: 'Telegram' },
]

export const Contact = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.from('[data-contact-heading], [data-contact-copy], [data-contact-cta]', {
        duration: 0.85,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.1,
        y: 28,
      })

      gsap.from('[data-contact-card]', {
        duration: 0.85,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.1,
        y: 40,
        scrollTrigger: { start: 'top 82%', trigger: rootRef.current },
      })
    },
    { scope: rootRef },
  )

  return (
    <div className="relative overflow-hidden py-14 md:py-20" ref={rootRef}>
      <div className="absolute bottom-0 left-[-6rem] -z-10 size-56 rounded-full bg-orange-300/15 blur-3xl dark:bg-orange-300/10" />
      <div className="grid gap-8 xl:grid-cols-[1fr_1.05fr]">
        <div className="space-y-5">
          <div
            className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45"
            data-contact-heading
          >
            Contact / presence
          </div>
          <h2
            className="max-w-xl text-3xl font-black tracking-[-0.04em] md:text-5xl"
            data-contact-heading
          >
            The easiest way to reach me is still a direct message or an email.
          </h2>
          <p
            className="max-w-xl text-base leading-7 text-black/65 dark:text-white/65"
            data-contact-copy
          >
            If you want to talk about frontend architecture, developer tooling, performance, or just
            exchange notes on engineering tradeoffs, feel free to reach out.
          </p>

          <div data-contact-cta>
            <Button asChild className="h-11 rounded-full px-6 text-sm font-semibold">
              <Link href={`mailto:${SITE_CONFIG.email}`}>
                Send email
                <IconArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {socialLinks.map(({ href, icon: Icon, label, meta }) => (
            <a
              className="group rounded-[1.6rem] border border-black/8 bg-black/[0.02] p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-black/15 hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/18 dark:hover:bg-white/[0.05]"
              data-contact-card
              href={href}
              key={label}
              rel="noreferrer"
              target="_blank"
            >
              <div className="mb-10 flex items-start justify-between gap-4">
                <div className="flex size-11 items-center justify-center rounded-full bg-amber-300/25 text-amber-900 dark:bg-amber-300/12 dark:text-amber-100">
                  <Icon size={20} />
                </div>
                <IconArrowRight
                  className="transition-transform duration-150 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={16}
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">{label}</h3>
                <p className="text-sm text-black/58 dark:text-white/58">{meta}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {qrCards.map(({ icon: Icon, image, label }) => (
          <div
            className="rounded-[1.75rem] border border-black/8 bg-[#faf7ef] p-5 dark:border-white/10 dark:bg-[#151515]"
            data-contact-card
            key={label}
          >
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-black/78 dark:text-white/78">
              <div className="flex size-10 items-center justify-center rounded-full border border-black/8 bg-white/70 dark:border-white/10 dark:bg-white/[0.04]">
                <Icon size={18} />
              </div>
              {label}
            </div>
            <div className="grid gap-5 sm:grid-cols-[10rem_1fr] sm:items-center">
              <div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-white p-3">
                <Image alt={`${label} QR code`} className="object-contain" fill src={image} />
              </div>
              <p className="text-sm leading-6 text-black/62 dark:text-white/62">
                Prefer scanning? You can also reach me on {label}. I keep these channels available
                for casual conversations and developer networking.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
