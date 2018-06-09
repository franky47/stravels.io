// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

// Icons
import BackIcon from '@material-ui/icons/ArrowBack'
import EditIcon from '@material-ui/icons/Edit'
import ZoomOutIcon from '@material-ui/icons/ZoomOutMap'

const styles = theme => ({
  toolbar: {
    '& > *:last-child': {
      marginRight: -12
    }
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20
  },
  flex: {
    flex: 1
  }
})

type Props = {
  +classes: { [key: string]: string },
  +title: string,
  +onEdit: () => void,
  +focused: boolean,
  +onResetFocus: () => void
}

const Header = ({ classes, title, onEdit, focused, onResetFocus }: Props) => (
  <AppBar color="default" position="static">
    <Toolbar className={classes.toolbar}>
      <IconButton
        className={classes.backButton}
        color="inherit"
        aria-label="Back"
        component={Link}
        to="/"
        replace
      >
        <BackIcon />
      </IconButton>
      <Typography variant="title" noWrap className={classes.flex}>
        {title}
      </Typography>

      {focused && (
        <IconButton onClick={onResetFocus} aria-label="Overview">
          <ZoomOutIcon />
        </IconButton>
      )}
      <IconButton aria-label="Edit" onClick={onEdit}>
        <EditIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header)
