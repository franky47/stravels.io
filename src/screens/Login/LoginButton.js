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
  +className: string
}
type State = {
  loading: boolean
}

class LoginButton extends React.Component<Props, State> {
  state = {
    loading: false
  }

  render() {
    const { url, classes, className } = this.props
    const { loading } = this.state
    return (
      <Button
        color="secondary"
        variant="raised"
        href={url}
        onClick={this.setLoading}
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
  }
  setLoading = () => {
    this.setState(prevState => ({
      loading: !prevState.loading
    }))
  }
}

export default withStyles(styles)(LoginButton)
