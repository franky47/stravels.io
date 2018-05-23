// @flow

import React from 'react'
import classNames from 'classnames'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

// Icons
import MenuIcon from '@material-ui/icons/Menu'
import EditIcon from '@material-ui/icons/Edit'

import List from './List'
import EmptyListPlaceholder from './EmptyListPlaceholder'
import CreateTravelFAB from './CreateTravelFAB'
import storage from 'lib/persistentStorage'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper
  },
  menuButton: {
    marginLeft: -4,
    marginRight: 10,
    color: 'white'
  },
  flex: {
    flex: 1
  },
  editButton: {
    marginRight: -12
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  primaryText: {
    color: 'white'
  }
})

type Props = {
  +classes: any
}
type State = {
  editing: boolean
}

class TravelsList extends React.Component<Props, State> {
  state = {
    editing: false
  }

  render() {
    const travels = Array.from(storage.travels.values())
    const { classes } = this.props
    const { editing } = this.state

    return (
      <section className={classNames(classes.root, 'screen')}>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <IconButton
              className={classNames(classes.menuButton, classes.primaryText)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              noWrap
              className={classNames(classes.flex, classes.primaryText)}
            >
              My travels
            </Typography>
            <IconButton
              className={classNames(classes.editButton, classes.primaryText)}
              onClick={this.toggleEdit}
            >
              <EditIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {travels.length === 0 && <EmptyListPlaceholder />}
        <List travels={travels} editing={editing} />
        <CreateTravelFAB />
      </section>
    )
  }

  // --

  toggleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }
}

export default withStyles(styles)(TravelsList)
