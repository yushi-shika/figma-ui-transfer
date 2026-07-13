import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { SignupScreen } from './SignupScreen';

const meta = {
  title: 'Screens/Signup',
  component: SignupScreen,
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#e5e5e5' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SignupScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ★ Full composition of the Figma "signup screen" fixture (node `2:4`):
 * background photo, logo, Full Name / Email / Password inputs, the
 * "Create Account" primary button, and the Sign In / Privacy Policy subtext —
 * all placed at the fixture's absolute coordinates on a 375x812 canvas.
 */
export const Default: Story = {};
