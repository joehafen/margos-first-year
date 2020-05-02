import React from "react"
import styled from "@emotion/styled"
import { date } from "../utils"

const ImageDate = ({ entry }) => {
  const StyledImageDate = styled.div`
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
    <StyledImageDate>
      <h2>{date(entry, "day")}</h2>
      <h3>{date(entry, "monthAndYear")}</h3>
    </StyledImageDate>
  )
}

export default ImageDate
