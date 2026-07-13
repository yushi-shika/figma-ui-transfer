import type { StorybookConfig } from '@storybook/react-native-web-vite';

// Web (react-native-web-vite) Storybook config — secondary/experimental track.
// Native (on-device, Metro) Storybook config lives in ../.rnstorybook/.
const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: '@storybook/react-native-web-vite',
};

export default config;
