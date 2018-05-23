// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    textAlign: 'center'
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
  +classes: any,
  +name: string,
  +value: string,
  +unit: ?string
}

const StatItem = ({ classes, name, value, unit }: Props) => (
  <div className={classes.container}>
    <Typography variant="button" className={classes.value} component="div">
      {value}
      {unit && <span className={classes.unit}> {unit}</span>}
    </Typography>
    <Typography variant="button" className={classes.name} component="div">
      {name}
    </Typography>
  </div>
)

export default withStyles(styles)(StatItem)
