module.exports = {
  siteMetadata: {
    title: `nnecec's aircraft`,
    author: {
      name: `nnecec`,
    },
    description: `前端深入不浅出指北 🧐`,
    siteUrl: `https://nnecec.vercel.app`,
    repositoryUrl: `https://github.com/nnecec/nnecec.github.io`,
    social: {
      twitter: `nnecec_cn`,
      github: `nnecec`
    },
  },
  jsxRuntime: "automatic",
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `article`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-graphviz',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-139865049-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "nnecec's blog",
            link: "http://nnecec.vercel.app/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `nnecec's aircraft`,
        short_name: `aircraft`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.jpg`, // This path is relative to the root of the site.
        "user_preferences": {
          "color_scheme_dark": {
            "theme_color": "rgba(31, 41, 55)",
            "background_color": "rgba(31, 41, 55)"
          },
          "color_scheme_light": {
            "theme_color": "#fff",
            "background_color": "#fff"
          }
        }
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-vercel`
  ],
}
