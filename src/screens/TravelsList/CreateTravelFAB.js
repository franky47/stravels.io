// @flow

import * as React from 'react'
import classNames from 'classnames'
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
  },
  fabMoveUp: {
    [theme.breakpoints.down('sm')]: {
      transform: 'translate3d(0, -46px, 0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut
      })
    }
  },
  fabMoveDown: {
    [theme.breakpoints.down('sm')]: {
      transform: 'translate3d(0, 0, 0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp
      })
    }
  }
})

type Props = {
  +classes: { [key: string]: string },
  +moveUp: boolean
}

const CreateTravelFAB = ({ classes, moveUp }: Props) => (
  <Button
    variant="fab"
    color="secondary"
    aria-label="add"
    className={classNames({
      [classes.button]: true,
      [classes.fabMoveUp]: moveUp,
      [classes.fabMoveDown]: !moveUp
    })}
    component={Link}
    to="/create"
  >
    <AddIcon />
  </Button>
)

export default withStyles(styles)(CreateTravelFAB)
