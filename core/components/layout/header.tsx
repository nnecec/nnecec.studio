'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useWindowScroll } from '~/core/hooks/window-scroll'

import { ThemeSwitch } from '../theme/switch'

const NAV_LINKS = [
  {
    label: 'Home',
    value: '/',
  },
  {
    label: 'Posts',
    value: '/posts',
  },
  {
    label: 'About',
    value: '/about',
  },
]

export const Header = () => {
  const { y } = useWindowScroll()
  const pathname = usePathname()

  return (
    <motion.header
      className={clsx(
        `h-header fixed top-0 z-[999] flex w-screen bg-transparent backdrop-blur`,
        y > 50 && 'shadow transition-shadow',
      )}
    >
      <div className="container relative mx-auto flex items-center justify-end gap-4 text-base font-bold">
        {NAV_LINKS.map(({ label, value }) => (
          <Link
            href={value}
            key={value}
            className={clsx(
              ((value === '/' && pathname === value) ||
                (value !== '/' && pathname.startsWith(value))) &&
                'text-primary',
            )}
          >
            {label}
          </Link>
        ))}
        <ThemeSwitch />
      </div>
    </motion.header>
  )
}
