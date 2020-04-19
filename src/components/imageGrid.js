import React from "react"
import styled from "@emotion/styled"
import ImageGridItem from "./imageGridItem"
import { useStaticQuery, graphql } from "gatsby"

const ImageGrid = () => {
  const allData = useStaticQuery(graphql`
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
              fluid(maxWidth: 500, maxHeight: 500, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid
                originalName
              }
            }
          }
        }
      }
    }
  `)

  const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2px;
  `
  return (
    <ImageGrid>
      {allData.allDataJson.edges[0].node.entries.map((entry, index) => {
        return (
          <ImageGridItem
            images={allData.allFile}
            entry={entry}
            index={index}
            key={index}
          />
        )
      })}
    </ImageGrid>
  )
}

export default ImageGrid
