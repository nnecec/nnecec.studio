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

import { SITE_CONFIG } from '~/utils/constants'

import telegramJPG from './telegram.jpg'
import wechatJPG from './wechat.jpg'

export const Contact = () => {
  return (
    <div className="container relative mx-auto">
      <div className="h-screen">
        <div className="flex h-screen items-center justify-center">
          <div className="">
            <h2 className="mb-8 text-center text-7xl">Find me.</h2>
            <div className="flex justify-center gap-4 text-center">
              <button className="btn">
                <Link to={`mailto:${SITE_CONFIG.email}`}>
                  <IconMail />
                </Link>
              </button>

              <button className="btn">
                <Link to={SITE_CONFIG.social.github} target="_blank">
                  <IconBrandGithub />
                </Link>
              </button>

              <label htmlFor="my-modal" className="btn">
                <IconBrandWechat />
              </label>
              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <label htmlFor="my-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <img src={wechatJPG} alt="wechat_qrcode" />
                </label>
              </label>

              <button className="btn">
                <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noreferrer">
                  <IconBrandTwitter />
                </a>
              </button>

              <button className="btn">
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noreferrer">
                  <IconBrandInstagram />
                </a>
              </button>

              <label htmlFor="telegram-modal" className="btn">
                <IconBrandTelegram />
              </label>

              <button className="btn">
                <a href={SITE_CONFIG.social.bento} target="_blank" rel="noreferrer">
                  <IconBookmarks />
                </a>
              </button>

              <input type="checkbox" id="telegram-modal" className="modal-toggle" />
              <label htmlFor="telegram-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <img src={telegramJPG} alt="telegram_qrcode" />
                </label>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
