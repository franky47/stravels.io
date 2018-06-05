// @flow

export type MetersPerSecond = number
export type Meters = number
export type Seconds = number

export type ActivityStats = {
  +distance: Meters,
  +elevation: Meters,
  +movingTime: Seconds,
  +averageSpeed: MetersPerSecond,
  +maxSpeed: MetersPerSecond
}

export type Totals = {
  distance: Meters,
  elevation: Meters,
  movingTime: Seconds
}

export type Averages = {
  +speed: MetersPerSecond
}

export type Maxes = {
  +speed: MetersPerSecond
}

// --

export const computeTotals = (activities: Array<ActivityStats>): Totals => {
  const sumOf = key =>
    activities.map(a => a[key]).reduce((sum, x) => sum + x, 0.0)
  return {
    distance: sumOf('distance'),
    elevation: sumOf('elevation'),
    movingTime: sumOf('movingTime')
  }
}

export const computeAverages = (activities: Array<ActivityStats>): Averages => {
  const sumOf = key =>
    activities.map(a => a[key]).reduce((sum, x) => sum + x, 0.0)
  return {
    speed: sumOf('averageSpeed') / activities.length
  }
}

export const computeMaxes = (activities: Array<ActivityStats>): Maxes => {
  const maxOf = key =>
    activities.map(a => a[key]).reduce((max, x) => Math.max(max, x), 0.0)
  return {
    speed: maxOf('maxSpeed')
  }
}
