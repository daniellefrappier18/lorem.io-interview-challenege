/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    //"@storybook/addon-controls",
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        // exclude private/internal props
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
    },
  },
  viteFinal: async (config) => {
    // Configure CSS modules for Storybook
    if (config.css) {
      config.css.modules = {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      };
    } else {
      config.css = {
        modules: {
          localsConvention: 'camelCase',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      };
    }
    return config;
  },
};

export default config;