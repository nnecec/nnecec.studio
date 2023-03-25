import Highlight, { defaultProps } from 'prism-react-renderer'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IconCopy, IconCheck } from '@tabler/icons-react'
import Mermaid from '../mermaid'
import { theme } from './theme'
import { useState } from 'react'
import clsx from 'clsx'
import useTimeoutFn from '~/hooks/timeout'

export const Fence = ({ children, 'data-language': language }: any) => {
  const [copied, setCopied] = useState(false)
  const [, , reset] = useTimeoutFn(() => {
    setCopied(false)
  }, 2000)

  if (language === 'mermaid') {
    return <Mermaid>{children}</Mermaid>
  }

  return (
    <div className="relative group">
      <CopyToClipboard
        text={children}
        onCopy={() => {
          setCopied(true)
          reset()
        }}
      >
        <button className="absolute right-4 top-4 btn btn-sm opacity-0 group-hover:opacity-100">
          <label className={clsx(copied && 'swap-active', 'swap')}>
            <div className="swap-on">
              <IconCheck />
            </div>
            <div className="swap-off">
              <IconCopy />
            </div>
          </label>
        </button>
      </CopyToClipboard>
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
    </div>
  )
}
