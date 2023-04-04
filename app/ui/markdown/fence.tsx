import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IconCheck,IconCopy } from '@tabler/icons-react'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'

import useTimeoutFn from '~/hooks/timeout'

import Mermaid from '../mermaid'

import { theme } from './theme'

export const Fence = ({ children, 'data-language': language }: any) => {
  const [copied, setCopied] = useState(false)
  const reset = useTimeoutFn(() => {
    setCopied(false)
  }, 2000)[2]

  if (language === 'mermaid') {
    return <Mermaid>{children}</Mermaid>
  }

  return (
    <div className="group relative">
      <CopyToClipboard
        text={children}
        onCopy={() => {
          setCopied(true)
          reset()
        }}
      >
        <button className="btn btn-sm absolute right-4 top-4 opacity-0 group-hover:opacity-100">
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
