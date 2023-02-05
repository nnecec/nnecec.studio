import { SITE_CONFIG } from '~/utils/constants'
import { IconBrandGithub, IconBrandTwitter, IconNews } from '@tabler/icons-react'
import avatar from '~/assets/avatar.jpg'

const { author, description } = SITE_CONFIG

const Links = [
  {
    name: 'github.com/nnecec',
    icon: <IconBrandGithub />,
    link: SITE_CONFIG.social.github,
  },
  {
    name: 'twitter.com/nnecec_cn',
    icon: <IconBrandTwitter />,
    link: SITE_CONFIG.social.twitter,
  },
  {
    name: 'nnecec.zhubai.love',
    icon: <IconNews />,
    link: SITE_CONFIG.social.zhubai,
  },
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
          {Links.map(link => (
            <a
              key={link.name}
              className="link-hover link"
              href={link.link}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <div className="tooltip" data-tip={link.name}>
                {link.icon}
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="text-center">
        © 2020-{new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  )
}
