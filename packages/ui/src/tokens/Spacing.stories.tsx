import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '../tokens/spacing.css';

const SpacingSwatch = ({
  name,
  value,
  variable,
  type = 'spacing',
}: {
  name: string;
  value: string;
  variable: string;
  type?: 'spacing' | 'radius';
}) => (
  <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div
      style={{
        width: type === 'spacing' ? `var(${variable})` : '48px',
        height: type === 'spacing' ? `var(${variable})` : '48px',
        backgroundColor: type === 'spacing' ? '#1674bb' : '#f5f5f5',
        border: type === 'spacing' ? 'none' : '2px solid #1674bb',
        borderRadius: type === 'radius' ? `var(${variable})` : '2px',
        minWidth: type === 'spacing' ? '8px' : '48px',
        minHeight: type === 'spacing' ? '8px' : '48px',
        flexShrink: 0,
      }}
    />
    <div>
      <div style={{ fontWeight: '600', marginBottom: '2px' }}>{name}</div>
      <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#666' }}>{variable}</div>
      <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9ca3af' }}>{value}</div>
    </div>
  </div>
);

const SpacingSection = ({
  title,
  items,
  type = 'spacing',
}: {
  title: string;
  items: Array<{ name: string; value: string; variable: string }>;
  type?: 'spacing' | 'radius';
}) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>{title}</h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
      }}
    >
      {items.map((item) => (
        <SpacingSwatch key={item.variable} {...item} type={type} />
      ))}
    </div>
  </div>
);

const SpacingTokens = () => {
  const spacingTokens = [
    { name: 'None', value: '0', variable: '--ui-space-none' },
    { name: 'Extra Small', value: '2px', variable: '--ui-space-xs' },
    { name: 'Small', value: '4px', variable: '--ui-space-sm' },
    { name: 'Medium', value: '10px', variable: '--ui-space-md' },
    { name: 'Large', value: '12px', variable: '--ui-space-lg' },
    { name: 'Extra Large', value: '16px', variable: '--ui-space-xl' },
    { name: '2X Large', value: '20px', variable: '--ui-space-2xl' },
    { name: '3X Large', value: '24px', variable: '--ui-space-3xl' },
    { name: '4X Large', value: '32px', variable: '--ui-space-4xl' },
    { name: '5X Large', value: '48px', variable: '--ui-space-5xl' },
    { name: '6X Large', value: '64px', variable: '--ui-space-6xl' },
  ];

  const radiusTokens = [
    { name: 'None', value: '0', variable: '--ui-radius-none' },
    { name: 'Extra Small', value: '2px', variable: '--ui-radius-xs' },
    { name: 'Small', value: '4px', variable: '--ui-radius-sm' },
    { name: 'Medium', value: '6px', variable: '--ui-radius-md' },
    { name: 'Large', value: '8px', variable: '--ui-radius-lg' },
    { name: 'Extra Large', value: '12px', variable: '--ui-radius-xl' },
    { name: '2X Large', value: '16px', variable: '--ui-radius-2xl' },
    { name: '3X Large', value: '24px', variable: '--ui-radius-3xl' },
    { name: 'Full', value: '100px', variable: '--ui-radius-full' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
          Spacing & Layout Tokens
        </h1>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', maxWidth: '600px' }}>
          Our spacing system provides consistent spacing and layout values across the design system.
          These tokens ensure visual harmony and systematic spacing relationships.
        </p>
      </div>

      <SpacingSection title="Spacing Scale" items={spacingTokens} type="spacing" />
      <SpacingSection title="Border Radius" items={radiusTokens} type="radius" />

      <div
        style={{
          marginTop: '48px',
          padding: '24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Usage Examples
        </h3>
        <div
          style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', color: '#333' }}
        >
          <div style={{ marginBottom: '12px' }}>
            <strong>CSS Usage:</strong>
          </div>
          <div style={{ marginBottom: '8px' }}>
            padding: var(--ui-space-md); <span style={{ color: '#666' }}>/* 10px */</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            margin: var(--ui-space-lg); <span style={{ color: '#666' }}>/* 12px */</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            gap: var(--ui-space-xl); <span style={{ color: '#666' }}>/* 16px */</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            border-radius: var(--ui-radius-md); <span style={{ color: '#666' }}>/* 6px */</span>
          </div>

          <div style={{ marginTop: '20px', marginBottom: '12px' }}>
            <strong>React Inline Styles:</strong>
          </div>
          <div style={{ marginBottom: '8px' }}>padding: 'var(--ui-space-md)',</div>
          <div style={{ marginBottom: '8px' }}>borderRadius: 'var(--ui-radius-lg)',</div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Tokens/Spacing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Spacing & Layout Tokens

Our spacing system provides a systematic approach to spacing and layout consistency across the design system.

## Spacing Scale

The spacing scale follows a purposeful progression that provides flexibility while maintaining visual harmony:

- **xs-lg (2px-12px)**: Fine-tuned spacing for compact interfaces and precise adjustments
- **xl-2xl (16px-20px)**: Standard spacing for most interface elements
- **3xl-6xl (24px-64px)**: Generous spacing for section separation and layout structure

## Border Radius

Border radius tokens provide consistent corner rounding across components:

- **xs-md (2px-6px)**: Subtle rounding for form controls and buttons
- **lg-xl (8px-12px)**: Moderate rounding for cards and containers
- **2xl-3xl (16px-24px)**: Prominent rounding for hero elements
- **full (100px)**: Pill-shaped elements and circular avatars

## Design Principles

### Systematic Spacing
- All spacing values are systematically defined to create visual rhythm
- Consistent spacing improves scan-ability and user comprehension
- Spacing relationships create clear content hierarchy

### Flexibility
- Multiple scale options accommodate different interface densities
- Fine-grained control for precise layout adjustments
- Scalable system works across different screen sizes

### Token Usage
- Use tokens instead of hardcoded values for consistency
- Tokens make global spacing changes easy to implement
- Design-to-development handoff is more precise
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacingSystem: Story = {
  render: () => <SpacingTokens />,
};
