import React from "react"
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../styles/create.theme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [(Story) => <ThemeProvider theme={theme}><Story/></ThemeProvider>];