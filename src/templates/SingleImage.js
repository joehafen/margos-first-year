import React from "react"
import styled from "@emotion/styled"
import { Link, graphql } from "gatsby"
import { date } from "../utils"
import Img from "gatsby-image"
import Layout from "../components/layout"

const SingleImage = ({ data, pageContext: { id } }) => {
  const image = data.file.childImageSharp.hiRes

  const StyledSingleImage = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 3.75rem 1fr;
    height: 100vh;
  `
  const Header = styled.div`
    justify-self: center;
    margin-top: 0.75rem;
    h1 {
      margin-bottom: 0;
      font-family: Heebo;
      font-weight: 700;
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
    }
    .prev {
      position: absolute;
      top: 20px;
      right: 0;
    }
    .next {
      position: absolute;
      top: 40px;
      right: 0;
    }
  `
  const ImgContainer = styled.div`
    max-width: calc((100vh - 3.75rem) * ${image.aspectRatio});
    align-self: center;
    justify-self: center;
    width: 100%;
  `

  return (
    <Layout>
      <StyledSingleImage>
        <Header>
          <h1>{date(data.currEntry, "display")}</h1>
          {data.prevEntry ? (
            <Link className="prev" to={`/${date(data.prevEntry, "path")}`}>
              Prev
            </Link>
          ) : null}
          {data.nextEntry ? (
            <Link className="next" to={`/${date(data.nextEntry, "path")}`}>
              Next
            </Link>
          ) : null}
          <Link className="close" to={`/#${date(data.currEntry, "id")}`}>
            Back
          </Link>
        </Header>
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
