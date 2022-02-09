import { SITE_CONFIG } from '../lib/constants'
import { Card, Text, Row, Col, Button } from '@nextui-org/react'
type Props = {
  className?: string
}
const { author, social, description } = SITE_CONFIG

const Bio = ({ className }: Props) => {
  return (
    <Card cover css={{ w: '100%', p: 0 }}>
      <Card.Body>
        <Card.Image
          src="/assets/blog/cover.jpg"
          height={90}
          width="100%"
          alt="Relaxing app background"
        />
      </Card.Body>
      <Card.Footer
        blur
        css={{
          position: 'absolute',
          bgBlur: '#0f1114',
          bottom: 0,
          zIndex: 1
        }}
      >
        <Row>
          <Col>
            <Row>
              <Col span={3}>
                <Card.Image
                  src="/assets/profile-pic.jpg"
                  height={40}
                  width={40}
                  alt="Breathing app icon"
                />
              </Col>
              <Col>
                <Text size={12}>{author.name}</Text>
                <Text size={12}>{description}</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end">
              <a
                href={`https://github.com/${social?.github || ''}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button auto rounded size="sm">
                  Github
                </Button>
              </a>
              <a
                href={`https://twitter.com/${social?.twitter || ''}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button auto rounded size="sm">
                  Twitter
                </Button>
              </a>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}
export default Bio
