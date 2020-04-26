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
      allMargoJson {
        nodes {
          id
          creationDate
          timeZone
          photos {
            md5
            type
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query`)
    return
  }

  const singleImageTemplate = path.resolve(`src/templates/SingleImage.js`)
  result.data.allMargoJson.nodes.map((entry, index, entries) => {
    const date = moment(entry.creationDate).tz(entry.timeZone)
    const path = date.format("YYYY/MM/DD")
    createPage({
      path,
      component: singleImageTemplate,
      context: {
        currId: entry.id,
        prevId: entries[index - 1] ? entries[index - 1].id : null,
        nextId: entries[index + 1] ? entries[index + 1].id : null,
        originalName: `${entry.photos[0].md5}.${entry.photos[0].type}`,
      },
    })
  })
}
