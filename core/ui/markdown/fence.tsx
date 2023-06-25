import { CodeBlock } from '../code-block'
import { Mermaid } from '../mermaid'

export const Fence = ({ children, 'data-language': language }: any) => {
  if (language === 'mermaid') {
    return <Mermaid>{children}</Mermaid>
  }

  return <CodeBlock language={language}>{children}</CodeBlock>
}
