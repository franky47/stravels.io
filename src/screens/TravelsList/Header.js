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
import Logo from 'components/core/Logo'

const styles = theme => ({
  menuButton: {
    marginLeft: -4,
    marginRight: 10,
    color: 'white'
  },
  logo: {
    marginLeft: 4,
    marginRight: theme.spacing.unit * 2
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
  +classes: Object,
  +toggleEdit: () => void,
  +showEdit: boolean
}

class Header extends React.Component<Props> {
  render() {
    const { classes, toggleEdit, showEdit } = this.props
    return (
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Logo color="white" size={22} className={classes.logo} />
          {/* <IconButton
            className={classNames(classes.menuButton, classes.primaryText)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="title"
            noWrap
            className={classNames(classes.flex, classes.primaryText)}
          >
            My travels
          </Typography>
          {showEdit && (
            <IconButton
              className={classNames(classes.editButton, classes.primaryText)}
              onClick={toggleEdit}
            >
              <EditIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
