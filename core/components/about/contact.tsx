'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button, Tooltip } from '@nextui-org/react'
import {
  IconBookmarks,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWechat,
  IconMail,
} from '@tabler/icons-react'

import { SITE_CONFIG } from '~/core/utils/constants'

export const Contact = () => {
  return (
    <div className="container relative mx-auto">
      <div className="h-screen">
        <div className="flex h-screen items-center justify-center">
          <div className="">
            <h2 className="mb-8 text-center text-7xl">Find me.</h2>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              <Button aria-label="email" as="a" className="cursor-pointer" isIconOnly variant="light">
                <Link href={`mailto:${SITE_CONFIG.email}`}>
                  <IconMail />
                </Link>
              </Button>

              <Button
                aria-label="github"
                as="a"
                className="cursor-pointer"
                href={SITE_CONFIG.social.github}
                isIconOnly
                rel="noreferrer"
                target="_blank"
                variant="light"
              >
                <IconBrandGithub />
              </Button>

              <Tooltip content={<Image alt="wechat_qrcode" height={160} src="/assets/wechat.webp" width={160} />}>
                <Button isIconOnly variant="light">
                  <IconBrandWechat />
                </Button>
              </Tooltip>

              <Button
                aria-label="twitter"
                as="a"
                className="cursor-pointer"
                href={SITE_CONFIG.social.twitter}
                isIconOnly
                rel="noreferrer"
                target="_blank"
                variant="light"
              >
                <IconBrandTwitter />
              </Button>

              <Button
                aria-label="instagram"
                as="a"
                className="cursor-pointer"
                href={SITE_CONFIG.social.instagram}
                isIconOnly
                rel="noreferrer"
                target="_blank"
                variant="light"
              >
                <IconBrandInstagram />
              </Button>

              <Tooltip content={<Image alt="telegram_qrcode" height={160} src="/assets/telegram.webp" width={160} />}>
                <Button isIconOnly variant="light">
                  <IconBrandTelegram />
                </Button>
              </Tooltip>

              <Button
                aria-label="bento"
                as="a"
                className="cursor-pointer"
                href={SITE_CONFIG.social.bento}
                isIconOnly
                rel="noreferrer"
                target="_blank"
                variant="light"
              >
                <IconBookmarks />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
