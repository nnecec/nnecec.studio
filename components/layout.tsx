import Footer from './footer'
import Meta from './meta'
import Navbar from './navbar'
import { PropsWithChildren } from 'react'

type Props = {
  preview?: boolean
}

const Layout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <>
      <Meta />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
