// @flow

import React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import ListRow from './ListRow'
import type { Travel } from 'lib/types'

// -----------------------------------------------------------------------------

const styles = theme => ({
  root: {
    width: '100%',
    userSelect: 'none'
  }
})

type Props = {
  +classes: any,
  +travels: Array<Travel>,
  +editing: boolean
}

const TravelList = ({ classes, travels = [], editing }: Props) => {
  if (travels.length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      <List>
        {travels.map(travel => (
          <ListRow key={travel.id} travel={travel} showDelete={editing} />
        ))}
      </List>
    </div>
  )
}

export default withStyles(styles)(TravelList)
