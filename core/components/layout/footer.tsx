import { Tooltip } from '@nextui-org/react'
import { IconBrandGithub, IconBrandTwitter, IconNews } from '@tabler/icons-react'
import Image from 'next/image'

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
    <footer className="mt-20 grid grid-flow-row-dense place-items-center gap-4 rounded p-10 text-center">
      <div className="grid grid-flow-col gap-4">
        <Image
          alt="avatar"
          className="inline-block rounded-full"
          height={40}
          src="/assets/avatar.webp"
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
              href={link.link}
              key={link.name}
              referrerPolicy="no-referrer"
              rel="noreferrer"
              target="_blank"
            >
              <Tooltip content={link.name}>
                {link.icon}
              </Tooltip>
            </a>
          ))}
        </div>
      </div>
      <div className="text-center">© 2020-{new Date().getFullYear()}. All rights reserved.</div>
    </footer>
  )
}
