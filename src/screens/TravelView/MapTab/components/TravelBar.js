// @flow
import React from 'react'

import './TravelBar.css'

type Section = {
  +distance: number,
  +color: string
}

type Line = {
  +x1: number,
  +x2: number,
  +color: string
}

type Sections = Array<Section>
type Lines = Array<Line>

const transformSections = (sections: Sections): Lines => {
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

// --

class ClickableLine extends React.Component<any> {
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

// --

type Props = {
  sections: Sections,
  focusedIndex: number,
  focusOn: (index: number) => void
}

export default ({ sections, focusedIndex, focusOn }: Props) => {
  const focus = focusedIndex >= 0
  const lines = transformSections(sections)
  const cursor = focus
    ? lines[focusedIndex]
    : {
        x1: 0.0,
        x2: 1.0,
        color: '#ffffff00'
      }
  const overviewClass = `overview ${focus ? 'focused' : ''}`
  return (
    <svg
      // version="1.1"
      // xmlns="http://www.w3.org/2000/svg"
      className="travel-bar"
      viewBox="0 0 1 1"
      preserveAspectRatio="none" // Allow scaling
    >
      <g className={overviewClass}>
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
        className="cursor"
        d={`M ${cursor.x1} 0.5 L ${cursor.x2} 0.5`}
        stroke={cursor.color}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
