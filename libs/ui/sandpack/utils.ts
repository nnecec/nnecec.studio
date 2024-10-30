import type { SandpackFiles, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'

import { reactFiles } from './default-files'

export const defaultFilesByTemplate = {
  react: reactFiles,
} as Record<SandpackPredefinedTemplate, SandpackFiles>

export const useFiles = ({
  files,
  template,
}: {
  files?: SandpackFiles
  template?: SandpackPredefinedTemplate
}) => {
  return {
    ...files,
    ...(template && defaultFilesByTemplate[template]),
  }
}
