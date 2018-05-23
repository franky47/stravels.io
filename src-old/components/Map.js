import React from 'react'
import mapboxgl from 'mapbox-gl'
import Polyline from '@mapbox/polyline'
import bbox from '@turf/bbox'
import { multiLineString } from '@turf/helpers'

import './Map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmt5NDciLCJhIjoiY2oxZXp4a2FvMDAxZzJwcW50dmlyb292cyJ9.fL0Ze14CVgf2LcdM-Kmv7w'

const mapStyle = {
  display: 'block',
  height: '100%',
  width: '100%'
}

export default class Map extends React.PureComponent {
  componentDidMount () {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: 'mapbox://styles/mapbox/light-v9'
      style: 'mapbox://styles/mapbox/outdoors-v10',
      pitchWithRotate: false,
      dragRotate: false
    })

    this.map.on('load', () => {
      // this._addShading()
      this._generatePolylines({ polylines: {} })
    })
  }
  componentDidUpdate (prevProps) {
    this._generatePolylines(prevProps)
    this._fitToVisiblePolylines()
  }

  componentWillUnmount () {
    this.map.remove()
  }

  render () {
    return (
      <div style={mapStyle} ref={e => { this.mapContainer = e }} />
    )
  }

  _addShading = () => {
    this.map.addSource('dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.terrain-rgb'
    })
    this.map.addLayer({
      'id': 'hillshading',
      'source': 'dem',
      'type': 'hillshade'
      // insert below waterway-river-canal-shadow
      // where hillshading sits in the Mapbox Outdoors style
    }, 'waterway-river-canal-shadow')
  }
  _generatePolylines = (prevProps) => {
    const oldLayerIds = Object.keys(prevProps.polylines)
    const newLayerIds = Object.keys(this.props.polylines)
    const layersToAdd = newLayerIds.filter(id => oldLayerIds.indexOf(id) === -1)
    const layersToDel = oldLayerIds.filter(id => newLayerIds.indexOf(id) === -1)
    layersToAdd.forEach(this._addPolyline)
    layersToDel.forEach(this._removePolyline)
  }

  _addPolyline = (id, index) => {
    const colors = [
      '#7cb342',
      '#039be5',
      '#5e35b1',
      '#e53935',
      '#ffb300'
    ]
    const color = colors[(Object.keys(this.props.polylines).length + index) % colors.length]
    const layerId = `polyline-${id}`
    const data = this.props.polylines[id]
    this.map.addLayer({
      'id': layerId,
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': Polyline.decode(data).map(c => c.reverse())
          }
        }
      },
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': color,
        'line-width': 5
      }
    })
  }
  _removePolyline = (id) => {
    const layerId = `polyline-${id}`
    this.map.removeLayer(layerId)
    this.map.removeSource(layerId)
  }

  _fitToVisiblePolylines = () => {
    const { polylines } = this.props
    if (!Object.keys(polylines).length) {
      return // Nothing to work with
    }
    const bounds = bbox(multiLineString(Object.values(polylines)
      .map(p => Polyline.decode(p))
    ))
    const swapLatLngBounds = (bounds) => {
      let l = bounds[1]
      bounds[1] = bounds[0]
      bounds[0] = l
      l = bounds[3]
      bounds[3] = bounds[2]
      bounds[2] = l
      return bounds
    }
    this.map.fitBounds(swapLatLngBounds(bounds), {
      padding: 40
    })
  }
}
