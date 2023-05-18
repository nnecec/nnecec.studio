import { IconBrandGithub, IconBrandTwitter, IconNews } from '@tabler/icons-react'
import Image from 'next/image'

import avatar from '~/core/assets/avatar.webp'
import { SITE_CONFIG } from '~/core/utils/constants'

const { social, author, description } = SITE_CONFIG

const Links = [
  {
    name: 'github.com/nnecec',
    icon: <IconBrandGithub />,
    link: social.github,
  },
  {
    name: 'twitter.com/nnecec_cn',
    icon: <IconBrandTwitter />,
    link: social.twitter,
  },
  {
    name: 'nnecec.zhubai.love',
    icon: <IconNews />,
    link: social.zhubai,
  },
]

export const Footer = () => {
  return (
    <footer className="footer footer-center mt-20 rounded p-10">
      <div className="grid grid-flow-col gap-4">
        <Image
          className="inline-block rounded-full"
          src={avatar}
          alt="avatar"
          width={40}
          height={40}
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
              key={link.name}
              className="link-hover link"
              href={link.link}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
              aria-label={link.name}
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
