import React from 'react'
import Typography from '@material-ui/core/Typography'
import ActivityList from './ActivityList'
import { withTheme } from '@material-ui/core/styles'

const DetailsTab = ({ travel, activities }) => (
  <section>
    <Typography variant="title" noWrap>
      {travel.title}
    </Typography>
    <ActivityList activities={activities} />
  </section>
)

export default withTheme()(DetailsTab)
