import React from 'react'
import { Container, Link, Row, Col } from '@nextui-org/react'
import { SITE_CONFIG } from '../lib/constants'
import NextLink from 'next/link'
import ThemeSwitch from './theme-switch'

export interface Props {
  routes?: any[]
  isHome?: boolean
}

const Navbar: React.FC<Props> = () => {
  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur">
      <Container display="flex" alignItems="center" justify="space-between">
        <h1>
          <Link href="/">{SITE_CONFIG.title}</Link>
        </h1>

        <Row fluid={false} gap={1}>
          <Col>
            <NextLink href="/posts">
              <Link block>Posts</Link>
            </NextLink>
          </Col>
          <Col>
            <ThemeSwitch />
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Navbar
