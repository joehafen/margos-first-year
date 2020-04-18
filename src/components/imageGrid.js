import React from "react"
import styled from "@emotion/styled"
import ImageGridItem from "./imageGridItem"
import { useStaticQuery, graphql } from "gatsby"

const ImageGrid = ({ data }) => {
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
              fixed(width: 250, height: 250, quality: 80, cropFocus: CENTER) {
                ...GatsbyImageSharpFixed
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
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 30px;
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
