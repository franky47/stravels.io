// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'

import ActivityFilterItemView from './ActivityFilterItem'
import type { ActivityFilterItem } from 'lib/types'

const styles = theme => ({
  root: {},
  content: {
    maxHeight: '50vh'
  }
})

type Props = {
  +classes: { [key: string]: string },
  +open: boolean,
  +onClose: () => void,
  // Redux-injected
  +items: { [key: ActivityFilterItem]: boolean },
  +toggleActivityFilterItem: (item: ActivityFilterItem) => void
}

const ActivityFilter = ({
  classes,
  open,
  onClose,
  items,
  toggleActivityFilterItem
}: Props) => (
  <Dialog
    open={open}
    className={classes.root}
    onClose={onClose}
    fullWidth
    maxWidth="xs"
  >
    <DialogTitle>Activity Filter</DialogTitle>
    <DialogContent className={classes.content}>
      <List>
        {Object.keys(items).map(item => (
          <ActivityFilterItemView
            key={item}
            name={item}
            state={items[item]}
            onToggle={toggleActivityFilterItem}
          />
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
)

export default withStyles(styles)(ActivityFilter)
