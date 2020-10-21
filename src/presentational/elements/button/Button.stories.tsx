import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Button, ButtonTypes, IButtonProps } from './Button'

export default {
  title: 'elements/buttons/Button',
  component: Button,
} as Meta

const Template: Story<IButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  handleClick: () => null,
  label: 'Button',
  disabled: false,
}

export const Primary = Template.bind({})
Primary.args = {
  handleClick: () => null,
  label: 'Button',
  disabled: false,
  type: ButtonTypes.primary,
}

export const Secondary = Template.bind({})
Secondary.args = {
  handleClick: () => null,
  label: 'Button',
  disabled: false,
  type: ButtonTypes.secondary,
}
