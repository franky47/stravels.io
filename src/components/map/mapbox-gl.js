// @flow

import mapboxgl from 'mapbox-gl'

import { getMultiBoundingBox, getSingleBoundingBox } from 'lib/mapping'
import './mapbox-gl.css'

// Types
import type { PolylineArray } from 'lib/mapping'
import type { ActivityID } from 'lib/types'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZnJhbmt5NDciLCJhIjoiY2oxZXp4a2FvMDAxZzJwcW50dmlyb292cyJ9.fL0Ze14CVgf2LcdM-Kmv7w'

// Types --

export type MapObject = mapboxgl.Map

export type PathElement = {
  +id: ActivityID,
  +path: PolylineArray,
  +color: string
}

// -----------------------------------------------------------------------------

export const createMap = (container: HTMLElement | string): MapObject =>
  new mapboxgl.Map({
    container,
    // style: 'mapbox://styles/mapbox/dark-v9',
    // style: 'mapbox://styles/mapbox/light-v9',
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
  focusOn: (id: ActivityID) => void
) => {
  const { id, path, color } = pathElement
  const layerId = `polyline-${id}`
  map.addSource(id, {
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
  })
  map.addLayer({
    id: layerId + '-touch',
    type: 'line',
    source: id,
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': color,
      'line-width': 40,
      'line-opacity': 0
    }
  })
  map.addLayer({
    id: layerId + '-outline',
    type: 'line',
    source: id,
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': 'rgba(255, 255, 255, 0.75)',
      'line-width': 7
    }
  })
  map.addLayer({
    id: layerId,
    type: 'line',
    source: id,
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': color,
      'line-width': 5
    }
  })
  map.on('click', layerId + '-touch', featureClicked(focusOn))
}

export const removePolylineLayer = (
  map: MapObject,
  id: ActivityID,
  focusOn: (id: ActivityID) => void
) => {
  const layerId = `polyline-${id}`
  map.off('click', layerId + '-touch', featureClicked(focusOn))
  map.removeLayer(layerId)
  map.removeLayer(layerId + '-outline')
  map.removeLayer(layerId + '-touch')
  map.removeSource(id)
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
