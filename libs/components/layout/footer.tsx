import Image from "next/image"

import { SITE_CONFIG } from "~/libs/utils/constants"

const { author, email, social } = SITE_CONFIG

const descriptor = "Notes on frontend systems, rendering, and interface decisions."

const metadataLinks = [
  { href: social.github, label: "GitHub", type: "external" as const },
  { href: social.twitter, label: "X / Twitter", type: "external" as const },
  { href: `mailto:${email}`, label: email, type: "email" as const }
]

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="page-bleed relative mt-24 overflow-hidden border-t border-black/8 bg-[#f6f4ef] dark:border-white/10 dark:bg-[#0b0b0d]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0)_28%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_26%)]" />

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-10 sm:gap-12 sm:py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(15rem,17rem)] lg:items-end lg:py-14">
          <div className="space-y-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-black/38 dark:text-white/36">
              Colophon
            </div>

            <div className="space-y-4">
              <p className="text-[clamp(3rem,7vw,4.8rem)] font-black leading-[0.92] tracking-[-0.06em] text-black/92 dark:text-white/94">
                {author.name}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-black/64 sm:text-base sm:leading-8 dark:text-white/62">
                {descriptor}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 sm:gap-5 lg:justify-self-end lg:flex-col lg:items-end">
            <Image
              alt={`${author.name} avatar`}
              className="rounded-full border border-black/10 bg-white/55 object-cover dark:border-white/10 dark:bg-white/[0.04]"
              height={52}
              src="/assets/avatar.webp"
              width={52}
            />

            <div className="grid gap-2 text-sm leading-6 text-black/58 dark:text-white/60 lg:text-right">
              {metadataLinks.map((link) => (
                <a
                  className="transition-colors duration-200 hover:text-black/90 focus-visible:text-black/90 focus-visible:underline focus-visible:outline-none dark:hover:text-white/86 dark:focus-visible:text-white/86"
                  href={link.href}
                  key={link.label}
                  referrerPolicy={link.type === "external" ? "no-referrer" : undefined}
                  rel={link.type === "external" ? "noreferrer" : undefined}
                  target={link.type === "external" ? "_blank" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-black/8 py-4 text-xs tracking-[0.04em] text-black/45 dark:border-white/10 dark:text-white/42 sm:py-5">
          {`2020-${year} / nnecec studio / edited and maintained by ${author.name}`}
        </div>
      </div>
    </footer>
  )
}
