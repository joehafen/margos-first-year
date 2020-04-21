import React from "react"
import Layout from "../components/layout"
import ImageGrid from "../components/imageGrid"
import SEO from "../components/seo"

const IndexPage = ({ pageContext: { allData } }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <ImageGrid data={allData} />
    </Layout>
  )
}

export default IndexPage
