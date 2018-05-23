// @flow

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const formatDay = (date: Date): string => {
  const day = date.getDate()
  let suffix = 'th'
  switch (day) {
    case 1:
    case 21:
    case 31:
      suffix = 'st'
      break
    case 2:
    case 22:
      suffix = 'nd'
      break
    case 3:
    case 23:
      suffix = 'rd'
      break
    default:
      break
  }
  return day + suffix
}
const formatMonth = (date: Date): string => months[date.getMonth()]

export const prettifyDateRange = (
  a: Date | string,
  b: Date | string
): string => {
  const start = typeof a === 'string' ? new Date(a) : a
  const end = typeof b === 'string' ? new Date(b) : b

  if (start.getFullYear() !== end.getFullYear()) {
    // Skip the day numbers
    const lhs = formatMonth(start) + ' ' + start.getFullYear()
    const rhs = formatMonth(end) + ' ' + end.getFullYear()
    return `${lhs} - ${rhs}`
  }
  if (start.getMonth() !== end.getMonth()) {
    const lhs = formatDay(start) + ' ' + formatMonth(start)
    const rhs = formatDay(end) + ' ' + formatMonth(end)
    return `${lhs} - ${rhs} ${start.getFullYear()}`
  }
  const lhs = formatDay(start)
  const rhs = formatDay(end)
  return `${lhs} - ${rhs} ${formatMonth(start)} ${start.getFullYear()}`
}
