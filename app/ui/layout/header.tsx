import { Link } from '@remix-run/react'

import { ThemeSwitch } from './theme-switch'

export const Header = () => {
  return (
    <header className="fixed top-0 z-[999] flex h-[96px] w-screen bg-transparent backdrop-blur">
      <div className="container mx-auto flex items-center justify-end gap-4 px-4">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/about">About</Link>
        <ThemeSwitch />
      </div>
    </header>
  )
}
