import React from "react"
import styled from "@emotion/styled"
import ImageGridItem from "./imageGridItem"

const ImageGrid = ({ data }) => {
  const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2px;
  `
  return (
    <ImageGrid>
      {data.map((entry, index) => {
        return <ImageGridItem entry={entry} index={index} key={index} />
      })}
    </ImageGrid>
  )
}

export default ImageGrid
