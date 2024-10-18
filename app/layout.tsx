import type { Metadata, Viewport } from 'next'

import { DATAPULSE_ID, GOOGLE_ID, isProd, SITE_CONFIG } from '~/libs/utils/constants'

import { Providers } from './providers'

import '~/libs/styles/globals.css'
import '~/libs/styles/custom.css'
import '~/libs/styles/heti.css'

export const metadata: Metadata = {
  description: SITE_CONFIG.description,
  icons: {
    apple: [{ sizes: '180x180', type: 'image/png', url: '/favicon/apple-touch-icon.png' }],
    icon: [
      { type: 'image/x-icon', url: '/favicon/favicon.ico' },
      { sizes: '16x16', type: 'image/png', url: '/favicon/favicon-16x16.png' },
      { sizes: '32x32', type: 'image/png', url: '/favicon/favicon-32x32.png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  metadataBase: new URL('https://nnecec.studio'),
  other: {
    'msapplication-TileColor': '#000',
  },
  themeColor: '#000',
  title: {
    default: SITE_CONFIG.title,
    template: '%s - nnecec.studio',
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  width: 'device-width',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
