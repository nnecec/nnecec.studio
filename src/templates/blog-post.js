import { Link, graphql } from "gatsby"

import { Bio, Layout, SEO, Tag, Toc, Icon } from "../components"

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
            <div className="text-sm mb-2 flex justify-between">
              最后更新: {post.frontmatter.date}
              <a href={`${repositoryUrl}/issues`} target="_blank" referrerPolicy="no-referrer">反馈<Icon.LinkExternal /></a>
            </div>
            <div>{post.frontmatter.tags?.map(tag => (<Tag>{tag}</Tag>))}</div>
          </div>

        </header>
        <div className="relative">
          {!!post.tableOfContents &&
            <Toc
              className="text-sm z-20 top-[20rem] right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 px-8 overflow-y-auto xl:fixed"
              toc={post.tableOfContents}
            />}
          <article
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </div>
        <hr />

        <footer className="py-8">
          <Bio />
        </footer>
      </article>
      <nav>
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
              <Link className="before:content-['_↽']" to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link className="after:content-['_⇁']" to={next.fields.slug} rel="next">
                {next.frontmatter.title}
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
