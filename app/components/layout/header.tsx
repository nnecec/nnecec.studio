import { NavLink } from '@remix-run/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { useWindowScroll } from '~/hooks/window-scroll'

import { ThemeSwitch } from '../theme/switch'

const NAV_LINKS = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Posts',
    to: '/posts',
  },
  {
    label: 'Projects',
    to: '/projects',
  },
  {
    label: 'About',
    to: '/about',
  },
]

export const Header = () => {
  const { y } = useWindowScroll()

  return (
    <header
      className={clsx(
        `h-header fixed top-0 z-[999] flex w-screen bg-transparent backdrop-blur`,
        y > 50 && 'shadow transition-shadow',
      )}
    >
      <div className="container relative mx-auto flex items-center justify-end gap-2 text-base">
        {NAV_LINKS.map(({ label, to }) => (
          <div key={to}>
            <NavLink to={to}>
              {({ isActive }) => (
                <div className={clsx('relative p-3', isActive && 'text-primary')}>
                  {label}

                  {isActive ? (
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-md bg-neutral-200 dark:bg-neutral-800"
                      layoutId="active"
                    />
                  ) : null}
                </div>
              )}
            </NavLink>
          </div>
        ))}
        <ThemeSwitch />
      </div>
    </header>
  )
}
