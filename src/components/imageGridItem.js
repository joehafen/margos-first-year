import React from "react"
import { date } from "../utils"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ImageDate from "./imageDate"

const ImageGridItem = ({ entry, image }) => {
  const StyledImageGridItem = styled.div`
    position: relative;
    transition-duration: 0.25s;
    &:hover {
      transform: scale(1.08);
      transition-duration: 0.25s;
      z-index: 1;
    }
  `
  return (
    <StyledImageGridItem id={date(entry, "id")}>
      <Link to={`/${date(entry, "path")}`}>
        <ImageDate entry={entry} />
        <Img fluid={image} />
      </Link>
    </StyledImageGridItem>
  )
}

export default ImageGridItem
