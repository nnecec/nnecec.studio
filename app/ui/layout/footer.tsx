import { SITE_CONFIG } from '~/utils/constants'
import { GitHub, Twitter, Notes } from 'iconoir-react'
import avatar from '~/assets/avatar.jpg'

const { author, description } = SITE_CONFIG

const Links = [
  {
    name: 'github.com/nnecec',
    icon: <GitHub />,
    link: 'https://github.com/nnecec/nnecec.github.io'
  },
  {
    name: 'twitter.com/nnecec_cn',
    icon: <Twitter />,
    link: 'https://twitter.com/nnecec_cn'
  },
  {
    name: 'nnecec.zhubai.love',
    icon: <Notes />,
    link: 'https://nnecec.zhubai.love/'
  }
]

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
          {Links.map(link=> <a
            className="link-hover link"
            href={link.link}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noreferrer"
          >
            <div className="tooltip" data-tip={link.name}>
              {link.icon}
            </div>
          </a>)}
        </div>
      </div>
      <div className="text-center">
        © 2020-{new Date().getFullYear()} nnecec. All rights reserved.
      </div>
    </footer>
  )
}
