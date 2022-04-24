import { PropsWithChildren } from 'react'
import { Container, ContainerProps } from '@nextui-org/react'
import Head from 'next/head'

import { SITE_CONFIG } from 'lib/constants'

import { Footer } from './footer'
import { Header } from './header'
import { Meta } from './meta'

type Props = {
  preview?: boolean
  title?: string
} & Partial<ContainerProps>

export const Layout = ({
  children,
  title = SITE_CONFIG.title,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Meta />
      <Header />
      <Container {...props}>
        <main className="min-h-screen pt-[96px]">{children}</main>
      </Container>
      <Footer />
    </>
  )
}
