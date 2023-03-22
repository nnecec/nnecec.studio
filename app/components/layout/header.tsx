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
    label: 'About',
    to: '/about',
  },
]

export const Header = () => {
  const { y } = useWindowScroll()

  return (
    <header
      className={clsx(
        'fixed top-0 z-[999] flex h-[96px] w-screen bg-transparent backdrop-blur',
        y > 50 && 'shadow transition-shadow',
      )}
    >
      <div className="container mx-auto flex items-center justify-end gap-2 text-base">
        {NAV_LINKS.map(({ label, to }) => (
          <div key={to}>
            <NavLink to={to}>
              {({ isActive }) => (
                <motion.div className={clsx('p-3 relative', isActive ? 'text-primary' : undefined)}>
                  {label}

                  {isActive ? (
                    <motion.div
                      className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 -z-10 rounded-md"
                      layoutId="active"
                    />
                  ) : null}
                </motion.div>
              )}
            </NavLink>
          </div>
        ))}
        <ThemeSwitch />
      </div>
    </header>
  )
}
