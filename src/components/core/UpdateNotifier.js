// @flow

import * as React from 'react'
import Media from 'react-media'

// Material UI Components
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const onClick = () => {
  // true = force reload from server, ignore cache
  window.location.reload(true)
}

type Props = {
  +open: boolean
}

export default ({ open }: Props) => (
  <Snackbar
    open={open}
    ContentProps={{ 'aria-describedby': 'message-id' }}
    message={
      <span id="message-id">
        <Media query="(min-width: 400px)">
          {(large: boolean) =>
            large
              ? 'A new version of Stravels is available'
              : 'New version available'
          }
        </Media>
      </span>
    }
    action={
      <Button color="primary" size="small" onClick={onClick}>
        Refresh
      </Button>
    }
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    autoHideDuration={null}
  />
)
