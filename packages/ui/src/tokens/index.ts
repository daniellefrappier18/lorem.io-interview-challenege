// Design Tokens Export
// This file exports design tokens as JavaScript objects for programmatic access

export const tokens = {
  fonts: {
    family: {
      primary: 'var(--ui-font-family-primary)',
      mono: 'var(--ui-font-family-mono)',
    },
    weight: {
      light: 'var(--ui-font-weight-light)',
      regular: 'var(--ui-font-weight-regular)',
      medium: 'var(--ui-font-weight-medium)',
      semibold: 'var(--ui-font-weight-semibold)',
      bold: 'var(--ui-font-weight-bold)',
    },
    size: {
      xs: 'var(--ui-font-size-xs)',
      sm: 'var(--ui-font-size-sm)',
      base: 'var(--ui-font-size-base)',
      lg: 'var(--ui-font-size-lg)',
      xl: 'var(--ui-font-size-xl)',
      '2xl': 'var(--ui-font-size-2xl)',
      '3xl': 'var(--ui-font-size-3xl)',
    },
  },
  colors: {
    primary: {
      50: 'var(--ui-color-primary-50)',
      500: 'var(--ui-color-primary-500)',
      600: 'var(--ui-color-primary-600)',
      700: 'var(--ui-color-primary-700)',
      // ... add more as needed
    },
    text: {
      primary: 'var(--ui-color-text-primary)',
      secondary: 'var(--ui-color-text-secondary)',
      muted: 'var(--ui-color-text-muted)',
    },
  },
  spacing: {
    1: 'var(--ui-space-1)',
    2: 'var(--ui-space-2)',
    3: 'var(--ui-space-3)',
    4: 'var(--ui-space-4)',
    // ... add more as needed
  },
  radius: {
    sm: 'var(--ui-radius-sm)',
    base: 'var(--ui-radius-base)',
    md: 'var(--ui-radius-md)',
    lg: 'var(--ui-radius-lg)',
  },
} as const;
