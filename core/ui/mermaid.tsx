import { useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  logLevel: 5,
  theme: "neutral",
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
