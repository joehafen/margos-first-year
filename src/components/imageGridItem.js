import React from "react"
import moment from "moment-timezone"
import Img from "gatsby-image"

const ImageGridItem = ({ images, entry, index }) => {
  const getImage = (md5, type) => {
    return images.edges.find(
      ({ node }) => node.childImageSharp.fixed.originalName === `${md5}.${type}`
    )
  }
  const date = moment(entry.creationDate).tz(entry.timeZone)
  return (
    <div>
      <h2>
        {date.format("D") === "1" || index === 0
          ? date.format("MMM D")
          : date.format("D")}
      </h2>
      <Img
        fixed={
          getImage(entry.photos[0].md5, entry.photos[0].type).node
            .childImageSharp.fixed
        }
      />
    </div>
  )
}

export default ImageGridItem
