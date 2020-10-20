import React from 'react'
import { Button as MuiButton } from '@material-ui/core'
import { useDefaultButtonStyles } from './DefaultButton.styles'
import { usePrimaryButtonStyles } from './PrimaryButton.styles'
import { useSecondaryButtonStyles } from './SecondaryButton.styles'

export enum ButtonTypes {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
}

enum ButtonVariants {
  text = 'text',
  contained = 'contained',
  outlined = 'outlined',
}

export interface IButtonProps {
  type: 'default' | 'primary' | 'secondary'
  label: string
  handleClick: () => void
  disabled?: boolean
}

export const Button: React.FunctionComponent<IButtonProps> = ({
  type = ButtonTypes.default,
  label,
  handleClick,
  disabled,
}) => {
  let classes = useDefaultButtonStyles()
  let variant: keyof typeof ButtonVariants | undefined
  if (type === ButtonTypes.primary) {
    classes = usePrimaryButtonStyles()
    variant = ButtonVariants.contained
  }
  if (type === ButtonTypes.secondary) {
    classes = useSecondaryButtonStyles()
    variant = ButtonVariants.outlined
  }

  return (
    <MuiButton
      variant={variant}
      classes={{
        root: classes.root,
        label: classes.label,
        disabled: classes.disabled,
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </MuiButton>
  )
}
