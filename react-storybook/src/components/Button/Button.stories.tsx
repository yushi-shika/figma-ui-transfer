import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from './Button';

/**
 * Button — variant/size/disabled は design-system-rules.md の Visual state
 * (Storybook args で強制表示する状態)。 hover / focus-visible は CSS の
 * `:hover` / `:focus-visible` に委ねる Interactive state として別グループの
 * story で扱う。
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: '★ Figmaに両方の実例あり (Create Account / Buy for $..)',
    },
    size: {
      control: 'radio',
      options: ['s', 'm', 'l'],
      description: '☆ Figmaは1サイズのみ。m が実測値、s/l は外挿',
    },
    disabled: {
      control: 'boolean',
      description: '☆ opacity.disabled を適用 (外挿)',
    },
  },
  args: {
    children: 'Create Account',
    variant: 'primary',
    size: 'm',
    disabled: false,
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- Visual state (args-driven) ---------- */

export const Primary: Story = {
  args: { variant: 'primary', children: 'Create Account' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'm', children: 'Buy for $338' },
};

export const SizeS: Story = {
  name: 'Size: s (☆)',
  args: { variant: 'secondary', size: 's', children: 'Size 12M' },
};

export const SizeL: Story = {
  name: 'Size: l (☆)',
  args: { variant: 'primary', size: 'l', children: 'Create Account' },
};

export const Disabled: Story = {
  name: 'Disabled (☆)',
  args: { variant: 'primary', disabled: true, children: 'Create Account' },
};

/* ---------- Interactive state (real hover / focus / click via play) ---------- */

export const InteractiveFocus: Story = {
  name: 'Interactive: focus-visible (real keyboard focus)',
  args: { variant: 'primary', children: 'Create Account' },
  parameters: {
    docs: {
      description: {
        story:
          'argsで強制表示するVisual stateではなく、実際にTabキーでフォーカスした際の `:focus-visible` リング(CSS実装)を確認するstory。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const InteractiveClick: Story = {
  name: 'Interactive: click (real pointer interaction)',
  args: { variant: 'secondary', children: 'Buy for $338' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(button).toBeEnabled();
  },
};
