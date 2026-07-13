import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 288 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    visualState: { control: 'radio', options: [undefined, 'default', 'focus', 'error', 'disabled'] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Visual state (forced via `visualState`, bypassing real focus tracking) ---

/** ★ matches the Figma "Full Name" input (signup screen, default state only in fixture). */
export const Default: Story = {
  args: { label: 'Full Name', defaultValue: 'Reggie James', visualState: 'default' },
};

/** ☆ focus border color/width are extrapolated (not in the Figma fixture). */
export const Focus: Story = {
  args: { label: 'Email', defaultValue: 'reggie@example.com', visualState: 'focus' },
};

/** ☆ error state is extrapolated. */
export const Error: Story = {
  args: { label: 'Email', defaultValue: 'not-an-email', visualState: 'error' },
};

/** ☆ disabled state is extrapolated (opacity.disabled applied). */
export const Disabled: Story = {
  args: { label: 'Full Name', defaultValue: 'Reggie James', visualState: 'disabled', disabled: true },
};

// --- Interactive state (real focus / real password toggle, no forced visualState) ---

/** Tap into the field on-device to see the live focus ring (no `visualState` set). */
export const InteractiveFocus: Story = {
  name: 'Interactive (real focus)',
  args: { label: 'Full Name', placeholder: 'Reggie James' },
};

/** ★ Password field's "hide" helper text from the fixture, now a real toggle. */
export const PasswordWithToggle: Story = {
  name: 'Interactive (password show/hide)',
  args: { label: 'Password', defaultValue: 'super-secret', showPasswordToggle: true },
};
