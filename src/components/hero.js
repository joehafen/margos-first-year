import React from "react"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import { today } from "../utils"
import scrollTo from "gatsby-plugin-smoothscroll"
import Div100vh from "react-div-100vh"

const StyledHero = styled(Div100vh)`
  width: 100%;
  height: 100vh;
  .hero-wrapper {
    position: fixed;
    width: 100%;
  }
  .bg {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .button-wrapper {
      display: flex;
      flex-direction: column;
      padding-bottom: 8rem;
      @media screen and (max-width: 600px) {
        padding-bottom: 9rem;
      }
      @media screen and (max-height: 600px) and (orientation: landscape) {
        flex-direction: row;
        padding-bottom: 4rem;
      }
      button {
        padding: 1rem 1.25rem;
        margin: 1.5rem 1rem 0;
        @media screen and (max-height: 600px) and (orientation: landscape) {
          margin-top: 0;
        }
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
        transition-duration: 0.25s;
        &:hover {
          transform: scale(1.15);
          transition-duration: 0.25s;
        }
      }
    }
  }
  h1 {
    font-family: "Fredoka One";
    font-weight: 400;
    font-size: 14vw;
    @media screen and (max-width: 600px) {
      font-size: 18vw;
    }
    @media screen and (min-width: 1000px) {
      font-size: 140px;
    }
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
`

const Hero = () => {
  const data = useStaticQuery(graphql`
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
        <BackgroundImage fluid={data.file.childImageSharp.fluid} className="bg">
          <h1>
            Margo's
            <br />
            First Year
          </h1>
          <div className="button-wrapper">
            <button>
              <Link to={`/${today()}`} state={{ todaysDate: true }}>
                Today's Date
              </Link>
            </button>
            <button onClick={() => scrollTo("#image-grid")}>View All</button>
          </div>
        </BackgroundImage>
      </div>
    </StyledHero>
  )
}

export default Hero
