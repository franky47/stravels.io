import React from 'react'
import mapboxgl from 'mapbox-gl'
import Polyline from '@mapbox/polyline'

import 'mapbox-gl/dist/mapbox-gl.css'
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
      style: 'mapbox://styles/mapbox/outdoors-v10'
    })

    this.map.on('load', () => {
      // this._addShading()
      this._generatePolylines({ polylines: {} })
    })
  }
  componentDidUpdate (prevProps) {
    this._generatePolylines(prevProps)
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

  _addPolyline = (id) => {
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
        'line-color': '#f44336',
        'line-width': 5
      }
    })
  }
  _removePolyline = (id) => {
    const layerId = `polyline-${id}`
    this.map.removeLayer(layerId)
    this.map.removeSource(layerId)
  }
}
