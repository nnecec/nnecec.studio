'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()

  return (
    <motion.header
      className="h-header fixed top-0 z-[999] flex w-screen"
    >
      <div className="container relative mx-auto flex items-center justify-end">
        <div className="flex items-center justify-end gap-4 rounded-full border border-black/10 bg-zinc-100/5 px-6 py-2 text-base backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
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
              <button className="font-bold">{label}</button>
            </Link>
          ))}
          <ThemeSwitch />
        </div>

      </div>
    </motion.header>
  )
}
