import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSwitch, VisuallyHidden } from '@nextui-org/react'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { Highlight } from 'prism-react-renderer'

import useTimeoutFn from '~/core/hooks/use-timeout'

import { theme } from './theme'

export const CodeBlock = ({ children, language }) => {
  const [copied, setCopied] = useState(false)
  const reset = useTimeoutFn(() => {
    setCopied(false)
  }, 2000)[2]

  const { Component, getBaseProps, getInputProps, getWrapperProps, isSelected, slots } = useSwitch({
    className: 'absolute right-4 top-4 opacity-0 group-hover:opacity-100',
    isSelected: copied,
  })

  return (
    <div className="group relative">
      <CopyToClipboard
        onCopy={() => {
          setCopied(true)
          reset()
        }}
        text={children}
      >
        <Component {...getBaseProps()}>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <div
            {...getWrapperProps()}
            className={slots.wrapper({
              class: ['w-8 h-8', 'flex items-center justify-center', 'rounded-lg bg-default-100 hover:bg-default-200'],
            })}
          >
            {isSelected ? <IconCheck /> : <IconCopy />}
          </div>
        </Component>
      </CopyToClipboard>
      <Highlight code={children} language={language} theme={theme as any}>
        {({ className, getLineProps, getTokenProps, style, tokens }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
