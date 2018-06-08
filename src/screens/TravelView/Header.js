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

const styles = theme => ({
  backButton: {
    marginLeft: -12,
    marginRight: 20
  },
  flex: {
    flex: 1
  },
  editButton: {
    marginRight: -12
  }
})

type Props = {
  +classes: { [key: string]: string },
  +title: string,
  +onEdit: () => void
}

const Header = ({ classes, title, onEdit }: Props) => (
  <AppBar color="default" position="static">
    <Toolbar>
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
      <IconButton
        className={classes.editButton}
        aria-label="Edit"
        onClick={onEdit}
      >
        <EditIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header)
