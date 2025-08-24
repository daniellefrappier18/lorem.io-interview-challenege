import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './VisuallyHidden';
import { Input } from '../input/Input';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Utilities/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The VisuallyHidden component hides content from visual users while keeping it accessible to screen readers and other assistive technologies.

## When to Use
- Form labels that would clutter the visual design
- Additional context for screen reader users
- Descriptive text for icon-only buttons or controls

## Best Practices
- Use when you need to provide context for assistive technology users
- Don't use to hide important information from all users
- Always test with actual screen readers
- Consider if visible labels might be better for all users

## Technical Implementation
Uses the "screen reader only" CSS technique that:
- Positions content off-screen (not \`display: none\` or \`visibility: hidden\`)
- Maintains accessibility for assistive technologies
- Follows WCAG guidelines for accessible content hiding
- Includes modern \`clip-path\` for better browser support

## Accessibility
- ✅ Content remains in DOM and accessible to screen readers
- ✅ Preserves semantic meaning and context
- ✅ Supports keyboard navigation when focused
- ✅ Works with all assistive technologies
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be visually hidden',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This text is visually hidden but accessible to screen readers',
  },
  render: (args) => (
    <div>
      <p>Visible text before</p>
      <VisuallyHidden {...args} />
      <p>Visible text after</p>
      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#666',
        }}
      >
        💡 The hidden text is between the visible paragraphs but only accessible to screen readers.
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  name: 'Form Label Example',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label htmlFor="search" style={{ position: 'absolute', left: '-10000px' }}>
          <VisuallyHidden>Search for products in our catalog</VisuallyHidden>
        </label>
        <Input id="search" type="text" placeholder="🔍 Search..." />
      </div>
      <div
        style={{
          fontSize: '14px',
          color: '#666',
          fontStyle: 'italic',
        }}
      >
        The input has a visually hidden label for screen readers while showing a placeholder to
        sighted users.
      </div>
    </div>
  ),
};

export const IconButton: Story = {
  name: 'Icon Button Context',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <button
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >
        ❤️
        <VisuallyHidden>Add to favorites</VisuallyHidden>
      </button>

      <button
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >
        🗑️
        <VisuallyHidden>Delete item</VisuallyHidden>
      </button>

      <button
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
      >
        📤
        <VisuallyHidden>Share this content</VisuallyHidden>
      </button>

      <div
        style={{
          marginLeft: '16px',
          fontSize: '14px',
          color: '#666',
          fontStyle: 'italic',
        }}
      >
        Icon buttons with descriptive text for screen readers
      </div>
    </div>
  ),
};
