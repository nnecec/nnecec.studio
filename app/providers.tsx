'use client'

import type { ReactNode } from 'react'

import { ThemeProvider } from '~/libs/components/theme'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
      {children}
    </ThemeProvider>
  )
}
