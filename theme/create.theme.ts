import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { color } from '../presentational/materials/color.styles'

export const theme: Theme = createMuiTheme({
  palette: color.palette,
  monochrome: color.monochrome,
  border: color.border,
})
