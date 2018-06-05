// @flow

import React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ActivityList from './ActivityList'
import MetaEditor from './MetaEditorContainer'

import type { Travel, ActivityDetails } from 'lib/types'

const styles = theme => ({
  root: {}
})

type Props = {
  +classes: { [key: string]: string },
  +travel: Travel,
  +activities: Array<ActivityDetails>
}

type State = {
  editorOpen: boolean
}

class DetailsTab extends React.Component<Props, State> {
  state = {
    editorOpen: false
  }

  render() {
    const { activities, travel } = this.props
    const { editorOpen } = this.state
    return (
      <section>
        <Typography variant="title" noWrap>
          {travel.title}
        </Typography>
        <Button onClick={this.openEditor}>Edit</Button>
        <ActivityList activities={activities} />
        <MetaEditor
          open={editorOpen}
          onClose={this.closeEditor}
          travelId={travel.id}
          title={travel.title}
        />
      </section>
    )
  }

  // --

  openEditor = () => {
    this.setState({ editorOpen: true })
  }
  closeEditor = () => {
    this.setState({ editorOpen: false })
  }
}

export default withStyles(styles)(DetailsTab)
