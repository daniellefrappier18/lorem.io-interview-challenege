import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from '../src/radio-button/RadioButton';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButton = canvas.getByRole('radio');

    // Test initial state
    await expect(radioButton).not.toBeChecked();

    // Test clicking
    await userEvent.click(radioButton);
    await expect(radioButton).toBeChecked();
  },
};

export const Card: Story = {
  args: {
    label: 'Card Style Radio Button',
    variant: 'card',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButton = canvas.getByRole('radio');

    // Test initial state
    await expect(radioButton).not.toBeChecked();

    // Test clicking
    await userEvent.click(radioButton);
    await expect(radioButton).toBeChecked();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole('radio');

    // Test that the second option is checked
    await expect(radioButtons[1]).toBeChecked();

    // Test clicking the first option
    await userEvent.click(radioButtons[0]);
    await expect(radioButtons[0]).toBeChecked();
    await expect(radioButtons[1]).not.toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio Button',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButton = canvas.getByRole('radio');

    // Test disabled state
    await expect(radioButton).toBeDisabled();
    await expect(radioButton).not.toBeChecked();
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

export const PricingPlans: Story = {
  name: 'Card Variant - Pricing Plans',
  parameters: {
    docs: {
      description: {
        story:
          'Card variant radio buttons used in a realistic pricing plan selection scenario. Shows how the card style creates clear visual boundaries and better user experience for complex selections.',
      },
    },
  },
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '400px',
          fontFamily: 'var(--ui-font-family-primary)',
        }}
      >
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: 'var(--ui-font-size-lg)',
            color: 'var(--ui-color-text-primary)',
          }}
        >
          Choose Your Plan
        </h3>

        <RadioButton
          name="pricing-plan"
          value="basic"
          variant="card"
          label="Basic Plan - $9/month"
        />

        <RadioButton
          name="pricing-plan"
          value="pro"
          variant="card"
          label="Pro Plan - $29/month"
          checked
        />

        <RadioButton
          name="pricing-plan"
          value="enterprise"
          variant="card"
          label="Enterprise Plan - $99/month"
        />

        <RadioButton
          name="pricing-plan"
          value="coming-soon"
          variant="card"
          label="Premium Plan - Coming Soon"
          disabled
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioButtons = canvas.getAllByRole('radio');

    // Test that Pro plan is initially selected
    await expect(radioButtons[1]).toBeChecked();

    // Test selecting Basic plan
    await userEvent.click(radioButtons[0]);
    await expect(radioButtons[0]).toBeChecked();
    await expect(radioButtons[1]).not.toBeChecked();

    // Test selecting Enterprise plan
    await userEvent.click(radioButtons[2]);
    await expect(radioButtons[2]).toBeChecked();
    await expect(radioButtons[0]).not.toBeChecked();

    // Test that disabled option cannot be selected
    await expect(radioButtons[3]).toBeDisabled();
  },
};
