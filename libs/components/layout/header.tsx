'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ThemeSwitch } from '../theme/switch'

const NAV_LINKS = [
  { label: 'Home', value: '/' },
  { label: 'Posts', value: '/posts' },
  { label: 'About', value: '/about' },
]

export const Header = () => {
  const pathname = usePathname()

  const isActive = (path: string) =>
    (path === '/' && pathname === path) || (path !== '/' && pathname.startsWith(path))

  return (
    <motion.header className="fixed inset-x-0 top-0 z-999 flex h-header">
      <div className="container relative mx-auto flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-black/10 bg-zinc-100/40 px-5 py-2 text-sm backdrop-blur-lg dark:border-white/10 dark:bg-white/6 sm:text-base">
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
