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

  const isActive = (path: string) => (path === '/' && pathname === path) || (path !== '/' && pathname.startsWith(path))

  return (
    <motion.header className="fixed top-0 z-[999] flex h-header w-screen">
      <div className="container relative mx-auto flex items-center justify-center">
        <div className="flex items-center justify-end gap-4 rounded-full border border-black/10 bg-zinc-100/5 px-6 py-2 text-base backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
          {NAV_LINKS.map(({ label, value }) => (
            <Link className={clsx(isActive(value) && 'text-primary')} href={value} key={value}>
              <button className="font-bold">{label}</button>
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </motion.header>
  )
}
