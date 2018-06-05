// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  caption: {
    textAlign: 'center',
    margin: '3em 0 2em',
    fontSize: '1em'
  },
  button: {
    margin: theme.spacing.unit
  }
})

const EmptyListPlaceholder = ({ classes }) => (
  <React.Fragment>
    <Typography variant="caption" className={classes.caption}>
      You have no travels
    </Typography>
    <Button
      color="primary"
      size="medium"
      className={classes.button}
      component={Link}
      to="/create"
    >
      Create travel
    </Button>
  </React.Fragment>
)

export default withStyles(styles)(EmptyListPlaceholder)
