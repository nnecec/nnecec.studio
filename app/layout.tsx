import type { Metadata } from 'next'

import { DATAPULSE_ID, GOOGLE_ID, SITE_CONFIG, isProd } from '~/libs/utils/constants'

import { Providers } from './providers'

import '~/libs/styles/custom.css'
import '~/libs/styles/globals.css'
import '~/libs/styles/heti.css'

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
        {isProd && !!DATAPULSE_ID ?
          <script
            data-endpoint="https://datapulse.app/api/v1/event"
            data-workspace={DATAPULSE_ID}
            defer
            id="datapulse"
            src="https://datapulse.app/datapulse.min.js"
            type="text/javascript"
          />
        : null}
        {isProd && !!GOOGLE_ID ?
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ID}`} />
            <script
              async
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ID}');
              `,
              }}
              id="gtag-init"
            />
          </>
        : null}
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
