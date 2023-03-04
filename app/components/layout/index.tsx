import type { PropsWithChildren } from 'react'

import { SITE_CONFIG } from '~/utils/constants'

import { Footer } from './footer'
import { Header } from './header'

type Props = {
  preview?: boolean
  title?: string
  className?: string
  container?: boolean
}

export const Layout = ({
  children,
  title = SITE_CONFIG.title,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <Header />
      <main className="container mx-auto min-h-screen px-4 pt-[96px] md:px-0">
        <div className={className}>{children}</div>
      </main>
      <Footer />
    </>
  )
}
