import ErrorPage from 'next/error'

export default function Page404() {
  return <ErrorPage statusCode={404} />
}
