'use client'

import type { ReactNode } from 'react'

import { NextUIProvider } from '@nextui-org/react'

import { ThemeProvider } from '~/core/components/theme'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  )
}
