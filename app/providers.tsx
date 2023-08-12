'use client'

import { NextUIProvider } from '@nextui-org/react'

import { ThemeProvider } from '~/core/components/theme'

import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  )
}
