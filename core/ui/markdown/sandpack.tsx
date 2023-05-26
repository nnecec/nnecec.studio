import { Sandpack as SandpackBox } from '@codesandbox/sandpack-react'

import type { SandpackFiles, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import type { ReactNode } from 'react'

type Layout = 'console' | 'preview'

type SandpackProps = {
  files: SandpackFiles
  template?: SandpackPredefinedTemplate
  layout?: Layout
}

export const Sandpack = ({ template = 'react', layout = 'preview', files = {} }: SandpackProps) => {

  return (
    <SandpackBox
      template={template}
      files={files}
      options={{
        layout,
      }}
    />
  )
}
export const SandpackFile = ({ children }: { children: ReactNode }) => {
  return children
}
