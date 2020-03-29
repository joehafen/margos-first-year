import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import moment from "moment-timezone"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const IndexPage = ({ data }) => {
  const getImage = (md5, type) => {
    return data.allFile.edges.find(
      ({ node }) => node.childImageSharp.fixed.originalName === `${md5}.${type}`
    )
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, 250px);
          grid-gap: 30px;
        `}
      >
        {data.allDataJson.edges[0].node.entries.map((entry, index) => (
          <div key={index}>
            <h2>
              {moment(entry.creationDate)
                .tz(entry.timeZone)
                .format("MMM D, YYYY")}
            </h2>
            <Img
              fixed={
                getImage(entry.photos[0].md5, entry.photos[0].type).node
                  .childImageSharp.fixed
              }
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query AllDataQuery {
    allDataJson {
      edges {
        node {
          entries {
            creationDate
            timeZone
            photos {
              md5
              type
            }
          }
        }
      }
    }
    allFile(filter: { relativeDirectory: { eq: "images" } }) {
      edges {
        node {
          childImageSharp {
            fixed(width: 250, height: 250, quality: 80, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed
              originalName
            }
          }
        }
      }
    }
  }
`
