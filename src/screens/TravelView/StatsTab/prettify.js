// @flow
import type { MetersPerSecond, Meters, Seconds } from './stats'

export const distance = (distance: Meters = 0): string => {
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
