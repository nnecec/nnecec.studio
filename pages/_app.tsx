import { NextUIProvider } from '@nextui-org/react'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { darkTheme, lightTheme } from 'lib/theme'

import 'styles/code.css'
import 'styles/custom.css'
import 'styles/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="gtag">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>

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
    </>
  )
}
