// @flow

import * as React from 'react'
import { connect } from 'react-redux'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import CheckIcon from '@material-ui/icons/Check'

import type { ActivityID } from 'lib/types'

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      minHeight: 72,
      bottom: 0,
      width: '100%',
      padding: theme.spacing.unit + 10
    },
    button: {
      marginLeft: 'auto',
      color: 'white'
    },
    spinner: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit
      }
    },
    checkmark: {
      position: 'absolute',
      left: theme.spacing.unit * 3,
      [theme.breakpoints.up('sm')]: {
        left: theme.spacing.unit * 4
      },
      transform: 'scale(1.25)'
    },
    text: {
      marginLeft: theme.spacing.unit * 2,
      color: theme.palette.text.secondary
    }
  }
}

type Props = {
  +classes: Object,
  +selectedActivities: Set<ActivityID>,
  +onCreate: () => void,
  +progress: number,
  +numActivitiesLoaded: number
}

class Footer extends React.Component<Props> {
  render() {
    const { classes, onCreate, progress } = this.props
    return (
      <Paper className={classes.root} elevation={12}>
        <Fade in={progress > 0.0 && progress < 1.0}>
          <CircularProgress
            variant="static"
            size={36}
            className={classes.spinner}
            value={progress * 100}
          />
        </Fade>
        <Fade in={progress === 1.0}>
          <CheckIcon className={classes.checkmark} color="primary" />
        </Fade>
        <Typography className={classes.text}>{this._getText()}</Typography>

        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={onCreate}
          disabled={progress !== 1.0}
        >
          Create
        </Button>
      </Paper>
    )
  }

  _getText = () => {
    const { progress, numActivitiesLoaded, selectedActivities } = this.props
    if (progress === 0) {
      return ''
    }
    if (progress === 1) {
      return 'Activities loaded'
    }
    return `Loading Activity ${numActivitiesLoaded + 1} / ${
      selectedActivities.size
    }`
  }
}

// Redux --

const mapStateToProps = (state, ownProps: Props) => {
  const availableActivities = (id: ActivityID): boolean => {
    return state.activities.hasOwnProperty(id)
  }
  const activities = Array.from(ownProps.selectedActivities)
  const numActivitiesLoaded = activities.filter(availableActivities).length
  return {
    numActivitiesLoaded,
    progress:
      activities.length === 0 ? 0 : numActivitiesLoaded / activities.length
  }
}

const withRedux = connect(mapStateToProps)

export default withRedux(withStyles(styles)(Footer))
