import { isRouteErrorResponse, useRouteError } from '@remix-run/react'

import { Layout } from './layout'

export const CommonErrorBoundary = () => {
  const error = useRouteError()
  let child = null
  if (isRouteErrorResponse(error)) {
    child = (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    )
  } else if (error instanceof Error) {
    child = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  } else {
    child = <h1>Unknown Error</h1>
  }

  return <Layout>{child}</Layout>
}
