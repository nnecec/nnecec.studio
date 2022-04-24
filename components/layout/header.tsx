import React from 'react'
import { Container, Link } from '@nextui-org/react'
import NextLink from 'next/link'

import { Logo } from './logo'
import { ThemeSwitch } from './theme-switch'

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-[999] flex h-[96px] w-screen border-b border-gray-50 bg-transparent backdrop-blur">
      <Container display="flex" alignItems="center" justify="space-between">
        <NextLink href="/">
          <a>
            <Logo />
          </a>
        </NextLink>

        <div className="flex gap-2">
          <NextLink href="/posts" passHref>
            <Link block>文章</Link>
          </NextLink>

          <ThemeSwitch />
        </div>
      </Container>
    </header>
  )
}
