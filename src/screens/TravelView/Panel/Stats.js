// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'

import StatItem from './StatItem'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    listStyle: 'none'
  }
})

type Props = {
  +classes: { [key: string]: string },
  +distance: string,
  +elevation: string,
  +movingTime: string
}

const Stats = ({ classes, distance, elevation, movingTime }: Props) => (
  <ul className={classes.root}>
    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis urna justo,
    elementum eget purus eget, maximus tempus orci. Praesent at mauris nibh.
    Praesent eros elit, fringilla at ipsum et, placerat suscipit ligula. Cras eu
    convallis quam. Nulla in iaculis enim. Nullam luctus nisl a mi ornare
    ullamcorper. Sed accumsan urna dui, eu scelerisque ipsum eleifend ut.
    Aliquam convallis nunc dui, sit amet bibendum felis gravida accumsan.
    Curabitur finibus dolor at vestibulum gravida. Sed efficitur id ex */}
    <StatItem name="distance" value={distance} unit="km" />
    <StatItem name="elevation" value={elevation} unit="m" />
    <StatItem name="duration" value={movingTime} />
  </ul>
)

export default withStyles(styles)(Stats)
