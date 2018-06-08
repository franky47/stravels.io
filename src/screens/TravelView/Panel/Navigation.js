// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

// Icons
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import ArrowRight from '@material-ui/icons/KeyboardArrowRight'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing.unit
  },
  textContainer: {
    flex: 1,
    textAlign: 'center',
    minWidth: 0 // https://css-tricks.com/flexbox-truncated-text/
  }
})

type Props = {
  +classes: { [key: string]: string },
  +title: string,
  +date: string,
  +onPrevious: () => void,
  +onNext: () => void
}

const Navigation = ({ classes, title, date, onPrevious, onNext }: Props) => (
  <div className={classes.root}>
    <IconButton onClick={onPrevious}>
      <ArrowLeft />
    </IconButton>
    <div className={classes.textContainer}>
      <Typography variant="subheading" noWrap>
        {title}
      </Typography>
      <Typography variant="caption">{date}</Typography>
    </div>
    <IconButton onClick={onNext}>
      <ArrowRight />
    </IconButton>
  </div>
)

export default withStyles(styles)(Navigation)
