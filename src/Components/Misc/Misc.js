export function getDate() {
  let dt = new Date()
  let mm = dt.getMonth() + 1
  let dd = dt.getDate()
  let yy = dt.getFullYear()
  let todaysDate = mm + "-" + dd + "-" + yy

  return todaysDate
}