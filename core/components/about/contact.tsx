'use client'
import {
  IconBookmarks,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWechat,
  IconMail,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import telegramJPG from '~/core/assets/telegram.webp'
import wechatJPG from '~/core/assets/wechat.webp'
import { SITE_CONFIG } from '~/core/utils/constants'

export const Contact = () => {
  return (
    <div className="container relative mx-auto">
      <div className="h-screen">
        <div className="flex h-screen items-center justify-center">
          <div className="">
            <h2 className="mb-8 text-center text-7xl">Find me.</h2>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              <button aria-label="email" className="btn">
                <Link href={`mailto:${SITE_CONFIG.email}`}>
                  <IconMail />
                </Link>
              </button>

              <button aria-label="github" className="btn">
                <Link href={SITE_CONFIG.social.github} target="_blank">
                  <IconBrandGithub />
                </Link>
              </button>

              <label aria-label="wechat" className="btn" htmlFor="my-modal">
                <IconBrandWechat />
              </label>
              <input className="modal-toggle" id="my-modal" type="checkbox" />
              <label className="modal cursor-pointer" htmlFor="my-modal">
                <label className="modal-box relative w-[200px]" htmlFor="">
                  <Image alt="wechat_qrcode" height={200} src={wechatJPG} width={200} />
                </label>
              </label>

              <button aria-label="twitter" className="btn">
                <a href={SITE_CONFIG.social.twitter} rel="noreferrer" target="_blank">
                  <IconBrandTwitter />
                </a>
              </button>

              <button aria-label="instagram" className="btn">
                <a href={SITE_CONFIG.social.instagram} rel="noreferrer" target="_blank">
                  <IconBrandInstagram />
                </a>
              </button>

              <label aria-label="telegram" className="btn" htmlFor="telegram-modal">
                <IconBrandTelegram />
              </label>

              <button aria-label="bento" className="btn">
                <a href={SITE_CONFIG.social.bento} rel="noreferrer" target="_blank">
                  <IconBookmarks />
                </a>
              </button>

              <input className="modal-toggle" id="telegram-modal" type="checkbox" />
              <label className="modal cursor-pointer" htmlFor="telegram-modal">
                <label className="modal-box relative w-[200px]" htmlFor="">
                  <Image alt="telegram_qrcode" height={200} src={telegramJPG} width={200} />
                </label>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
