import React from "react"
import Layout from "../components/layout"
import ImageGrid from "../components/imageGrid"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const entries = data.allMargoJson.nodes
  return (
    <Layout>
      <SEO title="Home" />
      <ImageGrid entries={entries} />
    </Layout>
  )
}

export const allDataQuery = graphql`
  {
    allMargoJson {
      nodes {
        creationDate
        timeZone
        photos {
          md5
          type
        }
      }
    }
  }
`

export default IndexPage
