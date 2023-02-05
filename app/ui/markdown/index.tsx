import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Markdoc from '@markdoc/markdoc'
import oneDark from './theme';

export function Fence(props) {
  const { children, language } = props
  return (
    <Highlight {...defaultProps} theme={oneDark} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

interface PreviewerProps {
  content: string
}

export const Previewer = ({ content }: PreviewerProps) => {
  return (
    <div>
      {Markdoc.renderers.react(content, React, {
        components: {
          Fence
        }
      })}
    </div>
  )
}
