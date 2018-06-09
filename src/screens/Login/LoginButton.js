// @flow

import React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  text: {
    transition: 'opacity 0.25s ease-out'
  },
  spinner: {
    transition: 'opacity 0.25s ease-in',
    position: 'absolute',
    left: 'calc(50%)',
    marginTop: '2px',
    transform: 'translateX(-50%)'
  },
  visible: {
    opacity: 1.0
  },
  hidden: {
    opacity: 0.0
  }
})

type Props = {
  +url: string,
  +classes: Object,
  +className: string,
  +loading: boolean,
  +onClick: () => void
}

const LoginButton = ({ url, classes, className, loading, onClick }: Props) => (
  <Button
    color="secondary"
    variant="raised"
    size="large"
    href={url}
    onClick={onClick}
    className={className}
  >
    <span
      className={[
        loading ? classes.hidden : classes.visible,
        classes.text
      ].join(' ')}
    >
      Login with Strava
    </span>
    <div className={classes.spinner}>
      <CircularProgress
        color="inherit"
        size={24}
        className={loading ? classes.visible : classes.hidden}
      />
    </div>
  </Button>
)

export default withStyles(styles)(LoginButton)
