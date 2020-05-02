import React from "react"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import { today } from "../utils"

const StyledHero = styled.div`
  width: 100%;
  height: 100vh;
  .hero-wrapper {
    position: fixed;
    width: 100%;
  }
  .bg {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 5rem;
  }
  h1 {
    font-family: "Fredoka One";
    font-weight: 400;
    font-size: 7rem;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  button {
    padding: 1rem 1.25rem;
    margin-top: 1.5rem;
    border: none;
    background-color: rgba(20, 20, 20, 0.65);
    color: #fff;
    font-family: "Heebo";
    font-weight: 300;
    font-size: 1.15rem;
    border-radius: 30px;
    &:focus {
      outline: 0;
    }
  }
`

const Hero = () => {
  const backgroundImage = useStaticQuery(graphql`
    {
      file(
        relativeDirectory: { eq: "images" }
        childImageSharp: {
          fluid: {
            originalName: { eq: "67b8b7ecc23ffde0778f46113cd996b8.jpeg" }
          }
        }
      ) {
        childImageSharp {
          fluid(maxWidth: 2048, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <StyledHero>
      <div className="hero-wrapper">
        <BackgroundImage
          fluid={backgroundImage.file.childImageSharp.fluid}
          className="bg"
        >
          <h1>
            Margo's
            <br />
            First Year
          </h1>
          <button>
            <Link to={`/${today()}`} state={{ todaysDate: true }}>
              Today's Date
            </Link>
          </button>
          <button
            onClick={() =>
              document
                .querySelector("#image-grid")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            View All
          </button>
        </BackgroundImage>
      </div>
    </StyledHero>
  )
}

export default Hero
