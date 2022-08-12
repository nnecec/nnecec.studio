import type { PropsWithChildren } from 'react'

import { SITE_CONFIG } from '~/utils/constants'

import { Footer } from './footer'
import { Header } from './header'

type Props = {
  preview?: boolean
  title?: string
  className?: string
}

export const Layout = ({
  children,
  title = SITE_CONFIG.title,
  className
}: PropsWithChildren<Props>) => {
  return (
    <>
      <Header />
      <main className="container mx-auto min-h-screen pt-[96px]">
        <div className={className}>{children}</div>
      </main>
      <Footer />
    </>
  )
}
