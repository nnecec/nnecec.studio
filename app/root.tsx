import type {
  LoaderFunction,
  LinksFunction,
  MetaFunction
} from '@remix-run/node'

import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import { SITE_CONFIG } from '~/utils/constants'

import indexStyle from './styles/index.css'
import customStyle from './styles/custom.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: indexStyle },
  { rel: 'stylesheet', href: customStyle },
  {
    rel: 'apple-touck-icon',
    href: '/favicon/apple-touch-icon.jpg',
    sizes: '180x180'
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' }
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: SITE_CONFIG.title,
  viewport: 'width=device-width,initial-scale=1',
  'msapplication-TileColor': '#000000',
  'theme-color': '#000',
  description: SITE_CONFIG.description
})
type LoaderData = {
  trackingId: string | undefined
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({ trackingId: process.env.GOOGLE_TRACKING_ID })
}

export default function App() {
  const { trackingId } = useLoaderData<LoaderData>()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        {process.env.NODE_ENV === 'development' || !trackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${trackingId}');
              `
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
