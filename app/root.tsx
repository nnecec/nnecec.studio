import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider, useTheme } from '~/components/theme'
import { SITE_CONFIG } from '~/utils/constants'

import type { LinksFunction, LoaderFunction, V2_MetaFunction } from '@remix-run/node'

import customStyle from './styles/custom.css'
import indexStyle from './styles/index.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: indexStyle },
  { rel: 'stylesheet', href: customStyle },
  {
    rel: 'apple-touck-icon',
    href: '/favicon/apple-touch-icon.jpg',
    sizes: '180x180',
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
]

export const meta: V2_MetaFunction = () => [
  { title: SITE_CONFIG.title },
  { name: 'description', content: SITE_CONFIG.description },
]
type LoaderData = {
  trackingId: string | undefined
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    trackingId: process.env.GOOGLE_TRACKING_ID,
  })
}

const App = () => {
  const { trackingId } = useLoaderData<LoaderData>()
  const { prefersTheme } = useTheme()

  return (
    <html lang="en" className={clsx(prefersTheme)} data-theme={clsx(prefersTheme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000" />
        <meta name="msapplication-TileColor" content="#000" />
        <Meta />
        <Links />
      </head>
      <body>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        {process.env.NODE_ENV === 'development' || !trackingId ? null : (
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

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}
