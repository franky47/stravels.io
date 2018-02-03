import React from 'react'
import mapboxgl from 'mapbox-gl'
import Polyline from '@mapbox/polyline'
import color from 'color-convert'

import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmt5NDciLCJhIjoiY2oxZXp4a2FvMDAxZzJwcW50dmlyb292cyJ9.fL0Ze14CVgf2LcdM-Kmv7w'

const mapStyle = {
  margin: '10px',
  display: 'block',
  height: '800px'
}

const colorize = (index, base = 0) => {
  const numSegments = 4
  const h = (base + (index % numSegments) * 360 / numSegments) % 360
  return `#${color.hsl.hex(h, 80, 65)}`
}

export default class Map extends React.Component {
  componentDidMount () {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v10'
    })

    this.map.on('load', () => {
      this._addShading()
      this._generatePolylines(this.props)
    })
  }
  componentWillReceiveProps (nextProps) {
    this._generatePolylines(nextProps)
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
  _generatePolylines = (props) => {
    const { colorBase = Math.random() * 360 } = props
    props.polylines.forEach(({ id: activityId, encoded }, index) => {
      const layerId = `polyline-${activityId}`
      const source = this.map.getSource(layerId)
      if (source) {
        source.setData({
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': Polyline.decode(encoded).map(c => c.reverse())
          }
        })
        this.map.setPaintProperty(layerId, 'line-color', colorize(index, colorBase))
      } else {
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
                'coordinates': Polyline.decode(encoded).map(c => c.reverse())
              }
            }
          },
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': colorize(index, colorBase),
            'line-width': 5
          }
        })
      }
    })
  }
}
