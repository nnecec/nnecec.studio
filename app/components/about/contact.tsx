import { Link } from '@remix-run/react'
import {
  IconBookmarks,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWechat,
  IconMail,
} from '@tabler/icons-react'

import telegramJPG from '~/assets/telegram.webp'
import wechatJPG from '~/assets/wechat.webp'
import { SITE_CONFIG } from '~/utils/constants'

export const Contact = () => {
  return (
    <div className="container relative mx-auto">
      <div className="h-screen">
        <div className="flex h-screen items-center justify-center">
          <div className="">
            <h2 className="mb-8 text-center text-7xl">Find me.</h2>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              <button className="btn" aria-label="email">
                <Link to={`mailto:${SITE_CONFIG.email}`}>
                  <IconMail />
                </Link>
              </button>

              <button className="btn" aria-label="github">
                <Link to={SITE_CONFIG.social.github} target="_blank">
                  <IconBrandGithub />
                </Link>
              </button>

              <label htmlFor="my-modal" className="btn" aria-label="wechat">
                <IconBrandWechat />
              </label>
              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <label htmlFor="my-modal" className="modal cursor-pointer">
                <label className="modal-box relative w-[200px]" htmlFor="">
                  <img src={wechatJPG} alt="wechat_qrcode" width={200} height={200} />
                </label>
              </label>

              <button className="btn" aria-label="twitter">
                <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noreferrer">
                  <IconBrandTwitter />
                </a>
              </button>

              <button className="btn" aria-label="instagram">
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noreferrer">
                  <IconBrandInstagram />
                </a>
              </button>

              <label htmlFor="telegram-modal" className="btn" aria-label="telegram">
                <IconBrandTelegram />
              </label>

              <button className="btn" aria-label="bento">
                <a href={SITE_CONFIG.social.bento} target="_blank" rel="noreferrer">
                  <IconBookmarks />
                </a>
              </button>

              <input type="checkbox" id="telegram-modal" className="modal-toggle" />
              <label htmlFor="telegram-modal" className="modal cursor-pointer">
                <label className="modal-box relative w-[200px]" htmlFor="">
                  <img src={telegramJPG} alt="telegram_qrcode" width={200} height={200} />
                </label>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
