/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const moment = require(`moment-timezone`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allDataJson {
        edges {
          node {
            entries {
              creationDate
              timeZone
              photos {
                md5
                type
              }
            }
          }
        }
      }
      allFile(filter: { relativeDirectory: { eq: "images" } }) {
        edges {
          node {
            childImageSharp {
              hiRes: fluid(quality: 80) {
                originalName
                base64
                aspectRatio
                src
                srcSet
                sizes
                originalImg
              }
              cropped: fluid(maxWidth: 500, maxHeight: 500, cropFocus: CENTER) {
                originalName
                base64
                aspectRatio
                src
                srcSet
                sizes
                originalImg
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query`)
    return
  }

  const allData = []
  const allImages = result.data.allFile.edges

  let i = 0
  result.data.allDataJson.edges[0].node.entries.forEach(entry => {
    const md5 = entry.photos[0].md5
    const type = entry.photos[0].type
    const image = allImages.find(
      ({ node }) =>
        node.childImageSharp.cropped.originalName === `${md5}.${type}`
    )

    allData[i] = {
      creationDate: entry.creationDate,
      timeZone: entry.timeZone,
      md5,
      type,
      cropped: image.node.childImageSharp.cropped,
      hiRes: image.node.childImageSharp.hiRes,
    }

    i++
  })

  createPage({
    path: "/",
    component: path.resolve(`src/templates/Main.js`),
    context: {
      allData,
    },
  })

  const singleImageTemplate = path.resolve(`src/templates/SingleImage.js`)
  allData.forEach(entry => {
    const date = moment(entry.creationDate).tz(entry.timeZone)
    const path = date.format("YYYY/MM/DD")
    createPage({
      path,
      component: singleImageTemplate,
      context: {
        entry,
      },
    })
  })
}
