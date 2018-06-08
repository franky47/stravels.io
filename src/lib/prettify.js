// @flow

import type { MetersPerSecond, Meters, Seconds } from './stats'

// Dates --

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

export const dateRange = (a: string, b: string): string => {
  const start = new Date(a)
  const end = new Date(b)

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
  if (a === b) {
    return `${lhs} ${formatMonth(start)} ${start.getFullYear()}`
  }
  return `${lhs} - ${rhs} ${formatMonth(start)} ${start.getFullYear()}`
}

// Stats --

export const distanceAsKm = (distance: Meters = 0): string => {
  return (distance * 0.001).toFixed(2)
}

export const elevation = (elevation: Meters = 0): string => {
  return elevation.toFixed(0)
}

export const duration = (duration: Seconds = 0): string => {
  const h = Math.floor(duration / 3600)
  const m = Math.floor((duration - h * 3600) / 60)
  const s = duration - (h * 3600 + m * 60)
  const hs = h.toFixed(0).padStart(2, '0')
  const ms = m.toFixed(0).padStart(2, '0')
  const ss = s.toFixed(0).padStart(2, '0')
  return `${hs}:${ms}:${ss}`
}

export const speed = (speed: MetersPerSecond): string => {
  return (speed * 3.6).toFixed(1)
}
