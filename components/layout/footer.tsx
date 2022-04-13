import { Container, Grid, Spacer } from '@nextui-org/react'
import { Github, Twitter } from '@icon-park/react'

export const Footer = () => {
  return (
    <footer className="py-8 text-sm">
      <Container>
        <Grid.Container gap={2} justify="space-between">
          <Grid xs={4}>
            © {new Date().getFullYear()} Built with{' '}
            <a href="https://www.nextjs.org">Next.js</a>.
          </Grid>
          <Grid xs={4} justify="flex-end">
            <a
              href="https://github.com/nnecec/nnecec.github.io"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <Github theme="filled" size={24} />
            </a>
            <Spacer x={1}></Spacer>
            <a
              href="https://twitter.com/nnecec_cn"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <Twitter theme="filled" size={24} />
            </a>
          </Grid>
        </Grid.Container>
      </Container>
    </footer>
  )
}
