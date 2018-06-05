// @flow

import * as React from 'react'
import { connect } from 'react-redux'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'

import type { ActivityFilterItem } from 'lib/types'

const styles = theme => ({
  root: {
    // display: 'block',
    // margin: '0 auto'
    // width: '100%'
  }
})

type Props = {
  +classes: { [key: string]: string },
  +open: boolean,
  +onClose: () => void
}

const items = [
  'Ride',
  'Run',
  'Walk',
  'Hike',
  'Backcountry Ski',
  'Nordic Ski',
  'Snowshoe',
  'Canoe',
  'Kayak',
  'Handcycle',
  'Inline Skate'
]

class ActivityFilter extends React.Component<Props> {
  render() {
    const { classes, open, onClose } = this.props
    return (
      <Dialog
        open={open}
        className={classes.root}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Activity Filter</DialogTitle>
        <DialogContent>
          <List>{items.map(this.renderItem)}</List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  renderItem = item => (
    <ListItem>
      {/* <ListItemIcon>
    <WifiIcon />
  </ListItemIcon> */}
      <ListItemText primary={item} />
      <ListItemSecondaryAction>
        <Switch
          // onChange={this.handleToggle('wifi')}
          checked={false}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default withStyles(styles)(ActivityFilter)
