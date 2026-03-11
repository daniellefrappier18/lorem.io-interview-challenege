import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ModeModal } from './ModeModal';

const meta: Meta<typeof ModeModal> = {
  title: 'Components/Chat/ModeModal',
  component: ModeModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    isOpen: true,
    onClose: fn(),
    onModeSelect: fn(),
    selectedMode: 'standard',
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: '400px', minWidth: '350px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
