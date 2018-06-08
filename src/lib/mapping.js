// @flow
import polylineTools from '@mapbox/polyline'
import bbox from '@turf/bbox'
import { lineString, multiLineString } from '@turf/helpers'

// Flow type definitions --

export type LatLngArray = [number, number]
export type LatLngBounds = [number, number, number, number]
export type PolylineArray = Array<LatLngArray>
export type MultiPolyline = Array<PolylineArray>

// --

export const decodeLatLng = (encoded: string): LatLngArray => {
  const tokens = encoded.split('|')
  const lat = parseFloat(tokens[0])
  const lng = parseFloat(tokens[1])
  return [lat, lng]
}

export const swapLatLng = (array: LatLngArray): LatLngArray => {
  const [a, b] = array
  return [b, a]
}

export const decodePolyline = (encoded: string): PolylineArray => {
  return polylineTools.decode(encoded).map(swapLatLng)
}

export const swapLatLngBounds = (bounds: LatLngBounds): LatLngBounds => {
  let l = bounds[1]
  bounds[1] = bounds[0]
  bounds[0] = l
  l = bounds[3]
  bounds[3] = bounds[2]
  bounds[2] = l
  return bounds
}

export const getSingleBoundingBox = (path: PolylineArray): LatLngBounds => {
  return swapLatLngBounds(bbox(lineString(path.map(swapLatLng))))
}

export const getMultiBoundingBox = (paths: MultiPolyline): LatLngBounds => {
  return swapLatLngBounds(
    bbox(multiLineString(paths.map(p => p.map(swapLatLng))))
  )
}
