import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from './Input';

/**
 * Input — Figma上にあるのは実質Default状態のみ(★)。
 * focus/error/disabled は design-system-rules.md のトークンから外挿した☆のVisual state。
 * 実際のフォーカスリング・password表示切替はCSS `:focus-visible` / 実DOM操作による
 * Interactive stateとして別groupのstoryで確認する。
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'radio',
      options: ['default', 'focus', 'error', 'disabled'],
      description:
        '★ default (Figma実測) / ☆ focus・error・disabled (外挿, 強制表示のVisual state)',
    },
    type: {
      control: 'radio',
      options: ['text', 'email', 'password'],
    },
  },
  args: {
    label: 'Full Name',
    placeholder: 'Reggie James',
    state: 'default',
    type: 'text',
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- Visual state (args-driven) ---------- */

export const Default: Story = {
  args: { label: 'Full Name', placeholder: 'Reggie James', state: 'default' },
};

export const Email: Story = {
  args: { label: 'Email', placeholder: 'reggie@example.com', type: 'email' },
};

export const Password: Story = {
  args: { label: 'Password', placeholder: '••••••••', type: 'password' },
};

export const Focus: Story = {
  name: 'Focus (☆, visual override)',
  args: { label: 'Full Name', placeholder: 'Reggie James', state: 'focus' },
};

export const Error: Story = {
  name: 'Error (☆, visual override)',
  args: { label: 'Email', placeholder: 'reggie@example.com', state: 'error', type: 'email' },
};

export const Disabled: Story = {
  name: 'Disabled (☆, visual override)',
  args: { label: 'Full Name', placeholder: 'Reggie James', state: 'disabled' },
};

/* ---------- Interactive state (real focus / typing / password toggle) ---------- */

export const InteractiveFocusRing: Story = {
  name: 'Interactive: real focus ring (:focus-visible)',
  args: { label: 'Full Name', placeholder: 'Reggie James', state: 'default' },
  parameters: {
    docs: {
      description: {
        story: 'argsではなく実際にTabでフォーカスした際のCSS `:focus-visible` を確認する。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Full Name');
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};

export const InteractivePasswordToggle: Story = {
  name: 'Interactive: real password show/hide toggle',
  args: { label: 'Password', placeholder: '••••••••', type: 'password' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Password') as HTMLInputElement;
    const toggle = canvas.getByRole('button', { name: /show password/i });
    await expect(input.type).toBe('password');
    await userEvent.click(toggle);
    await expect(input.type).toBe('text');
  },
};

export const InteractiveTyping: Story = {
  name: 'Interactive: real text input',
  args: { label: 'Full Name', placeholder: 'Reggie James' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Full Name');
    await userEvent.type(input, 'Reggie James');
    await expect(input).toHaveValue('Reggie James');
  },
};
