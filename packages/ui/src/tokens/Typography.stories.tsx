import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '../tokens/typography.css';

const TypographySwatch = ({
  label,
  token,
  value,
  type = 'size',
  sampleText = 'The quick brown fox jumps over the lazy dog',
}: {
  label: string;
  token: string;
  value: string;
  type?: 'size' | 'weight' | 'lineHeight' | 'family';
  sampleText?: string;
}) => {
  const getStyles = () => {
    const baseStyles = {
      fontFamily: 'var(--ui-font-family-primary)',
      margin: 0,
      padding: 0,
    };

    switch (type) {
      case 'size':
        return {
          ...baseStyles,
          fontSize: `var(${token})`,
          lineHeight: 'var(--ui-line-height-normal)',
        };
      case 'weight':
        return {
          ...baseStyles,
          fontSize: 'var(--ui-font-size-base)',
          fontWeight: `var(${token})`,
          lineHeight: 'var(--ui-line-height-normal)',
        };
      case 'lineHeight':
        return {
          ...baseStyles,
          fontSize: 'var(--ui-font-size-base)',
          lineHeight: `var(${token})`,
          border: '1px dashed #e5e7eb',
          padding: '8px',
          borderRadius: '4px',
          backgroundColor: '#fafafa',
        };
      case 'family':
        return {
          ...baseStyles,
          fontFamily: `var(${token})`,
          fontSize: 'var(--ui-font-size-base)',
          lineHeight: 'var(--ui-line-height-normal)',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
        <span style={{ fontWeight: '600', fontSize: '14px' }}>{label}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#666' }}>{token}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9ca3af' }}>{value}</span>
      </div>
      <div style={getStyles()}>{sampleText}</div>
    </div>
  );
};

const TypographySection = ({
  title,
  description,
  items,
  type = 'size',
}: {
  title: string;
  description?: string;
  items: Array<{ label: string; token: string; value: string; sampleText?: string }>;
  type?: 'size' | 'weight' | 'lineHeight' | 'family';
}) => (
  <div style={{ marginBottom: '48px' }}>
    <h3 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: '600' }}>{title}</h3>
    {description && (
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
        {description}
      </p>
    )}
    <div>
      {items.map((item) => (
        <TypographySwatch key={item.token} {...item} type={type} />
      ))}
    </div>
  </div>
);

