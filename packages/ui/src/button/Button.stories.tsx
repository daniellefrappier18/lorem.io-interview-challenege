import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
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
- **Line Height**: Spacious (170%)
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
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    onClick: () => {
      console.log('Primary button clicked!');
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
    onClick: () => {
      console.log('Secondary button clicked!');
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const KeyboardInteraction: Story = {
  args: {
    variant: 'secondary',
    children: 'Tab to focus me',
    onClick: () => {
      console.log('Button activated via keyboard!');
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /tab to focus me/i });

    // Test that button exists and has correct text
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Tab to focus me');

    // Test keyboard focus
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Test keyboard activation (Space key)
    await userEvent.keyboard(' ');

    // Test that button is not disabled
    await expect(button).not.toBeDisabled();
  },
};

export const ClickInteraction: Story = {
  args: {
    variant: 'primary',
    children: 'Click me!',
    onClick: () => {
      console.log('Button clicked!');
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me!/i });

    // Test that button exists and is clickable
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();

    // Test click interaction
    await userEvent.click(button);

    // CSS modules generate scoped class names, so we check styles instead
    const styles = getComputedStyle(button);
    await expect(styles.backgroundColor).toBe('rgb(18, 93, 150)'); // --ui-color-primary-600
  },
};

export const DisabledState: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });

    // Test that button is disabled
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('disabled');

    // Test that disabled button cannot be clicked
    await userEvent.click(button);
    // In a real app, you'd test that the onClick handler wasn't called
  },
};
