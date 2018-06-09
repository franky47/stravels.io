// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import TextField from '@material-ui/core/TextField'
// import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import Input from 'components/core/AutoSelectInput'

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
    const { open, onClose } = this.props
    const { title } = this.state
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              type="text"
              multiline={false}
              autoFocus
              value={title}
              onChange={this.onChange}
            />
          </FormControl>
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
