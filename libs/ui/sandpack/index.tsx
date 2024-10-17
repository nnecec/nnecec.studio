'use client'

import type { SandpackProviderProps, SandpackSetup } from '@codesandbox/sandpack-react'

import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPredefinedTemplate,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'

import { useFiles } from './utils'

export const Sandpack = ({
  dependencies,
  files: _files,
  options,
  template = 'react',
  theme = 'auto',
}: {
  dependencies: SandpackSetup['dependencies']
} & SandpackProviderProps) => {
  const files = useFiles({ files: _files, template })

  return (
    <div className="md:-mx-16">
      <SandpackProvider
        customSetup={{
          dependencies: dependencies || {},
        }}
        files={files}
        options={{ autorun: true, ...options }}
        template={template}
        theme={theme}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            closableTabs
            showInlineErrors
            showLineNumbers={false}
            showTabs
            wrapContent
          />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
