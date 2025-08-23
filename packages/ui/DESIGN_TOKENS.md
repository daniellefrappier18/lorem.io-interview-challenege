# UI Library Design Tokens

This UI library uses a comprehensive design token system with **Hanken Grotesk** as the primary font.

## Typography Tokens

### Font Family

- `--ui-font-family-primary`: Hanken Grotesk with system fallbacks
- `--ui-font-family-mono`: Monospace font stack

### Font Weights

- `--ui-font-weight-light`: 300
- `--ui-font-weight-regular`: 400
- `--ui-font-weight-medium`: 500
- `--ui-font-weight-semibold`: 600
- `--ui-font-weight-bold`: 700

### Font Sizes

- `--ui-font-size-xs`: 0.75rem (12px)
- `--ui-font-size-sm`: 0.875rem (14px)
- `--ui-font-size-base`: 1rem (16px)
- `--ui-font-size-lg`: 1.125rem (18px)
- `--ui-font-size-xl`: 1.25rem (20px)
- `--ui-font-size-2xl`: 1.5rem (24px)
- `--ui-font-size-3xl`: 1.875rem (30px)

## Usage

### In CSS

```css
.my-component {
  font-family: var(--ui-font-family-primary);
  font-weight: var(--ui-font-weight-semibold);
  font-size: var(--ui-font-size-base);
}
```

### In JavaScript

```ts
import { tokens } from 'ui';

const style = {
  fontFamily: tokens.fonts.family.primary,
  fontSize: tokens.fonts.size.base,
};
```

## Benefits

✅ **Consistent Typography**: All components use Hanken Grotesk
✅ **Design System**: Organized, scalable token system  
✅ **Customizable**: Easy to override for themes
✅ **Type Safe**: TypeScript support for tokens
✅ **Performance**: Optimized font loading with fallbacks
