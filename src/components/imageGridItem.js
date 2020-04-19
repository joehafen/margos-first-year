import React from "react"
import moment from "moment-timezone"
import Img from "gatsby-image"
import styled from "@emotion/styled"

const ImageGridItem = ({ images, entry, index }) => {
  const date = moment(entry.creationDate).tz(entry.timeZone)
  const day = date.format("D")
  const monthAndYear = date.format("MMM YYYY")

  const getImage = (md5, type) => {
    return images.edges.find(
      ({ node }) => node.childImageSharp.fluid.originalName === `${md5}.${type}`
    )
  }

  const ImageGridItem = styled.div`
    position: relative;
    h2,
    h3 {
      position: absolute;

      right: 0;
      z-index: 1;
      margin-bottom: 0;
      padding-right: 0.25rem;
      color: rgba(255, 255, 255, 0.75);
      text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      font-family: "Heebo", sans-serif;
    }
    h2 {
      bottom: 1rem;
      font-size: 2.75rem;
      font-weight: 900;
    }
    h3 {
      bottom: 0.05rem;
      font-size: 1.1rem;
      font-weight: 700;
    }
  `

  return (
    <ImageGridItem>
      <h2>{day}</h2>
      <h3>{monthAndYear}</h3>
      <Img
        fluid={
          getImage(entry.photos[0].md5, entry.photos[0].type).node
            .childImageSharp.fluid
        }
      />
    </ImageGridItem>
  )
}

export default ImageGridItem
