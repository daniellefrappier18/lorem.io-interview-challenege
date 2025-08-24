import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioButton } from '../radio-button/RadioButton';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A customizable radio button component with label sizing and variant options. Supports both default and card-style variants for different UI contexts.

## Usage Patterns

### Controlled vs Uncontrolled RadioButtons

RadioButton components support both controlled and uncontrolled usage patterns, giving you flexibility based on your form management approach.

#### Controlled RadioButtons (Recommended)
Use controlled components when you need to manage the radio button state in React:

\`\`\`tsx
const [selectedValue, setSelectedValue] = useState('option1');

<RadioButton
  name="choices"
  value="option1"
  checked={selectedValue === 'option1'}
  onChange={(e) => setSelectedValue(e.target.value)}
  label="Option 1"
/>
<RadioButton
  name="choices"
  value="option2"
  checked={selectedValue === 'option2'}
  onChange={(e) => setSelectedValue(e.target.value)}
  label="Option 2"
/>
\`\`\`

**Complete Example with State Management:**
\`\`\`tsx
function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState('medium');
  
  return (
    <div>
      <h3>Choose Size</h3>
      <RadioButton
        name="size"
        value="small"
        checked={selectedSize === 'small'}
        onChange={(e) => setSelectedSize(e.target.value)}
        label="Small"
      />
      <RadioButton
        name="size"
        value="medium"
        checked={selectedSize === 'medium'}
        onChange={(e) => setSelectedSize(e.target.value)}
        label="Medium"
      />
      <RadioButton
        name="size"
        value="large"
        checked={selectedSize === 'large'}
        onChange={(e) => setSelectedSize(e.target.value)}
        label="Large"
      />
      <p>Selected: {selectedSize}</p>
    </div>
  );
}
\`\`\`

**Benefits of Controlled:**
- Full control over component state
- Easy to implement validation
- State can be easily shared with other components
- Predictable behavior for complex forms

#### Uncontrolled RadioButtons
Use uncontrolled components for simpler forms or when integrating with form libraries:

\`\`\`tsx
// Basic uncontrolled with defaultChecked
<RadioButton
  name="choices"
  value="option1"
  defaultChecked
  onChange={(e) => console.log('Selected:', e.target.value)}
  label="Option 1"
/>
<RadioButton
  name="choices"
  value="option2"
  onChange={(e) => console.log('Selected:', e.target.value)}
  label="Option 2"
/>
\`\`\`

**Form Submission Example:**
\`\`\`tsx
function ThemeSelector() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const theme = formData.get('theme');
    console.log('Selected theme:', theme);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h3>Select Theme</h3>
      <RadioButton
        name="theme"
        value="light"
        defaultChecked
        label="Light Theme"
      />
      <RadioButton
        name="theme"
        value="dark"
        label="Dark Theme"
      />
      <RadioButton
        name="theme"
        value="auto"
        label="Auto (System)"
      />
      <button type="submit">Save Preferences</button>
    </form>
  );
}
\`\`\`

**With React Hook Form:**
\`\`\`tsx
import { useForm } from 'react-hook-form';

function FormExample() {
  const { register, handleSubmit, watch } = useForm();
  
  const onSubmit = (data) => {
    console.log('Form data:', data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioButton
        {...register('preference')}
        value="option1"
        label="Option 1"
      />
      <RadioButton
        {...register('preference')}
        value="option2"
        label="Option 2"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

**Benefits of Uncontrolled:**
- Less boilerplate code
- Better performance for large forms
- Works seamlessly with form libraries
- Closer to native HTML behavior

#### Key Props for Both Patterns
- **\`name\`** (required): Groups radio buttons together
- **\`value\`** (required): Unique value for each option
- **\`checked\`**: For controlled components
- **\`defaultChecked\`**: For uncontrolled components (via ...props)
- **\`onChange\`**: Handler for both patterns

## Design Specifications

### Default Variant
- **Radio Button**: 28px × 28px circular input
- **Border**: 2px solid using \`--ui-color-gray-300\`
- **Background**: \`--ui-color-white\`
- **Gap**: Uses design token \`--ui-space-sm\` between radio and label
- **Layout**: Flexbox with center alignment
- **Transition**: All properties with 0.2s ease-in-out
- **Font**: Uses design token \`--ui-font-family-primary\` (Hanken Grotesk)

### Card Variant
- **Container**: Minimum width 256px with card-style presentation
- **Padding**: Uses design tokens \`--ui-space-xl\` and \`--ui-space-2xl\`
- **Border**: 1px solid using \`--ui-color-gray-250\`
- **Border Radius**: Uses design token \`--ui-radius-lg\`
- **Background**: \`--ui-color-white\`
- **Label Margin**: \`--ui-space-xl\` left margin for proper spacing

### Label Sizing
- **Extra Small (xs)**: Uses \`--ui-font-size-xs\` with \`--ui-line-height-very-spacious\`
- **Small (sm)**: Uses \`--ui-font-size-sm\` with \`--ui-line-height-very-spacious\`
- **Medium (md)**: Uses \`--ui-font-size-md\` with \`--ui-line-height-spacious\`
- **Weight**: Uses \`--ui-font-weight-semibold\` for all sizes
- **Selection**: User selection disabled for better UX

## Interactive States

### Default Variant States
- **Default**: Gray border (\`--ui-color-gray-300\`) with white background
- **Hover**: \`--ui-color-gray-100\` background, \`--ui-color-gray-600\` border
- **Checked**: \`--ui-color-primary-500\` background, \`--ui-color-primary-100\` border with 12px white dot
- **Focus**: 3px focus ring using \`--ui-color-primary-100\`
- **Disabled**: \`--ui-color-gray-200\` border, \`--ui-color-gray-100\` background, 0.6 opacity

### Card Variant States
- **Default**: Light gray border (\`--ui-color-gray-250\`) with white background
- **Hover**: \`--ui-color-gray-300\` border, \`--ui-color-gray-100\` background
- **Checked**: \`--ui-color-primary-500\` border, \`--ui-color-primary-50\` background with 3px focus ring
- **Disabled**: \`--ui-color-gray-150\` background with disabled cursor

### Label States
- **Default**: \`--ui-color-text-primary\` with semibold weight
- **Disabled**: \`--ui-color-gray-400\` with reduced contrast

## Usage

\`\`\`tsx
import { RadioButton } from 'ui';

// Default radio button
<RadioButton 
  name="options" 
  value="option1" 
  label="Standard Option" 
/>

// Card variant
<RadioButton 
  name="options" 
  value="option2" 
  label="Card Style Option" 
  variant="card"
  labelSize="sm"
/>
\`\`\`

## Accessibility
- Radio buttons are keyboard accessible via Tab and Space/Enter keys
- Focus states provide clear visual feedback with 3px focus ring
- Disabled radio buttons cannot be interacted with and have appropriate color contrast
- Semantic HTML with proper radio input element
- Labels are properly associated with inputs for screen reader support
- Color contrast meets WCAG guidelines for all states
- Grouped radio buttons allow arrow key navigation

### Accessibility for Radio Buttons Without Labels
When using radio buttons without visible labels (label prop omitted), you must provide alternative accessibility methods:

#### Required ARIA Attributes
\`\`\`tsx
// Using aria-label for simple descriptions
<RadioButton 
  name="size" 
  value="small" 
  aria-label="Small size option"
/>

// Using aria-labelledby to reference existing text
<div id="size-heading">Choose Size</div>
<RadioButton 
  name="size" 
  value="medium" 
  aria-labelledby="size-heading"
/>

// Using aria-describedby for additional context
<RadioButton 
  name="color" 
  value="red" 
  aria-label="Red color"
  aria-describedby="color-description"
/>
<div id="color-description">Primary brand color selection</div>
\`\`\`

#### Best Practices for Label-less Radio Buttons
- **Always** provide \`aria-label\` or \`aria-labelledby\` when omitting visible labels
- **Use descriptive text** that clearly explains the option's purpose
- **Group related options** with \`fieldset\` and \`legend\` elements for context
- **Consider visual alternatives** like icons with proper \`alt\` text or tooltips
- **Test with screen readers** to ensure the experience is clear and intuitive

⚠️ **Important**: Never use radio buttons without both visible labels AND accessible labels unless absolutely necessary. The combination provides the best user experience for all users.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labelSize: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Size of the label text',
    },
    variant: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Visual style variant of the radio button',
    },
    label: {
      control: 'text',
      description: 'Label text to display next to the radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked',
    },
  },
  args: {
    name: 'radio-group',
    value: 'option1',
    labelSize: 'md',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Radio Button',
  },
};

export const Card: Story = {
  args: {
    label: 'Card Style Radio Button',
    variant: 'card',
  },
};

export const LabelSizes: Story = {
  name: 'Label Sizes',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioButton name="size-group" value="xs" label="Extra Small Label" labelSize="xs" />
        <RadioButton name="size-group" value="sm" label="Small Label" labelSize="sm" />
        <RadioButton name="size-group" value="md" label="Medium Label" labelSize="md" />
      </div>
    );
  },
};

export const CardVariants: Story = {
  name: 'Card Variants',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <RadioButton name="card-group" value="option1" label="First Option" variant="card" />
        <RadioButton
          name="card-group"
          value="option2"
          label="Second Option"
          variant="card"
          checked
        />
        <RadioButton name="card-group" value="option3" label="Third Option" variant="card" />
        <RadioButton
          name="card-group"
          value="option4"
          label="Disabled Option"
          variant="card"
          disabled
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio Button',
    disabled: true,
  },
};

export const DisabledCard: Story = {
  name: 'Disabled Card',
  args: {
    label: 'Disabled Card Radio Button',
    variant: 'card',
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  name: 'Without Label - Accessibility Guide',
  parameters: {
    docs: {
      description: {
        story: `
