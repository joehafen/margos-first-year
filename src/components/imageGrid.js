import React from "react"
import styled from "@emotion/styled"
import ImageGridItem from "./imageGridItem"
import { useStaticQuery, graphql } from "gatsby"

const ImageGrid = ({ entries }) => {
  const croppedImages = useStaticQuery(graphql`
    {
      allFile(filter: { relativeDirectory: { eq: "images" } }) {
        nodes {
          childImageSharp {
            cropped: fluid(
              maxWidth: 500
              maxHeight: 500
              quality: 80
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
  `)
  const StyledImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2px;
  `
  return (
    <StyledImageGrid>
      {entries.map((entry, index) => {
        const originalName = `${entry.photos[0].md5}.${entry.photos[0].type}`
        const findImage = croppedImages.allFile.nodes.find(
          node => node.childImageSharp.cropped.originalName === originalName
        )
        const croppedImage = findImage.childImageSharp.cropped
        return <ImageGridItem key={index} entry={entry} image={croppedImage} />
      })}
    </StyledImageGrid>
  )
}

export default ImageGrid
