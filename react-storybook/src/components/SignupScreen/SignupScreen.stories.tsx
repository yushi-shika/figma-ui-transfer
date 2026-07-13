import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SignupScreen } from './SignupScreen';

/**
 * Screens/Signup — 部品単位(Button/Input/Card)ではなく、1つの完成した画面として
 * 組み立てた Signup 画面。座標・アセットは
 * docs/figma-fixtures/screens/signup/design-context.md に準拠。
 * 既存の Input(default state)/Button(primary variant)をそのまま再利用している。
 */
const meta = {
  title: 'Screens/Signup',
  component: SignupScreen,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
    onSignIn: fn(),
    onPrivacyPolicy: fn(),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SignupScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InteractiveSubmit: Story = {
  name: 'Interactive: real click on Create Account',
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Create Account' });
    await userEvent.click(button);
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
  },
};
