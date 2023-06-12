import { IconBrandGithub, IconBrandTwitter, IconNews } from '@tabler/icons-react'
import Image from 'next/image'

import avatar from '~/core/assets/avatar.webp'
import { SITE_CONFIG } from '~/core/utils/constants'

const { author, description, social } = SITE_CONFIG

const Links = [
  {
    icon: <IconBrandGithub />,
    link: social.github,
    name: 'github.com/nnecec',
  },
  {
    icon: <IconBrandTwitter />,
    link: social.twitter,
    name: 'twitter.com/nnecec_cn',
  },
  {
    icon: <IconNews />,
    link: social.zhubai,
    name: 'nnecec.zhubai.love',
  },
]

export const Footer = () => {
  return (
    <footer className="footer footer-center mt-20 rounded p-10">
      <div className="grid grid-flow-col gap-4">
        <Image
          alt="avatar"
          className="inline-block rounded-full"
          height={40}
          src={avatar}
          width={40}
        />
        <div className="text-left">
          {author.name}
          <br />
          {description}
        </div>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          {Links.map(link => (
            <a
              aria-label={link.name}
              className="link-hover link"
              href={link.link}
              key={link.name}
              referrerPolicy="no-referrer"
              rel="noreferrer"
              target="_blank"
            >
              <div className="tooltip" data-tip={link.name}>
                {link.icon}
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="text-center">© 2020-{new Date().getFullYear()}. All rights reserved.</div>
    </footer>
  )
}
