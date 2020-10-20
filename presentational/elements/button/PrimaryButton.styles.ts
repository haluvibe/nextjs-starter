import { makeStyles } from '@material-ui/core/styles'

export const usePrimaryButtonStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    borderRadius: 3,
    height: 48,
    padding: '0 30px',
    '&$disabled': {
      '& $label': {
        color: theme.monochrome.darkest,
      },
    },
  },
  label: {
    color: theme.palette.primary.main,
  },
  disabled: {},
}))
