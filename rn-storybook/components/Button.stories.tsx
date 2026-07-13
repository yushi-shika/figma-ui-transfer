import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start', gap: 12 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: { onPress: fn(), label: 'Create Account' },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['s', 'm', 'l'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Visual state (args force the look, no real interaction needed) ---

/** ★ matches the Figma "Create Account" primary button (signup screen). */
export const Primary: Story = {
  args: { variant: 'primary', size: 'm', label: 'Create Account' },
};

/** ★ matches the Figma "Buy for $338" secondary/segment button (product screen). */
export const Secondary: Story = {
  args: { variant: 'secondary', size: 'm', label: 'Buy for $338' },
};

/** ☆ size variants are extrapolated; Figma only has one measured size ("m"). */
export const SmallSize: Story = {
  args: { variant: 'primary', size: 's', label: 'Small' },
};

export const LargeSize: Story = {
  args: { variant: 'primary', size: 'l', label: 'Large' },
};

/** ☆ disabled visual state is not present in the Figma fixture. */
export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, label: 'Create Account' },
};

// --- Interactive state (real onPress, logged in the Actions panel) ---

/** Tap the button on-device/in the Web preview to see the `onPress` action fire. */
export const Interactive: Story = {
  name: 'Interactive (real onPress)',
  args: { variant: 'primary', label: 'Tap me' },
};
