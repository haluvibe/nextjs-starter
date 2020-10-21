import { makeStyles } from '@material-ui/core/styles'

export const useSecondaryButtonStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 3,
    color: theme.palette.primary.main,
    height: 48,
    padding: '0 30px',
    '&$disabled': {
      '& $label': {
        color: theme.monochrome.mediumlight,
      },
    },
  },
  label: {
    color: theme.palette.secondary.main,
  },
  disabled: {},
}))
