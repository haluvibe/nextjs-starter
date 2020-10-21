import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Loading } from './Loading'

export default {
  title: 'elements/loading',
  component: Loading,
} as Meta

const Template: Story = () => <Loading />

export const Default = Template.bind({})
