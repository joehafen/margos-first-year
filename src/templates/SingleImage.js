import React from "react"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import moment from "moment-timezone"
import Image from "../components/image"

const SingleImage = ({ pageContext, pageContext: { data } }) => {
  const Wrapper = styled.div`
    color: #fff;
  `

  const date = moment(data.creationDate).tz(data.timeZone)

  return (
    <Wrapper>
      <Layout>
        <h1>
          {date.format("MMMM Do, YYYY")} <Link to="/">Back</Link>
        </h1>
        <Image
          md5={data.photos[0].md5}
          type={data.photos[0].type}
          cropped={false}
        />
      </Layout>
    </Wrapper>
  )
}

export default SingleImage
