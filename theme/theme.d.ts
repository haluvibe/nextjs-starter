import { Theme } from '@material-ui/core/styles/createMuiTheme'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    monochrome: {
      lightest: string
      lighter: string
      light: string
      mediumlight: string
      medium: string
      mediumdark: string
      dark: string
      darker: string
      darkest: string
    }
    border: string
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    monochrome: {
      lightest: string
      lighter: string
      light: string
      mediumlight: string
      medium: string
      mediumdark: string
      dark: string
      darker: string
      darkest: string
    }
    border: string
  }
}
