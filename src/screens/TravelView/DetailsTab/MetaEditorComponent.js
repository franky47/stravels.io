// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import type { TravelID } from 'lib/types'

const styles = theme => ({
  root: {}
})

type Props = {
  +classes: { [key: string]: string },
  +open: boolean,
  +onClose: () => void,
  +title: string,
  +travelId: TravelID,
  // Redux-injected
  +renameTravel: (id: TravelID, title: string) => void
}

type State = {
  title: string
}

class MetaEditor extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title || 'Unnamed travel'
    }
  }

  render() {
    const { classes, open, onClose } = this.props
    const { title } = this.state
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            value={title}
            onChange={this.onChange}
            multiline={false}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={this.submit}>Done</Button>
        </DialogActions>
      </Dialog>
    )
  }
  onChange = ({ target }) => {
    this.setState({ title: target.value })
  }
  submit = () => {
    const { renameTravel, travelId, onClose } = this.props
    const { title } = this.state
    renameTravel(travelId, title)
    onClose()
  }
}

export default withStyles(styles)(MetaEditor)
