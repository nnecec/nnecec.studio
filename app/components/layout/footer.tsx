import { SITE_CONFIG } from '~/utils/constants'
import { GitHub, Twitter, Notes } from 'iconoir-react'
import avatar from '~/assets/avatar.jpg'

const { author, description } = SITE_CONFIG

export const Footer = () => {
  return (
    <footer className="footer footer-center mt-20 rounded p-10">
      <div className="grid grid-flow-col gap-4">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={avatar}
          alt="avatar"
        />
        <div className="text-left">
          {author.name}
          <br />
          {description}
        </div>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a
            className="link link-hover"
            href="https://github.com/nnecec/nnecec.github.io"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noreferrer"
          >
            <div className="tooltip" data-tip="github.com/nnecec">
              <GitHub />
            </div>
          </a>
          <a
            href="https://twitter.com/nnecec_cn"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noreferrer"
          >
            <div className="tooltip" data-tip="twitter.com/nnecec_cn">
              <Twitter />
            </div>
          </a>
          <a
            href="https://nnecec.zhubai.love/"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noreferrer"
          >
            <div className="tooltip" data-tip="nnecec.zhubai.love">
              <Notes />
            </div>
          </a>
        </div>
      </div>
      <div className="text-center">
        © 2020-{new Date().getFullYear()} nnecec. All rights reserved.
      </div>
    </footer>
  )
}
