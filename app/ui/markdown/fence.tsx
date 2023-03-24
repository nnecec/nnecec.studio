import Highlight, { defaultProps } from 'prism-react-renderer'
import Mermaid from '../mermaid'
import { theme } from './theme'

export const Fence = ({ children, 'data-language': language }: any) => {
  if (language === 'mermaid') {
    return <Mermaid>{children}</Mermaid>
  }

  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
