import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// Colors
import deepOrange from '@material-ui/core/colors/deepOrange'

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#32cd32' // limegreen
    },
    secondary: {
      main: deepOrange['500']
    }
  },
  status: {
    danger: 'orange'
  }
})

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
)