This comprehensive guide demonstrates proper accessibility techniques for radio buttons without visible labels. 
Each example shows a different approach, from best practices to common mistakes.

**Key Takeaway**: Never leave radio buttons completely unlabeled. Always provide accessible alternatives.
        `,
      },
    },
  },
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '16px',
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
          }}
        >
          <h3
            style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              color: '#495057',
            }}
          >
            📖 Accessibility Approaches for Label-less Radio Buttons
          </h3>
          <p
            style={{
              margin: '0',
              fontSize: '14px',
              color: '#6c757d',
              lineHeight: '1.5',
            }}
          >
            When visual design requires radio buttons without visible labels, you must provide
            alternative accessibility methods. Here are the recommended approaches, ordered by
            preference.
          </p>
          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#856404',
            }}
          >
            <strong>⚠️ Important:</strong> Radio buttons without any visual indication should be
            used very sparingly and only when the visual element itself conveys clear meaning (like
            color swatches, recognizable icons, or patterns).
          </div>
        </div>

        {/* Best Practice: Visually Hidden Labels */}
        <fieldset
          style={{
            border: '2px solid #28a745',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#f8fff9',
          }}
        >
          <legend
            style={{
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#155724',
              fontSize: '16px',
            }}
          >
            🏆 Best Practice: Visually Hidden Labels
          </legend>

          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '14px',
                color: '#155724',
                marginBottom: '12px',
                fontWeight: '500',
              }}
            >
              Color Swatch Selection (No Visual Labels)
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <RadioButton name="color-hidden" value="red" aria-label="Red color theme" />
                <VisuallyHidden>Red color theme option</VisuallyHidden>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#dc3545',
                    borderRadius: '4px',
                    marginTop: '4px',
                    margin: '4px auto 0',
                  }}
                ></div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <RadioButton
                  name="color-hidden"
                  value="blue"
                  aria-label="Blue color theme"
                  checked
                />
                <VisuallyHidden>Blue color theme option - currently selected</VisuallyHidden>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#007bff',
                    borderRadius: '4px',
                    margin: '4px auto 0',
                  }}
                ></div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <RadioButton name="color-hidden" value="green" aria-label="Green color theme" />
                <VisuallyHidden>Green color theme option</VisuallyHidden>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#28a745',
                    borderRadius: '4px',
                    margin: '4px auto 0',
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: '13px',
              color: '#155724',
              backgroundColor: '#d4edda',
              padding: '12px',
              borderRadius: '6px',
              fontStyle: 'italic',
            }}
          >
            💡 <strong>Why this works:</strong> Color swatches are inherently self-descriptive
            visually, but still need accessible labels for screen readers. The VisuallyHidden
            component provides additional context without cluttering the visual design.
            <br />
            <br />
            ⚠️ <strong>Use sparingly:</strong> This pattern should only be used when the visual
            element itself conveys the meaning (colors, patterns, icons with universal meaning).
          </div>
        </fieldset>

        {/* Good Practice: ARIA Labels */}
        <fieldset
          style={{
            border: '2px solid #17a2b8',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#f1fcfd',
          }}
        >
          <legend
            style={{
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#0c5460',
              fontSize: '16px',
            }}
          >
            ✅ Good: ARIA Labels
          </legend>

          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '14px',
                color: '#0c5460',
                marginBottom: '12px',
                fontWeight: '500',
              }}
            >
              Priority Selection with aria-label
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioButton name="priority-aria" value="low" aria-label="Low priority task" />
                <span style={{ fontSize: '14px' }}>🟢 Low</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioButton
                  name="priority-aria"
                  value="medium"
                  aria-label="Medium priority task"
                  checked
                />
                <span style={{ fontSize: '14px' }}>🟡 Medium</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioButton name="priority-aria" value="high" aria-label="High priority task" />
                <span style={{ fontSize: '14px' }}>🔴 High</span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '14px',
                color: '#0c5460',
                marginBottom: '12px',
                fontWeight: '500',
              }}
            >
              Color Selection with aria-labelledby
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div>
                <VisuallyHidden id="red-option">Red color theme</VisuallyHidden>
                <RadioButton name="color-aria" value="red" aria-labelledby="red-option" />
                <span style={{ fontSize: '12px', color: '#dc3545', marginLeft: '8px' }}>Red</span>
              </div>

              <div>
                <VisuallyHidden id="blue-option">Blue color theme</VisuallyHidden>
                <RadioButton name="color-aria" value="blue" aria-labelledby="blue-option" checked />
                <span style={{ fontSize: '12px', color: '#007bff', marginLeft: '8px' }}>Blue</span>
              </div>

              <div>
                <VisuallyHidden id="green-option">Green color theme</VisuallyHidden>
                <RadioButton name="color-aria" value="green" aria-labelledby="green-option" />
                <span style={{ fontSize: '12px', color: '#28a745', marginLeft: '8px' }}>Green</span>
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: '13px',
              color: '#0c5460',
              backgroundColor: '#bee5eb',
              padding: '12px',
              borderRadius: '6px',
              fontStyle: 'italic',
            }}
          >
            💡 <strong>When to use:</strong> When you can't modify the visual design but need to add
            accessibility. Works well but requires careful maintenance of ARIA attributes.
          </div>
        </fieldset>

        {/* Anti-pattern: What NOT to do */}
        <fieldset
          style={{
            border: '2px solid #dc3545',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#fff5f5',
          }}
        >
          <legend
            style={{
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#721c24',
              fontSize: '16px',
            }}
          >
            ❌ Never Do This: No Accessibility Labels
          </legend>

          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '14px',
                color: '#721c24',
                marginBottom: '12px',
                fontWeight: '500',
              }}
            >
              Unlabeled Radio Buttons
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <RadioButton name="bad-example" value="option1" />
              <RadioButton name="bad-example" value="option2" checked />
              <RadioButton name="bad-example" value="option3" />
            </div>
          </div>

          <div
            style={{
              fontSize: '13px',
              color: '#721c24',
              backgroundColor: '#f8d7da',
              padding: '12px',
              borderRadius: '6px',
            }}
          >
            <strong>⚠️ Accessibility Impact:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              <li>Screen readers announce these as "unlabeled radio button"</li>
              <li>Users can't understand what each option represents</li>
              <li>Violates WCAG 2.1 guidelines (4.1.2 Name, Role, Value)</li>
              <li>Creates frustrating experience for assistive technology users</li>
            </ul>
          </div>
        </fieldset>

        {/* Quick Reference */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#e7f3ff',
            borderRadius: '8px',
            border: '1px solid #b3d9ff',
          }}
        >
          <h4
            style={{
              margin: '0 0 12px 0',
              fontSize: '16px',
              color: '#004085',
            }}
          >
            📋 Quick Reference
          </h4>
          <div style={{ fontSize: '14px', color: '#004085' }}>
            <strong>Always choose this order of preference:</strong>
            <ol style={{ margin: '8px 0 0 0', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>
                <strong>Visible labels</strong> - Best for all users when design allows
              </li>
              <li>
                <strong>Visually hidden labels</strong> - Perfect compromise of design +
                accessibility
              </li>
              <li>
                <strong>ARIA labels</strong> - Good fallback when other options aren't possible
              </li>
              <li>
                <strong>No labels</strong> - Never acceptable for production use
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  },
};
