import React from "react"
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { theme } from '../theme/create.theme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [(Story) => <ThemeProvider theme={theme}><CssBaseline /><Story/></ThemeProvider>];