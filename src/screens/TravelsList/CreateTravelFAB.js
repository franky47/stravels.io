// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2
  }
})

const CreateTravelFAB = ({ classes }) => (
  <Button
    variant="fab"
    color="secondary"
    aria-label="add"
    className={classes.button}
    component={Link}
    to="/travels/create"
  >
    <AddIcon />
  </Button>
)

export default withStyles(styles)(CreateTravelFAB)
