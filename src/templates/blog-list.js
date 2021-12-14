import { Link, graphql } from "gatsby"

import { Bio, Layout, Tag, SEO, Button, Space } from "../components"

const SEO_TITLE = "所有文章"

const BlogIndex = ({ data, location, ...props }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : `/${(currentPage - 1)}`
  const nextPage = `/${(currentPage + 1)}`

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={SEO_TITLE} />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={SEO_TITLE} />

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h3>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h3>
                  <small>最后更新：{post.frontmatter.date}</small>
                </header>
                <section className="mb-4">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
                <div className="">
                  {post.frontmatter.tags?.map(tag => (<Tag>{tag}</Tag>))}
                </div>
              </article>
            </li>
          )
        })}
      </ol>
      <Space>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            <Button>←</Button>
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (

          <Link
            key={i}
            to={`/${i === 0 ? '' : i + 1}`}
          >
            <Button active={i + 1 === currentPage}>{i + 1}</Button>
          </Link>
        ))}
        {!isLast && (
          <Link to={nextPage} rel="next">
            <Button>→</Button>
          </Link>
        )}
      </Space>

      <Bio className="my-12" />

    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY年MM月DD日")
          title
          description
          tags
        }
      }
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
