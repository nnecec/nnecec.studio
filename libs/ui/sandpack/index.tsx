'use client'

import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPredefinedTemplate,
  SandpackConsole,
  SandpackProviderProps,
  SandpackSetup,
} from '@codesandbox/sandpack-react'
import { useFiles } from './utils'

export const Sandpack = ({
  template = 'react',
  theme = 'auto',
  files: _files,
  options,
  dependencies,
}: SandpackProviderProps & {
  dependencies: SandpackSetup['dependencies']
}) => {
  const files = useFiles({ files: _files, template })

  return (
    <div className="md:-mx-16">
      <SandpackProvider
        template={template}
        theme={theme}
        files={files}
        customSetup={{
          dependencies: dependencies || {},
        }}
        options={{ autorun: true, ...options }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            showTabs
            showLineNumbers={false}
            showInlineErrors
            wrapContent
            closableTabs
          />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
