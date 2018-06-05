// @flow
import * as React from 'react'

import { decodePolyline } from './mappingUtility'

import MapView from './components/MapView'
import Footer from './components/Footer'

// Types
import type { ActivityDetails } from 'lib/types'

import './MapTab.css'

const colors = ['#7cb342', '#039be5', '#5e35b1', '#e53935', '#ffb300']

type Props = {
  +activities: Array<ActivityDetails>
}
type State = {
  focused: number
}

export default class MapTab extends React.Component<Props, State> {
  state = {
    focused: -1
  }

  render() {
    const { activities } = this.props
    const data = activities.slice().reverse()
    const paths = data.map(({ id, polyline }, index) => ({
      id,
      path: decodePolyline(polyline),
      color: colors[index % colors.length]
    }))
    const sections = data.map(({ distance }, index) => ({
      distance,
      color: colors[index % colors.length]
    }))
    const { focused } = this.state
    return (
      <div className="map-tab">
        <MapView paths={paths} focusedIndex={focused} focusOn={this.focusOn} />
        <Footer
          focusedIndex={focused}
          sections={sections}
          onPrev={this.onPrev}
          onNext={this.onNext}
          onBack={this.onBack}
          focusOn={this.focusOn}
        />
      </div>
    )
  }

  focusOn = (index: number) => {
    this.setState({
      focused: index
    })
  }
  onPrev = () => {
    const l = this.props.activities.length

    this.setState(prevState => ({
      focused: (prevState.focused - 1 + l) % l
    }))
  }
  onNext = () => {
    this.setState(prevState => ({
      focused: (prevState.focused + 1) % this.props.activities.length
    }))
  }
  onBack = () => {
    this.setState({
      focused: -1
    })
  }
}
