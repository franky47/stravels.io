// @flow

import * as React from 'react'

// Material UI Components
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

// Icons
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import ArrowRight from '@material-ui/icons/KeyboardArrowRight'
import ZoomOutIcon from '@material-ui/icons/ZoomOutMap'

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
  +onNext: () => void,
  +zoomOutPrevious: boolean,
  +zoomOutNext: boolean
}

const Navigation = ({
  classes,
  title,
  date,
  onPrevious,
  onNext,
  zoomOutPrevious,
  zoomOutNext
}: Props) => (
  <div className={classes.root}>
    <IconButton onClick={onPrevious}>
      {zoomOutPrevious ? <ZoomOutIcon /> : <ArrowLeft />}
    </IconButton>
    <div className={classes.textContainer}>
      <Typography variant="subheading" noWrap>
        {title}
      </Typography>
      <Typography variant="caption">{date}</Typography>
    </div>
    <IconButton onClick={onNext}>
      {zoomOutNext ? <ZoomOutIcon /> : <ArrowRight />}
    </IconButton>
  </div>
)

export default withStyles(styles)(Navigation)
