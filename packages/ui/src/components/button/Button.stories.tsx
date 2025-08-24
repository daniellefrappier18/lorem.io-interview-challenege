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
- **Padding**: Uses design token \`--ui-space-md\`
- **Border Radius**: Uses design token \`--ui-radius-full\` 
- **Line Height**: Uses design token \`--ui-line-height-spacious\` (170%)
- **Font**: Uses design token \`--ui-font-family-primary\` (Hanken Grotesk)
- **Font Size**: Uses design token \`--ui-font-size-md\`
- **Font Weight**: Uses design token \`--ui-font-weight-semibold\`
- **Minimum Width**: 78px
- **Maximum Width**: 300px
- **Transition**: All properties transition with 0.2s ease
- **Transform**: Hover state includes \`translateY(-1px)\` for subtle lift effect

## Interactive States

### Primary Button
- **Default**: \`--ui-color-primary-600\` background, white text
- **Hover/Active**: \`--ui-color-primary-700\` background with transform lift
- **Focus**: Blue focus ring using \`--ui-color-primary-100\`
- **Disabled**: \`--ui-color-gray-150\` background, \`--ui-color-gray-400\` text

### Secondary Button  
- **Default**: Transparent background with \`--ui-color-gray-300\` border
- **Hover**: \`--ui-color-gray-100\` background with transform lift
- **Active**: \`--ui-color-gray-150\` background
- **Focus**: Blue focus ring using \`--ui-color-primary-100\`

## Usage

\`\`\`tsx
import { Button } from 'ui';

<Button variant="primary" onClick={() => console.log('clicked')}>
  Click me
</Button>
\`\`\`

## Accessibility
- Buttons are keyboard accessible via Tab and Enter/Space keys
- Focus states provide clear visual feedback with 3px focus ring
- Disabled buttons cannot be interacted with and have appropriate color contrast
- Color contrast meets WCAG guidelines
- Focus outline removed in favor of custom focus ring for consistency
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
