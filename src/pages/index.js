import React from "react"
import Layout from "../components/layout"
import ImageGrid from "../components/imageGrid"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <ImageGrid />
    </Layout>
  )
}

export default IndexPage
