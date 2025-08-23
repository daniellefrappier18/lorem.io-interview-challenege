import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Test/Simple',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTest: Story = {
  render: () => <div>Hello World</div>,
};
