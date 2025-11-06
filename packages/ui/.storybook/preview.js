// Import UI library styles for Storybook
import '../src/index.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Configure accessibility checks
      config: {
        rules: [
          // You can customize which rules to run
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'interactive-supports-focus',
            enabled: true,
          },
        ],
      },
      // Options for the accessibility addon
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
  },
};

export default preview;
