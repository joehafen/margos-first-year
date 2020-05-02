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

export const today = () => {
  const today = moment()
  const today2019 = moment().format("2019-MM-DD")
  const margosBirthday = moment("2019-02-06")

  if (moment(today2019).isBefore(margosBirthday)) {
    return today.format("2020/MM/DD")
  } else {
    return today.format("2019/MM/DD")
  }
}
