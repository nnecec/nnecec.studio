import { Container } from '@nextui-org/react'
import { Share } from '@icon-park/react'

const Footer = () => {
  return (
    <footer className="py-8 text-sm">
      <Container>
        © {new Date().getFullYear()} Built with{' '}
        <a href="https://www.gatsbyjs.com">Gatsby</a>, Code at{' '}
        <a
          href="https://github.com/nnecec/nnecec.github.io"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noreferrer"
        >
          Github
          <Share />
        </a>
        .
      </Container>
    </footer>
  )
}

export default Footer
