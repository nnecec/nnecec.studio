import mermaid from 'mermaid'
import { useEffect } from 'react'

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'dark',
  logLevel: 5,
})

export const Mermaid = ({ children }: { children: string }) => {
  useEffect(() => {
    if (children) {
      mermaid.run()
    }
  }, [children])

  return <pre className="mermaid">{children}</pre>
}

export default Mermaid
