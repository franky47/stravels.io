// @flow

import React from 'react'
import classNames from 'classnames'
import * as mapbox from './mapbox-gl'

import { withStyles } from '@material-ui/core'
import { makeGrid } from './grid'

// Types
import type { MapObject, PathElement } from './mapbox-gl'
import type { ActivityID } from 'lib/types'

const styles = {
  container: {
    ...makeGrid(),
    height: '100%',
    width: '100%'
  },
  mapView: {
    height: '100%',
    width: '100%',
    transition: 'opacity 0.2s ease'
  },
  visible: {
    opacity: 1.0
  },
  hidden: {
    opacity: 0.0
  }
}

type Props = {
  +classes: { [key: string]: any },
  +paths: Array<PathElement>,
  +focusedIndex: number,
  +focusOn: (index: number) => void
}

type State = {
  visible: boolean
}

class MapView extends React.Component<Props, State> {
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
    const { classes } = this.props
    const { visible } = this.state
    return (
      <div className={classes.container}>
        <div
          className={classNames({
            [classes.mapView]: true,
            [classes.visible]: visible,
            [classes.hidden]: !visible
          })}
          id={this.mapContainerId}
        />
      </div>
    )
  }

  _onMapLoad = () => {
    this._updatePolylines({ ...this.props, paths: [] })
    this.setState({ visible: true })
  }
  _focusOn = (id: ActivityID) => {
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
  _addPolyline = (id: ActivityID) => {
    const pathElement = this.props.paths.find(p => p.id === id)
    if (pathElement) {
      mapbox.addPolylineLayer(this.map, pathElement, this._focusOn)
    }
  }
  _removePolyline = (id: ActivityID) => {
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

export default withStyles(styles)(MapView)
