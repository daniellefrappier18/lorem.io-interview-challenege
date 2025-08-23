import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Button component is a fundamental UI element used for user interactions. It supports different variants and states to provide clear visual hierarchy and feedback.

## Design Specifications
- **Height**: Flexible based on content
- **Padding**: 10px vertical, 16px horizontal  
- **Border Radius**: 100px (fully rounded)
- **Gap**: 6px between child elements
- **Font**: Hanken Grotesk, medium weight (600)
- **Font Size**: 15px
- **Minimum Width**: 78px
- **Maximum Width**: 300px

## Interactive States

### Primary Button
- **Default**: Primary 600 background
- **Hover/Active**: Primary 700 background

### Secondary Button  
- **Default**: Transparent background with primary 600 border
- **Hover**: Gray 100 background
- **Active**: Gray 150 background

## Usage

\`\`\`tsx
import { Button } from 'ui';

<Button variant="primary" onClick={() => console.log('clicked')}>
  Click me
</Button>
\`\`\`

## Accessibility
- Buttons are keyboard accessible via Tab and Enter/Space keys
- Focus states provide clear visual feedback
- Disabled buttons cannot be interacted with and have reduced opacity
- Color contrast meets WCAG guidelines
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
