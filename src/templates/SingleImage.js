import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import moment from "moment-timezone"
import Img from "gatsby-image"

const SingleImage = ({ data, pageContext: { entry } }) => {
  const image = data.allFile.edges[0].node.childImageSharp.hiRes

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
  `
  const ImgContainer = styled.div`
    max-width: calc((100vh - 3.75rem) * ${image.aspectRatio});
    align-self: center;
    justify-self: center;
    width: 100%;
  `

  const date = moment(entry.creationDate).tz(entry.timeZone)
  return (
    <StyledSingleImage>
      <Header>
        <h1>{date.format("MMMM Do, YYYY")}</h1>
        <Link className="close" to="/">
          Back
        </Link>
      </Header>
      <ImgContainer>
        <Img fluid={image} />
      </ImgContainer>
    </StyledSingleImage>
  )
}

export const SingleImageQuery = graphql`
  query SingleImageQuery($originalName: String) {
    allFile(
      filter: {
        childImageSharp: { fluid: { originalName: { eq: $originalName } } }
      }
    ) {
      edges {
        node {
          childImageSharp {
            hiRes: fluid(maxWidth: 2048, quality: 80) {
              ...GatsbyImageSharpFluid
              originalName
              aspectRatio
            }
          }
        }
      }
    }
  }
`

export default SingleImage
