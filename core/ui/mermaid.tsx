import { useEffect } from 'react'

import mermaid from 'mermaid'

mermaid.initialize({
  logLevel: 5,
  securityLevel: 'loose',
  startOnLoad: false,
  theme: 'neutral',
})

export const Mermaid = ({ children }: { children: string }) => {
  useEffect(() => {
    if (children) {
      mermaid.run()
    }
  }, [children])

  return <pre className="mermaid">{children}</pre>
}
