'use client'

import type { ReactNode } from 'react'

import { ReactLenis } from 'lenis/react'
import { ViewTransitions } from 'next-view-transitions'

import { ThemeProvider } from '~/libs/components/theme'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
        <ReactLenis root>{children}</ReactLenis>
      </ThemeProvider>
    </ViewTransitions>
  )
}
