export const makeGrid = ({
  subdiv = 5,
  size = 24,
  thickness = 1,
  majorColor = 'white',
  minorColor = '#f3f3ed',
  backgroundColor = '#eceedc'
} = {}) => ({
  backgroundColor,
  backgroundSize: [
    [subdiv * size, subdiv * size],
    [subdiv * size, subdiv * size],
    [size, size],
    [size, size]
  ],
  backgroundImage: `
    linear-gradient(
      ${majorColor} ${thickness}px,
      transparent ${thickness}px
    ),
    linear-gradient(
      90deg,
      ${majorColor} ${thickness}px,
      transparent ${thickness}px
    ),
    linear-gradient(
      ${minorColor} ${thickness}px,
      transparent ${thickness}px
    ),
    linear-gradient(
      90deg,
      ${minorColor} ${thickness}px,
      transparent ${thickness}px
    )
  `
})
