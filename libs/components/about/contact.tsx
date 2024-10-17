'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  IconBookmarks,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWechat,
  IconMail,
} from '@tabler/icons-react'

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/libs/ui'
import { SITE_CONFIG } from '~/libs/utils/constants'

export const Contact = () => {
  return (
    <div className="container relative mx-auto">
      <div className="h-screen">
        <div className="flex h-screen items-center justify-center">
          <div className="">
            <h2 className="mb-8 text-center text-7xl">Find me.</h2>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              <TooltipProvider delayDuration={0}>
                <Button
                  aria-label="email"
                  asChild
                  className="cursor-pointer"
                  size="icon"
                  variant="ghost"
                >
                  <Link href={`mailto:${SITE_CONFIG.email}`}>
                    <IconMail />
                  </Link>
                </Button>

                <Button aria-label="github" asChild size="icon" variant="ghost">
                  <a href={SITE_CONFIG.social.github} rel="noreferrer" target="_blank">
                    <IconBrandGithub />
                  </a>
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <IconBrandWechat />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Image alt="wechat_qrcode" height={160} src="/assets/wechat.webp" width={160} />
                  </TooltipContent>
                </Tooltip>

                <Button aria-label="twitter" asChild size="icon" variant="ghost">
                  <a href={SITE_CONFIG.social.twitter} rel="noreferrer" target="_blank">
                    <IconBrandTwitter />
                  </a>
                </Button>

                <Button aria-label="instagram" asChild size="icon" variant="ghost">
                  <a href={SITE_CONFIG.social.instagram} rel="noreferrer" target="_blank">
                    <IconBrandInstagram />
                  </a>
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <IconBrandTelegram />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Image
                      alt="telegram_qrcode"
                      height={160}
                      src="/assets/telegram.webp"
                      width={160}
                    />
                  </TooltipContent>
                </Tooltip>

                <Button aria-label="bento" asChild size="icon" variant="ghost">
                  <a href={SITE_CONFIG.social.bento} rel="noreferrer" target="_blank">
                    <IconBookmarks />
                  </a>
                </Button>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
