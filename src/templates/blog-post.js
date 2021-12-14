import { Link, graphql } from "gatsby"

import { Bio, Layout, SEO, Tag, Toc } from "../components"
import arrow from '../images/arrow-up-right.svg'

const BlogPostTemplate = ({ data, location, ...rest }) => {
  const post = data.markdownRemark
  const { title, repositoryUrl } = data.site.siteMetadata
  const { previous, next } = data

  return (
    <Layout location={location} title={title}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="mb-12">
          <h1>{post.frontmatter.title}</h1>
          <div>
            <div className="text-sm mb-2">
              最后更新: {post.frontmatter.date}
              {/* <a href={`${repositoryUrl}/issues`} target="_blank" referrerPolicy="no-referrer">反馈错误 <img src={arrow} className="inline-block" width="10px" /> </a> */}
            </div>
            <div>{post.frontmatter.tags?.map(tag => (<Tag>{tag}</Tag>))}</div>
          </div>

        </header>
        {!!post.tableOfContents && <Toc toc={post.tableOfContents} />}
        <article
          className="prose prose-blue"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />

        <footer className="py-8">
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            fontSize: 14
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        repositoryUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
