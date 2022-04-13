import React from 'react'
import { Container, Link } from '@nextui-org/react'
import { SITE_CONFIG } from '../../utils/constants'
import NextLink from 'next/link'
import { ThemeSwitch } from './theme-switch'

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 z-[999] w-screen border-b border-gray-50 bg-transparent backdrop-blur">
      <Container display="flex" alignItems="center" justify="space-between">
        <h1>
          <NextLink href="/">{SITE_CONFIG.title}</NextLink>
        </h1>

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