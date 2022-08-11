import { Link } from '@remix-run/react'
import { Layout } from '~/components'

const Index = () => {
  return (
    <Layout>
      <section className="mt-[-96px] flex h-screen items-center justify-center">
        <h2>你好，我是 nnecec。这是我的 blog。</h2>
        <Link to="/posts">
          <button type="button" className="btn btn-primary">
            文章
          </button>
        </Link>
      </section>
    </Layout>
  )
}

export default Index
