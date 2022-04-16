import { PropsWithChildren } from 'react'
import { Container } from '@nextui-org/react'
import Head from 'next/head'

import { Meta } from './meta'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { SITE_CONFIG } from 'lib/constants'

type Props = {
  preview?: boolean
  title?: string
}

export const Layout = ({
  title = SITE_CONFIG.title,
  children
}: PropsWithChildren<Props>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Meta />
      <Navbar />
      <Container>
        <main className="min-h-screen pt-[96px]">{children}</main>
      </Container>
      <Footer />
    </>
  )
}
