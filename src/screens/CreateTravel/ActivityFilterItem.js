// @flow

import * as React from 'react'

// Material UI Components
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'

import type { ActivityFilterItem } from 'lib/types'

type Props = {
  +name: ActivityFilterItem,
  +state: boolean,
  +onToggle: (item: ActivityFilterItem) => void
}

export default class ActivityFilterItemView extends React.Component<Props> {
  render() {
    const { name, state } = this.props
    return (
      <ListItem>
        {/* <ListItemIcon>
    <WifiIcon />
  </ListItemIcon> */}
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <Switch
            onChange={this.handleToggle}
            checked={state}
            color="primary"
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
  handleToggle = () => {
    this.props.onToggle(this.props.name)
  }
}
