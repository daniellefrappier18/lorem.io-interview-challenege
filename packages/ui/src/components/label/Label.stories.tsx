import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A reusable label component for form controls. Provides standardized text styling and proper semantic labeling for form elements.

## Design Specifications
#### Size Variants

**Medium (md) - Default Size**
- **Font Size**: Uses design token \`--ui-font-size-md\` (16px)
- **Line Height**: Uses design token \`--ui-line-height-spacious\` (170%)
- **Font Weight**: Uses design token \`--ui-font-weight-semibold\` (600)
- **Font Family**: Uses design token \`--ui-font-family-primary\` (Hanken Grotesk)

**Small (sm) - Compact Size**
- **Font Size**: Uses design token \`--ui-font-size-sm\` (14px)
- **Line Height**: Uses design token \`--ui-line-height-very-spacious\` (180%)
- **Font Weight**: Uses design token \`--ui-font-weight-semibold\` (600)
- **Font Family**: Uses design token \`--ui-font-family-primary\` (Hanken Grotesk)

**Extra Small (xs) - Minimal Size**
- **Font Size**: Uses design token \`--ui-font-size-xs\` (12px)
- **Line Height**: Uses design token \`--ui-line-height-very-spacious\` (170%)
- **Font Weight**: Uses design token \`--ui-font-weight-semibold\` (600)
- **Font Family**: Uses design token \`--ui-font-family-primary\` (Hanken Grotesk)


### Usage Guidelines

#### Best Practices
- Always associate labels with form controls using \`htmlFor\`
- Use descriptive, concise label text
- Consider label length when choosing size variants
- Maintain consistent sizing within form groups
- Test with screen readers for accessibility validation

#### Common Patterns
\`\`\`tsx
// Standard form labeling
<Label htmlFor="email" size="md">Email Address</Label>
<input id="email" type="email" />

// Compact form layouts
<Label htmlFor="phone" size="sm">Phone</Label>
<input id="phone" type="tel" />

// Dense information displays
<Label size="xs">Last Updated</Label>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Size variant of the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the label should appear disabled',
    },
    htmlFor: {
      control: 'text',
      description: 'The id of the form control this label is for',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label text',
    size: 'md',
    disabled: false,
  },
};

export const Sizes: Story = {
  name: 'Size Variants',
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
    >
      <Label size="xs">Extra Small Label</Label>
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label (Default)</Label>
    </div>
  ),
};

export const States: Story = {
  name: 'States',
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
    >
      <Label>Normal Label</Label>
      <Label disabled>Disabled Label</Label>
    </div>
  ),
};
