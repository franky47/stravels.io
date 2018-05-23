// @flow
import React from 'react'
import * as mapbox from './mapbox-gl'
import type { ActivityId, MapObject, PathElement } from './mapbox-gl'

import './MapView.css'

const styles = {
  outer: {
    flex: 1
  },
  inner: (visible: boolean) => ({
    height: '100%',
    transition: 'opacity 0.2s ease',
    opacity: visible ? 1.0 : 0.0
  })
}

type Props = {
  +paths: Array<PathElement>,
  +focusedIndex: number,
  +focusOn: (index: number) => void
}
type State = {
  visible: boolean
}

export default class MapView extends React.Component<Props, State> {
  // Class field types
  map: MapObject
  mapContainerId: string

  state = {
    visible: false
  }

  constructor(props: Props) {
    super(props)
    this.mapContainerId = Math.floor(Math.random() * (1 << 16)).toString(16)
  }

  componentDidMount() {
    this.map = mapbox.createMap(this.mapContainerId)
    this.map.on('load', this._onMapLoad)
    this._fitToVisiblePolylines(true)
  }
  componentWillUnmount() {
    this.map && this.map.remove()
  }
  componentDidUpdate(prevProps: Props) {
    this._updatePolylines(prevProps)
    this._updateMapViewport()
  }

  render() {
    return (
      <div style={styles.outer} className="grid-background">
        <div
          style={styles.inner(this.state.visible)}
          id={this.mapContainerId}
        />
      </div>
    )
  }

  _onMapLoad = () => {
    this._updatePolylines({ ...this.props, paths: [] })
    this.setState({ visible: true })
  }
  _focusOn = (id: ActivityId) => {
    const index = this.props.paths.findIndex(e => e.id === id)
    this.props.focusOn(index)
  }

  _updatePolylines = (prevProps: Props): boolean => {
    const oldLayerIds = Array.from(new Set(prevProps.paths.map(p => p.id)))
    const newLayerIds = Array.from(new Set(this.props.paths.map(p => p.id)))
    const layersToAdd = newLayerIds.filter(id => oldLayerIds.indexOf(id) === -1)
    const layersToDel = oldLayerIds.filter(id => newLayerIds.indexOf(id) === -1)
    layersToAdd.forEach(this._addPolyline)
    layersToDel.forEach(this._removePolyline)
    return layersToAdd.length > 0 || layersToDel.length > 0
  }
  _addPolyline = (id: ActivityId) => {
    const pathElement = this.props.paths.find(p => p.id === id)
    if (pathElement) {
      mapbox.addPolylineLayer(this.map, pathElement, this._focusOn)
    }
  }
  _removePolyline = (id: ActivityId) => {
    mapbox.removePolylineLayer(this.map, id, this._focusOn)
  }

  // --

  _fitToVisiblePolylines = (jump: boolean = false) => {
    mapbox.fitToPaths(this.map, this.props.paths, jump)
  }
  _updateMapViewport = () => {
    const { focusedIndex, paths } = this.props
    if (focusedIndex >= 0) {
      const focusedPath = paths[focusedIndex]
      mapbox.fitToPath(this.map, focusedPath)
    } else {
      mapbox.fitToPaths(this.map, paths)
    }
  }
}
