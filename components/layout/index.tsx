import { Meta } from './meta'
import { Navbar } from './navbar'
import { PropsWithChildren } from 'react'
import { Footer } from './footer'

type Props = {
  preview?: boolean
}

export const Layout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <>
      <Meta />
      <Navbar />
      <main className="min-h-screen pt-[96px]">{children}</main>
      <Footer />
    </>
  )
}
