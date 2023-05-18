import { SITE_CONFIG } from '~/core/utils/constants'

import '~/core/styles/index.css'
import '~/core/styles/heti.css'
import '~/core/styles/custom.css'

const trackingId = process.env.GOOGLE_TRACKING_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000" />
        <meta name="msapplication-TileColor" content="#000" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta title={SITE_CONFIG.title} />
        <meta name="description" content={SITE_CONFIG.description} />
      </head>

      <body>
        {children}
        {process.env.NODE_ENV === 'development' || !trackingId ? undefined : (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${trackingId}');
              `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
