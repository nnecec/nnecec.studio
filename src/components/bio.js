/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import cls from 'classnames'

export const Bio = ({ className }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
          description
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const { author, social, description } = data.site.siteMetadata
  return (
    <div className={cls('bio', 'flex', className)}>
      <StaticImage
        layout="fixed"
        className="rounded-full mr-4"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {
        author?.name && (
          <div>
            <strong className="text-lg">{author.name}</strong> {author?.summary || null}
            <div>{description}</div>
          </div>

        )
      }
    </div >
  )
}
