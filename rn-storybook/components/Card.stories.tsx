import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { fn } from 'storybook/test';

import { Card } from './Card';

const productHero = require('../assets/product-hero.png');

const meta = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    image: productHero,
    title: "Air Jordan 1 Retro High OG 'University Blue'",
    onPress: fn(),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Visual state ---

/** ★ matches the Figma product card (image + title, product screen). */
export const Default: Story = {
  args: { selected: false },
};

/** ☆ selected state is extrapolated (accent border), Figma has no selected look. */
export const Selected: Story = {
  args: { selected: true },
};

// --- Interactive state (real tap toggles selection, no forced `selected` prop) ---

export const Interactive: Story = {
  name: 'Interactive (real tap toggles selection)',
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return <Card {...args} selected={selected} onPress={() => setSelected((prev) => !prev)} />;
  },
};
