import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { color } from '../src/presentational/materials/color'

export const theme: Theme = createMuiTheme({
  palette: color.palette,
  monochrome: color.monochrome,
  border: color.border,
})
