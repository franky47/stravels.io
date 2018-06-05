// @flow
import mapboxgl from 'mapbox-gl'
import type { PolylineArray } from '../mappingUtility'

import './mapbox-gl.css'
import { getMultiBoundingBox, getSingleBoundingBox } from '../mappingUtility'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZnJhbmt5NDciLCJhIjoiY2oxZXp4a2FvMDAxZzJwcW50dmlyb292cyJ9.fL0Ze14CVgf2LcdM-Kmv7w'

// Types --

export type MapObject = mapboxgl.Map

export type ActivityId = string // todo: move higher up when others need it

export type PathElement = {
  +id: ActivityId,
  +path: PolylineArray,
  +color: string
}

// -----------------------------------------------------------------------------

export const createMap = (container: HTMLElement | string): MapObject =>
  new mapboxgl.Map({
    container,
    // style: 'mapbox://styles/mapbox/dark-v9',
    // style: 'mapbox://styles/mapbox/light-v9'
    style: 'mapbox://styles/mapbox/outdoors-v10', // IGN-style with height lines

    // Disable "complex" interactions (Pat-proofing)
    pitchWithRotate: false,
    dragRotate: false
  })

export const destroyMap = (map: MapObject) => {
  map.remove()
}

// -----------------------------------------------------------------------------

const featureClicked = focusOn => event => {
  focusOn(event.features[0].properties.id)
}

export const addPolylineLayer = (
  map: MapObject,
  pathElement: PathElement,
  focusOn: (id: ActivityId) => void
) => {
  const { id, path, color } = pathElement
  const layerId = `polyline-${id}`
  map.addLayer({
    id: layerId,
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {
          id
        },
        geometry: {
          type: 'LineString',
          coordinates: path
        }
      }
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': color,
      'line-width': 5
    }
  })
  map.on('click', layerId, featureClicked(focusOn))
}

export const removePolylineLayer = (
  map: MapObject,
  id: ActivityId,
  focusOn: (id: ActivityId) => void
) => {
  const layerId = `polyline-${id}`
  map.off('click', layerId, featureClicked(focusOn))
  map.removeLayer(layerId)
  map.removeSource(layerId)
}

// -----------------------------------------------------------------------------

export const fitToPath = (
  map: MapObject,
  pathElement: PathElement,
  jump: boolean = false
) => {
  const bounds = getSingleBoundingBox(pathElement.path)
  map.fitBounds(bounds, {
    padding: 60,
    duration: jump ? 0 : 500
  })
}

export const fitToPaths = (
  map: MapObject,
  pathElements: Array<PathElement>,
  jump: boolean = false
) => {
  if (pathElements.length === 0) {
    return
  }
  const bounds = getMultiBoundingBox(Array.from(pathElements.map(e => e.path)))
  map.fitBounds(bounds, {
    padding: 60,
    duration: jump ? 0 : 500
  })
}

// -----------------------------------------------------------------------------

export const addShading = (map: MapObject) => {
  map.addSource('dem', {
    type: 'raster-dem',
    url: 'mapbox://mapbox.terrain-rgb'
  })
  map.addLayer(
    {
      id: 'hillshading',
      source: 'dem',
      type: 'hillshade'
      // insert below waterway-river-canal-shadow
      // where hillshading sits in the Mapbox Outdoors style
    },
    'waterway-river-canal-shadow'
  )
}
