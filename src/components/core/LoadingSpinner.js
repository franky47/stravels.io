// @flow

import * as React from 'react'
import classNames from 'classnames'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import Zoom from '@material-ui/core/Zoom'

const styles = theme => ({
  paper: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%'
  }
})

type Props = {
  +classes: { [key: string]: string },
  +className: string,
  +active: boolean
}

const LoadingSpinner = ({ active, classes, className = '' }: Props) => (
  <Zoom in={active} timeout={400}>
    <Paper className={classNames(classes.paper, className)}>
      <CircularProgress size={24} thickness={5} />
    </Paper>
  </Zoom>
)

export default withStyles(styles)(LoadingSpinner)
