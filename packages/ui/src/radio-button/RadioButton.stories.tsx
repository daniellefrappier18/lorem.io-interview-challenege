import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable radio button component with label sizing and variant options. Supports both default and card-style variants for different UI contexts.',
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
  name: 'Without Label',
  args: {
    label: undefined,
  },
};
