import { Link, graphql } from 'gatsby'

import { Bio, Layout, SEO, Tag, Toc, Icon } from '../components'

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
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              最后更新: {post.frontmatter.date}
              <a
                href={`${repositoryUrl}/issues`}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                反馈
                <Icon.LinkExternal />
              </a>
            </div>
            <div>
              {post.frontmatter.tags?.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div>
              版权声明: 署名-非商业性使用-禁止演绎 3.0 国际（
              <a
                href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                CC BY-NC-ND 3.0
              </a>
              ）
            </div>
          </div>
        </header>
        <div className="relative  my-8">
          {!!post.tableOfContents && (
            <Toc
              className="top-[20rem] right-[max(0px,calc(50%-46rem))] z-20 max-h-[600px] w-[19.5rem] overflow-y-auto py-6 px-4 text-sm xl:fixed"
              toc={post.tableOfContents}
            />
          )}
          <article
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
            className="heti"
          />
        </div>
        <hr />

        <footer>
          <Bio />
        </footer>
      </article>
      <nav>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
            fontSize: 14
          }}
        >
          <li>
            {previous && (
              <Link
                className="before:content-['_↽']"
                to={previous.fields.slug}
                rel="prev"
              >
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link
                className="after:content-['_⇁']"
                to={next.fields.slug}
                rel="next"
              >
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
