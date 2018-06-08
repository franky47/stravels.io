// @flow

import * as React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core'

// Type Definitions --

type Section = {
  +distance: number,
  +color: string
}

type Line = {
  +x1: number,
  +x2: number,
  +color: string
}

// --

const transformSections = (sections: Section[]): Line[] => {
  const sum = sections.reduce((sum, section) => sum + section.distance, 0)
  const out = []
  let x = 0
  for (const section of sections) {
    const w = section.distance / sum
    out.push({
      x1: x,
      x2: x + w,
      color: section.color
    })
    x += w
  }
  return out
}

// -----------------------------------------------------------------------------

type ClickableLineProps = Line & {
  +index: number,
  +focusOn: (index: number) => void
}

class ClickableLine extends React.Component<ClickableLineProps> {
  onClick = () => {
    this.props.focusOn(this.props.index)
  }
  render() {
    const { x1, x2, color } = this.props
    return (
      <line
        x1={x1}
        x2={x2}
        y1={0.5}
        y2={0.5}
        stroke={color}
        vectorEffect="non-scaling-stroke"
        onClick={this.onClick}
      />
    )
  }
}

// -----------------------------------------------------------------------------

const styles = theme => ({
  root: {
    display: 'block',
    width: '100%',
    height: 8,
    overflow: 'visible',
    cursor: 'pointer',

    '& line, & path': {
      strokeWidth: 8,
      transition: 'all 0.2s ease-out'
    }
  },
  focus: {
    opacity: 0.1
  },
  cursor: {
    transition: 'all 0.2s ease-out',
    strokeLinecap: 'round',
    pointerEvents: 'none'
  }
})

type Props = {
  +classes: { [key: string]: string },
  +sections: Section[],
  +focusedIndex: number,
  +focusOn: (index: number) => void
}

const TravelBar = ({ classes, sections, focusedIndex, focusOn }: Props) => {
  const focus = focusedIndex >= 0
  const lines = transformSections(sections)
  const cursor = focus
    ? lines[focusedIndex]
    : {
        x1: 0.0,
        x2: 1.0,
        color: '#ffffff00'
      }

  return (
    <svg
      className={classes.root}
      viewBox="0 0 1 1"
      preserveAspectRatio="none" // Allow scaling
    >
      <g
        className={classNames({
          [classes.focus]: focus
        })}
      >
        {lines.map(({ x1, x2, color }, i) => (
          <ClickableLine
            key={i}
            index={i}
            focusOn={focusOn}
            x1={x1}
            x2={x2}
            color={color}
          />
        ))}
      </g>
      <path
        className={classes.cursor}
        d={`M ${cursor.x1} 0.5 L ${cursor.x2} 0.5`}
        stroke={cursor.color}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default withStyles(styles)(TravelBar)
