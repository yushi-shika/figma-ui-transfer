import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Card } from './Card';
import productHero from '../../assets/product-hero.png';

/**
 * Card — Figma上には Default 表示のみ存在(★)。Selected は
 * design-system-rules.md のトークン(accent border)から外挿した☆のVisual state。
 * 実際のクリック/hoverによるボーダー変化はCSS `:hover`/`:focus-visible` の
 * Interactive stateとして別groupのstoryで確認する。
 */
const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'radio',
      options: ['default', 'selected'],
      description: '★ default (Figma実測) / ☆ selected (外挿, 強制表示のVisual state)',
    },
  },
  args: {
    imageSrc: productHero,
    title: "Air Jordan 1 Retro High OG 'University Blue'",
    state: 'default',
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- Visual state (args-driven) ---------- */

export const Default: Story = {
  args: { state: 'default' },
};

export const Selected: Story = {
  name: 'Selected (☆, visual override)',
  args: { state: 'selected' },
};

/* ---------- Interactive state (real hover / focus / click) ---------- */

export const InteractiveHoverFocus: Story = {
  name: 'Interactive: real hover / focus border (CSS :hover, :focus-visible)',
  args: { state: 'default' },
  parameters: {
    docs: {
      description: {
        story:
          'argsのSelectedとは別に、実際にマウスhoverまたはTabフォーカスした際にボーダーが強調される挙動(CSS実装)を確認する。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('button');
    await userEvent.tab();
    await expect(card).toHaveFocus();
  },
};

export const InteractiveClickToSelect: Story = {
  name: 'Interactive: click (real pointer interaction)',
  args: { state: 'default' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('button');
    await userEvent.click(card);
  },
};
