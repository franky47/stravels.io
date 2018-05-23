import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import TravelBar from './TravelBar'

export default ({
  sections,
  focusedIndex,
  onPrev,
  onNext,
  onBack,
  focusOn
}) => (
  <Paper
    elevation={6}
    style={{
      position: 'relative',
      height: '120px'
    }}
  >
    <TravelBar
      sections={sections}
      focusedIndex={focusedIndex}
      focusOn={focusOn}
    />
    <button onClick={onPrev}>Previous</button>
    <button onClick={onNext}>Next</button>
    <button onClick={onBack}>Back</button>
  </Paper>
)
