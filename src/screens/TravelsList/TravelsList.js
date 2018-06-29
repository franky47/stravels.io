// @flow

import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'

import Header from './Header'
import List from './List'
import EmptyListPlaceholder from './EmptyListPlaceholder'
import CreateTravelFAB from './CreateTravelFAB'

import type { Travel } from 'lib/types'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper
  },
  scroll: {
    flex: 1,
    overflow: 'auto'
  }
})

type Props = {
  +classes: Object,
  +travels: Array<Travel>,
  +moveFabUp: boolean
}
type State = {
  editing: boolean
}

class TravelsList extends React.Component<Props, State> {
  state = {
    editing: false
  }

  render() {
    const { classes, travels, moveFabUp } = this.props
    const { editing } = this.state

    return (
      <section className={classNames(classes.root, 'screen')}>
        <Header
          showEdit={travels.length > 0}
          toggleEdit={this.toggleEdit}
          editing={editing}
        />
        {travels.length === 0 && <EmptyListPlaceholder />}
        <div className={classes.scroll} onClick={this.stopEditing}>
          <List travels={travels} editing={editing} />
        </div>
        <CreateTravelFAB moveUp={moveFabUp} />
      </section>
    )
  }

  // --

  toggleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }
  stopEditing = () => {
    this.setState({ editing: false })
  }
}

const mapStateToProps = state => ({
  travels: Object.values(state.travels)
})

export default connect(mapStateToProps)(withStyles(styles)(TravelsList))
