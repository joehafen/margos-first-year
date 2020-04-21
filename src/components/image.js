import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Image = ({ md5, type, cropped }) => {
  const allImages = useStaticQuery(graphql`
    {
      allFile(filter: { relativeDirectory: { eq: "images" } }) {
        edges {
          node {
            childImageSharp {
              hiRes: fluid(maxWidth: 2048, quality: 80) {
                ...GatsbyImageSharpFluid
                originalName
              }
              cropped: fluid(
                maxWidth: 500
                maxHeight: 500
                quality: 80
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const findImage = (md5, type, cropped) => {
    return allImages.allFile.edges.find(
      ({ node }) => node.childImageSharp.hiRes.originalName === `${md5}.${type}`
    )
  }

  const getImage = () => {
    if (cropped) {
      return findImage(md5, type, cropped).node.childImageSharp.cropped
    } else {
      return findImage(md5, type, cropped).node.childImageSharp.hiRes
    }
  }

  return <Img fluid={getImage()} />
}

export default Image
