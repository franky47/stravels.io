// @flow

import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

// Icons
import Logo from 'components/core/Logo'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
  logo: {
    marginLeft: 2,
    marginRight: 16
  },
  flex: {
    flex: 1
  },
  toolbar: {
    '& > *:last-child': {
      marginRight: -12
    }
  },
  primaryText: {
    color: 'white'
  }
})

type Props = {
  +classes: Object,
  +toggleEdit: () => void,
  +editing: boolean,
  +showEdit: boolean
}

class Header extends React.Component<Props> {
  render() {
    const { classes, toggleEdit, showEdit, editing } = this.props
    return (
      <AppBar position="sticky" color="primary">
        <Toolbar className={classes.toolbar}>
          <Logo color="white" size={24} className={classes.logo} />
          <Typography
            variant="title"
            noWrap
            className={classNames(classes.flex, classes.primaryText)}
          >
            My travels
          </Typography>
          <IconButton
            className={classes.primaryText}
            component={Link}
            to="/create"
          >
            <AddIcon />
          </IconButton>
          {showEdit && (
            <IconButton className={classes.primaryText} onClick={toggleEdit}>
              {editing ? <CheckIcon /> : <EditIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
