import React from "react"
import styled from "@emotion/styled"
import { Link, graphql } from "gatsby"
import { date } from "../utils"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import Div100vh from "react-div-100vh"

const SingleImage = ({ data, pageContext: { id }, location: { state } }) => {
  const image = data.file.childImageSharp.hiRes
  const todaysDate = (state && state.todaysDate) || null

  const StyledSingleImage = styled(Div100vh)`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    h2 {
      position: absolute;
      width: 80%;
      top: 6px;
      z-index: 1;
      text-align: center;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
      font-family: "Heebo", sans-serif;
      font-size: 2rem;
    }
  `
  const Buttons = styled.div`
    .prev,
    .next,
    .close {
      color: rgba(255, 255, 255, 0.75);
      width: 40px;
      height: 40px;
    }
    .prev,
    .next {
      position: fixed;
      top: 50%;
      z-index: 1;
      margin-top: -18px;
    }
    .prev {
      left: 12px;
    }
    .next {
      right: 12px;
      text-align: right;
    }
    .close {
      position: absolute;
      top: 7px;
      right: 12px;
      z-index: 1;
      text-align: right;
    }
    .svg-inline--fa {
      filter: drop-shadow(0px 0px 8px #555);
    }
  `
  const ImgContainer = styled.div`
    max-width: calc(100vh * ${image.aspectRatio});
    width: 100%;
  `

  return (
    <Layout>
      <Buttons>
        {data.prevEntry && (
          <Link className="prev" to={`/${date(data.prevEntry, "path")}`}>
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </Link>
        )}
        {data.nextEntry && (
          <Link className="next" to={`/${date(data.nextEntry, "path")}`}>
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </Link>
        )}
        <Link
          className="close"
          to={todaysDate ? `/` : `/#${date(data.currEntry, "id")}`}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </Link>
      </Buttons>
      <StyledSingleImage>
        <h2>{date(data.currEntry, "display")}</h2>
        <ImgContainer>
          <Img fluid={image} />
        </ImgContainer>
      </StyledSingleImage>
    </Layout>
  )
}

export const SingleImageQuery = graphql`
  query SingleImageQuery(
    $originalName: String
    $currId: String
    $prevId: String
    $nextId: String
  ) {
    file(
      relativeDirectory: { eq: "images" }
      childImageSharp: { fluid: { originalName: { eq: $originalName } } }
    ) {
      childImageSharp {
        hiRes: fluid(maxWidth: 2048, quality: 80) {
          ...GatsbyImageSharpFluid
          aspectRatio
        }
      }
    }
    currEntry: margoJson(id: { eq: $currId }) {
      creationDate
      timeZone
      photos {
        md5
        type
      }
    }
    prevEntry: margoJson(id: { eq: $prevId }) {
      creationDate
      timeZone
    }
    nextEntry: margoJson(id: { eq: $nextId }) {
      creationDate
      timeZone
    }
  }
`

export default SingleImage
