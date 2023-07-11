import { ThemeProvider } from '~/core/components/theme'
import { SITE_CONFIG } from '~/core/utils/constants'

import type { Metadata } from 'next'

import '~/core/styles/heti.css'
import '~/core/styles/globals.css'
import '~/core/styles/custom.css'

const trackingId = process.env.GOOGLE_TRACKING_ID

export const metadata: Metadata = {
  title: {
    default: 'nnecec.studio',
    template: `%s - nnecec.studio`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta content="#000" name="theme-color" />
        <meta content="#000" name="msapplication-TileColor" />
        <link href="/favicon/favicon.ico" rel="icon" type="image/x-icon" />
        <link href="/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon/site.webmanifest" rel="manifest" />
        <meta title={SITE_CONFIG.title} />
        <meta content={SITE_CONFIG.description} name="description" />
        {process.env.NODE_ENV === 'production' && (
          <script
            data-endpoint="https://datapulse.app/api/v1/event"
            data-workspace="cljxpa07r0xjb8j37c7woz5fx"
            defer
            id="datapulse"
            src="https://datapulse.app/datapulse.min.js"
            type="text/javascript"
          />
        )}
      </head>

      <body>
        <ThemeProvider enableSystem>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'development' || !trackingId ? undefined : (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${trackingId}');
              `,
              }}
              async
              id="gtag-init"
            />
          </>
        )}
      </body>
    </html>
  )
}
