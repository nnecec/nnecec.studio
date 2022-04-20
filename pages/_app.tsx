import { NextUIProvider } from '@nextui-org/react'
import { darkTheme, lightTheme } from 'lib/theme'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AppProps } from 'next/app'
import 'styles/code.css'
import 'styles/custom.css'
import 'styles/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      enableSystem
      attribute="class"
      value={{
        dark: darkTheme.className,
        light: lightTheme.className
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  )
}
