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
  const StyledImageGridWrapper = styled.div`
    position: relative;
    z-index: 1;
    background-color: #000;
    border-top: 2px solid #000;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.7);
  `
  const StyledImageGrid = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    background-color: #000;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    @media screen and (max-width: 502px) {
      grid-template-columns: repeat(2, minmax(158px, 1fr));
    }
    grid-gap: 2px;
  `
  return (
    <StyledImageGridWrapper id="image-grid">
      <StyledImageGrid>
        {entries.map((entry, index) => {
          const originalName = `${entry.photos[0].md5}.${entry.photos[0].type}`
          const findImage = croppedImages.allFile.nodes.find(
            node => node.childImageSharp.cropped.originalName === originalName
          )
          const croppedImage = findImage.childImageSharp.cropped
          return (
            <ImageGridItem key={index} entry={entry} image={croppedImage} />
          )
        })}
      </StyledImageGrid>
    </StyledImageGridWrapper>
  )
}

export default ImageGrid
