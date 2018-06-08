// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    margin: 0
  },
  value: {
    fontSize: '125%'
  },
  unit: {
    color: theme.palette.text.secondary,
    fontSize: '75%'
  },
  name: {
    color: theme.palette.text.secondary,
    fontWeight: 400
  }
})

type Props = {
  +classes: { [key: string]: string },
  +name: string,
  +value: string,
  +unit: ?string
}

const StatItem = ({ classes, name, value, unit }: Props) => (
  <li className={classes.container}>
    <Typography
      className={classes.value}
      component="div"
      // variant="body2"
      align="center"
    >
      {value}
      {unit && <span className={classes.unit}> {unit.toUpperCase()}</span>}
    </Typography>
    <Typography
      // variant="button"
      className={classes.name}
      component="div"
      align="center"
    >
      {name.toUpperCase()}
    </Typography>
  </li>
)

export default withStyles(styles)(StatItem)
