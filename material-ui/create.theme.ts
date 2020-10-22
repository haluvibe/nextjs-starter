import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { color } from '../src/presentational/foundation/color'

export const theme: Theme = createMuiTheme({
  palette: color.palette,
  monochrome: color.monochrome,
  border: color.border,
})