const TypographyTokens = () => {
  const fontSizes = [
    { label: 'Extra Small', token: '--ui-font-size-xs', value: '13px' },
    { label: 'Small', token: '--ui-font-size-sm', value: '14px' },
    { label: 'Medium', token: '--ui-font-size-md', value: '15px' },
    { label: 'Base', token: '--ui-font-size-base', value: '16px' },
    { label: 'Large', token: '--ui-font-size-lg', value: '18px' },
    { label: 'Extra Large', token: '--ui-font-size-xl', value: '20px' },
    { label: '2X Large', token: '--ui-font-size-2xl', value: '24px' },
    { label: '3X Large', token: '--ui-font-size-3xl', value: '30px' },
  ];

  const fontWeights = [
    { label: 'Light', token: '--ui-font-weight-light', value: '300' },
    { label: 'Regular', token: '--ui-font-weight-regular', value: '400' },
    { label: 'Medium', token: '--ui-font-weight-medium', value: '500' },
    { label: 'Semibold', token: '--ui-font-weight-semibold', value: '600' },
    { label: 'Bold', token: '--ui-font-weight-bold', value: '700' },
  ];

  const lineHeights = [
    {
      label: 'Tight',
      token: '--ui-line-height-tight',
      value: '120%',
      sampleText:
        'Tight line height for headlines and compact text. Creates dense, impactful typography for headings.',
    },
    {
      label: 'Normal',
      token: '--ui-line-height-normal',
      value: '150%',
      sampleText:
        'Normal line height for most body text. Provides good readability and comfortable spacing.',
    },
    {
      label: 'Relaxed',
      token: '--ui-line-height-relaxed',
      value: '160%',
      sampleText:
        'Relaxed line height for longer form content. Improves readability for extended reading.',
    },
    {
      label: 'Spacious',
      token: '--ui-line-height-spacious',
      value: '170%',
      sampleText:
        'Spacious line height for articles and documentation. Creates breathing room for comprehensive content.',
    },
    {
      label: 'Very Spacious',
      token: '--ui-line-height-very-spacious',
      value: '180%',
      sampleText:
        'Very spacious line height for accessibility and long-form reading. Maximum comfort for extended text consumption.',
    },
  ];

  const fontFamilies = [
    {
      label: 'Primary',
      token: '--ui-font-family-primary',
      value: "'Hanken Grotesk', sans-serif",
      sampleText: 'Hanken Grotesk - Our primary typeface for all interface text',
    },
  ];

  return (
    <div
      style={{ padding: '20px', maxWidth: '1200px', fontFamily: 'var(--ui-font-family-primary)' }}
    >
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
          Typography Tokens
        </h1>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', maxWidth: '600px' }}>
          Our typography system provides consistent type scales, weights, and spacing to create
          readable and harmonious text hierarchy across the design system.
        </p>
      </div>

      <TypographySection
        title="Font Family"
        description="Primary typeface for all interface elements"
        items={fontFamilies}
        type="family"
      />

      <TypographySection
        title="Font Sizes"
        description="Systematic scale from interface details to prominent headings"
        items={fontSizes}
        type="size"
      />

      <TypographySection
        title="Font Weights"
        description="Weight variations for hierarchy and emphasis"
        items={fontWeights}
        type="weight"
      />

      <TypographySection
        title="Line Heights"
        description="Spacing between lines optimized for different reading contexts"
        items={lineHeights}
        type="lineHeight"
      />

      <div
        style={{
          marginTop: '48px',
          padding: '24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Typography Combinations
        </h3>

        <div style={{ marginBottom: '32px' }}>
          <h4
            style={{
              fontSize: 'var(--ui-font-size-2xl)',
              fontWeight: 'var(--ui-font-weight-bold)',
              lineHeight: 'var(--ui-line-height-tight)',
              marginBottom: '8px',
            }}
          >
            Page Heading
          </h4>
          <p
            style={{
              fontSize: 'var(--ui-font-size-base)',
              fontWeight: 'var(--ui-font-weight-regular)',
              lineHeight: 'var(--ui-line-height-normal)',
              color: '#666',
              margin: 0,
            }}
          >
            24px Bold, 120% line height for main page titles
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h4
            style={{
              fontSize: 'var(--ui-font-size-lg)',
              fontWeight: 'var(--ui-font-weight-semibold)',
              lineHeight: 'var(--ui-line-height-normal)',
              marginBottom: '8px',
            }}
          >
            Section Heading
          </h4>
          <p
            style={{
              fontSize: 'var(--ui-font-size-base)',
              fontWeight: 'var(--ui-font-weight-regular)',
              lineHeight: 'var(--ui-line-height-relaxed)',
              color: '#666',
              margin: 0,
            }}
          >
            18px Semibold, 150% line height for section titles and content groupings
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <p
            style={{
              fontSize: 'var(--ui-font-size-base)',
              fontWeight: 'var(--ui-font-weight-regular)',
              lineHeight: 'var(--ui-line-height-relaxed)',
              marginBottom: '8px',
            }}
          >
            Body Text
          </p>
          <p
            style={{
              fontSize: 'var(--ui-font-size-sm)',
              fontWeight: 'var(--ui-font-weight-regular)',
              lineHeight: 'var(--ui-line-height-normal)',
              color: '#666',
              margin: 0,
            }}
          >
            16px Regular, 160% line height for readable body content and paragraphs
          </p>
        </div>

        <div>
          <span
            style={{
              fontSize: 'var(--ui-font-size-sm)',
              fontWeight: 'var(--ui-font-weight-medium)',
              lineHeight: 'var(--ui-line-height-normal)',
            }}
          >
            UI Text
          </span>
          <p
            style={{
              fontSize: 'var(--ui-font-size-xs)',
              fontWeight: 'var(--ui-font-weight-regular)',
              lineHeight: 'var(--ui-line-height-normal)',
              color: '#666',
              margin: '4px 0 0 0',
            }}
          >
            14px Medium, 150% line height for labels, buttons, and interface elements
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: '32px',
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
          <div style={{ marginBottom: '8px' }}>font-family: var(--ui-font-family-primary);</div>
          <div style={{ marginBottom: '8px' }}>
            font-size: var(--ui-font-size-lg); <span style={{ color: '#666' }}>/* 18px */</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            font-weight: var(--ui-font-weight-semibold);{' '}
            <span style={{ color: '#666' }}>/* 600 */</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            line-height: var(--ui-line-height-relaxed);{' '}
            <span style={{ color: '#666' }}>/* 160% */</span>
          </div>

          <div style={{ marginTop: '20px', marginBottom: '12px' }}>
            <strong>React Inline Styles:</strong>
          </div>
          <div style={{ marginBottom: '8px' }}>fontFamily: 'var(--ui-font-family-primary)',</div>
          <div style={{ marginBottom: '8px' }}>fontSize: 'var(--ui-font-size-lg)',</div>
          <div style={{ marginBottom: '8px' }}>fontWeight: 'var(--ui-font-weight-semibold)',</div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Tokens/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Typography Tokens

Our typography system provides a comprehensive set of design tokens for consistent text styling across the design system.

## Typography Scale

### Font Sizes
The font size scale provides appropriate sizing for different content hierarchies:

- **xs-sm (13px-14px)**: Fine print, captions, and secondary interface text
- **md-base (15px-16px)**: Primary body text and standard interface elements
- **lg-xl (18px-20px)**: Subheadings and prominent interface text
- **2xl-3xl (24px-30px)**: Main headings and hero text

### Font Weights
Weight variations create hierarchy and emphasis:

- **Light (300)**: Subtle text, large headings where elegance is desired
- **Regular (400)**: Standard body text and most interface elements
- **Medium (500)**: Slightly emphasized text, form labels
- **Semibold (600)**: Subheadings, important interface elements
- **Bold (700)**: Main headings, strong emphasis

### Line Heights
Line height tokens optimize readability for different contexts:

- **Tight (120%)**: Headlines and display text where impact is priority
- **Normal (150%)**: Standard interface text and short content
- **Relaxed (160%)**: Body text and comfortable reading
- **Spacious (170%)**: Long-form content and articles
- **Very Spacious (180%)**: Accessibility-focused and maximum readability

## Design Principles

### Readability First
- All combinations tested for optimal readability across devices
- Line heights optimized for comfortable reading at each size
- Sufficient contrast and spacing for accessibility compliance

### Systematic Hierarchy
- Clear distinction between heading levels and body text
- Consistent proportional relationships between sizes
- Predictable visual hierarchy that guides user attention

### Hanken Grotesk
- Modern geometric sans-serif with excellent readability
- Variable font with complete weight range (100-900)
- Optimized for both digital screens and print applications
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographySystem: Story = {
  render: () => <TypographyTokens />,
};
