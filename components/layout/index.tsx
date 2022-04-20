import { PropsWithChildren } from 'react'
import { Container, ContainerProps } from '@nextui-org/react'
import Head from 'next/head'

import { Meta } from './meta'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { SITE_CONFIG } from 'lib/constants'

type Props = {
  preview?: boolean
  title?: string
} & Partial<ContainerProps>

export const Layout = ({
  title = SITE_CONFIG.title,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Meta />
      <Navbar />
      <Container {...props}>
        <main className="min-h-screen pt-[96px]">{children}</main>
      </Container>
      <Footer />
    </>
  )
}
