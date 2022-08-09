import { Link } from '@remix-run/react'

import { Layout } from '~/components'

const Index = () => {
  return (
    <Layout>
      <section className="mt-[-96px] flex h-screen items-center justify-center">
        <h1></h1>
        <Link to="/posts">
          <button type="button" className="btn">
            文章
          </button>
        </Link>
      </section>
    </Layout>
  )
}

export default Index
