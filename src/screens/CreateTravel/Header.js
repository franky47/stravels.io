// @flow

import * as React from 'react'
import { withRouter } from 'react-router-dom'

// Material UI Components
import { withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

// Icons
import BackIcon from '@material-ui/icons/ArrowBack'
import FilterIcon from '@material-ui/icons/FilterList'

const styles = theme => ({
  backButton: {
    marginLeft: -12,
    marginRight: 20
  },
  flex: {
    flex: 1
  },
  clearButton: {},
  filterButton: {
    marginRight: -12
  }
})

type Props = {
  +classes: any,
  +history: any,
  +showClear: boolean,
  +onNext: () => void,
  +onClear: () => void,
  +onFilter: () => void
}

const Header = ({
  classes,
  history,
  showClear,
  onNext,
  onClear,
  onFilter
}: Props) => (
  <AppBar position="sticky" color="default">
    <Toolbar>
      <IconButton
        className={classes.backButton}
        color="inherit"
        aria-label="Back"
        onClick={history.goBack}
      >
        <BackIcon />
      </IconButton>
      <Typography
        variant="title"
        color="inherit"
        noWrap
        className={classes.flex}
      >
        Create Travel
      </Typography>
      {/* <IconButton
        className={classes.clearButton}
        color="inherit"
        aria-label="Clear"
        disabled={!showClear}
        onClick={onClear}
      >
        <ClearIcon />
      </IconButton> */}
      <IconButton
        className={classes.filterButton}
        color="inherit"
        aria-label="Filter"
        onClick={onFilter}
      >
        <FilterIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default withRouter(withStyles(styles)(Header))
