import { Container, Spacer } from '@nextui-org/react'
import { Github, Twitter } from '@icon-park/react'
import { Bio } from './bio'

export const Footer = () => {
  return (
    <footer className="py-8 text-sm">
      <Container
        display="flex"
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Bio />
        <Spacer />
        <div className="flex gap-4">
          <a
            href="https://github.com/nnecec/nnecec.github.io"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noreferrer"
          >
            <Github theme="filled" size={24} />
          </a>
          <a
            href="https://twitter.com/nnecec_cn"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noreferrer"
          >
            <Twitter theme="filled" size={24} />
          </a>
        </div>
        <Spacer />

        <div>
          {' '}
          © {new Date().getFullYear()} Built with{' '}
          <a href="https://www.nextjs.org">Next.js</a>.
        </div>
      </Container>
    </footer>
  )
}
