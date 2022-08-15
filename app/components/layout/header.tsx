import React from 'react'
import { Link } from '@remix-run/react'

import { ThemeSwitch } from './theme-switch'

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-[999] flex h-[96px] w-screen bg-transparent backdrop-blur">
      <div className="container mx-auto flex items-center justify-end gap-4">
        <Link to="/">主页</Link>

        <Link to="/posts">文章</Link>

        <ThemeSwitch />
      </div>
    </header>
  )
}