import { green, red, indigo, blue, orange, grey } from '@material-ui/core/colors'

export const color = {
  // Palette
  palette: {
    primary: {
      main: indigo[500],
      text: 'black',
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    success: {
      main: green['A400'],
    },
    error: {
      main: red[500],
    },
    warning: {
      main: orange[500],
    },
    info: {
      main: blue[500],
    },
  },
  // Monochrome
  monochrome: {
    lightest: grey[100],
    lighter: grey[200],
    light: grey[300],
    mediumlight: grey[400],
    medium: grey[500],
    mediumdark: grey[600],
    dark: grey[700],
    darker: grey[800],
    darkest: grey[900],
  },
  border: 'rgba(0,0,0,.1)',
}
