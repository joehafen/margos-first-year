import moment from "moment-timezone"

export const date = (entry, format) => {
  const entryDate = moment(entry.creationDate).tz(entry.timeZone)
  switch (format) {
    case "id":
      return entryDate.format("YYYY-MM-DD")
    case "path":
      return entryDate.format("YYYY/MM/DD")
    case "day":
      return entryDate.format("D")
    case "monthAndYear":
      return entryDate.format("MMM YYYY")
    case "display":
      return entryDate.format("MMMM Do, YYYY")
    default:
      return entryDate
  }
}
