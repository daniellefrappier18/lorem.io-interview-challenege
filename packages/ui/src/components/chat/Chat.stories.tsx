import type { Meta, StoryObj } from '@storybook/react';
import { Chat } from './Chat';

const meta: Meta<typeof Chat> = {
  title: 'Components/Chat',
  component: Chat,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Chat component is a complete chat interface with text input, action buttons, and mode selection. It provides an intuitive user experience for conversational interfaces.

## Features
- Text input with customizable placeholder
- Attachment button for file uploads
- Mode selection modal (Standard/Fast modes)
- Send functionality with keyboard shortcuts
- Responsive design matching modern chat interfaces
- Built-in mode persistence and callbacks

## Usage

\`\`\`tsx
import { Chat } from 'ui';

<Chat 
  placeholder="Ask a follow up..."
  onSend={(message) => console.log('Sending:', message)}
  onModeChange={(mode) => console.log('Mode changed to:', mode)}
  initialMode="standard"
/>
\`\`\`

## Interactive Elements
- **Attachment Button**: Click to trigger file attachment (first button)
- **Mode Button**: Click to open mode selection modal (second button) 
- **Send Button**: Click or press Enter to send message (arrow button)
- **Mode Modal**: Select between Standard and Fast response modes
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    onSend: {
      action: 'message sent',
      description: 'Callback function called when a message is sent',
    },
    onModeChange: {
      action: 'mode changed',
      description: 'Callback function called when response mode is changed',
    },
    initialMode: {
      control: { type: 'radio', options: ['standard', 'fast'] },
      description: 'Initial response mode selection',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Ask a follow up...',
    onSend: (message: string) => console.log('Sending message:', message),
    onModeChange: (mode: 'standard' | 'fast') => console.log('Mode changed to:', mode),
    initialMode: 'standard',
  },
};

export const FastMode: Story = {
  args: {
    placeholder: 'Quick question...',
    onSend: (message: string) => console.log('Sending message:', message),
    onModeChange: (mode: 'standard' | 'fast') => console.log('Mode changed to:', mode),
    initialMode: 'fast',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'What would you like to know?',
    onSend: (message: string) => console.log('Sending message:', message),
    onModeChange: (mode: 'standard' | 'fast') => console.log('Mode changed to:', mode),
    initialMode: 'standard',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Chat is currently disabled',
    onSend: (message: string) => console.log('Sending message:', message),
    onModeChange: (mode: 'standard' | 'fast') => console.log('Mode changed to:', mode),
    initialMode: 'standard',
    disabled: true,
  },
};
