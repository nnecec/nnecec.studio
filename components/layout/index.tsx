import { PropsWithChildren } from 'react'
import { Container } from '@nextui-org/react'

import { Meta } from './meta'
import { Navbar } from './navbar'
import { Footer } from './footer'

type Props = {
  preview?: boolean
}

export const Layout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <>
      <Meta />
      <Navbar />
      <Container>
        <main className="min-h-screen pt-[96px]">{children}</main>
      </Container>
      <Footer />
    </>
  )
}
