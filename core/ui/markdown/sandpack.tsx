import type { SandpackFiles, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'

import type { ReactNode } from 'react'

import { Sandpack as SandpackBox } from '@codesandbox/sandpack-react'

type Layout = 'console' | 'preview'

type SandpackProps = {
  files: SandpackFiles
  layout?: Layout
  template?: SandpackPredefinedTemplate
}

export const Sandpack = ({ files = {}, layout = 'preview', template = 'react' }: SandpackProps) => {
  return (
    <SandpackBox
      files={files}
      options={{
        layout,
      }}
      template={template}
    />
  )
}
export const SandpackFile = ({ children }: { children: ReactNode }) => {
  return children
}
