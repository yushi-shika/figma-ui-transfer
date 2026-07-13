import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { borderWidth, color, font, opacity, radius } from '../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary'; // ★ both variants exist in the fixture
export type ButtonSize = 's' | 'm' | 'l'; // ☆ Figma only has one size ("m"); s/l are extrapolated

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Visual state: forces the disabled look regardless of onPress wiring. */
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// ☆ height scale: "m" is the Figma-measured value per variant, s/l are +/- extrapolation
const HEIGHTS: Record<ButtonVariant, Record<ButtonSize, number>> = {
  primary: { s: 36, m: 43, l: 50 }, // m = ★ 43px (signup "Create Account")
  secondary: { s: 40, m: 47, l: 54 }, // m = ★ 47px (product "Buy for $338" segment)
};

// ☆ font-size scale around the Figma-measured base per variant
const FONT_SIZES: Record<ButtonVariant, Record<ButtonSize, number>> = {
  primary: { s: 12, m: font.size.body, l: 15 }, // m = ★ 13px
  secondary: { s: 13, m: font.size.medium, l: 16 }, // m = ★ 14px
};

const HORIZONTAL_PADDING: Record<ButtonSize, number> = {
  s: 16,
  m: 24,
  l: 32,
};

/**
 * Button — variant: primary/secondary, size: s/m/l, disabled.
 *
 * Note: the Figma fixture renders both buttons with `backdrop-blur(4px)`.
 * React Native has no native backdrop-blur; design-system-rules.md does not
 * define a blur token either, so it is intentionally omitted here (☆ decision).
 */
export function Button({
  label,
  variant = 'primary',
  size = 'm',
  disabled = false,
  onPress,
  style,
  testID,
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={[
        styles.base,
        {
          height: HEIGHTS[variant][size],
          paddingHorizontal: HORIZONTAL_PADDING[size],
          backgroundColor: isPrimary ? color.buttonPrimaryBg : color.buttonSecondaryBg,
          opacity: disabled ? opacity.disabled : 1,
        },
        isPrimary && styles.primaryBorder,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          { fontSize: FONT_SIZES[variant][size], fontWeight: isPrimary ? font.weight.regular : font.weight.medium },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.sm, // ★ 6px
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  primaryBorder: {
    borderWidth: borderWidth.default, // ★ 0.5px
    borderColor: color.borderMuted, // ★ rgba(217,217,217,0.8)
  },
  label: {
    color: color.textOnDark, // ★ white
    fontFamily: font.family,
    textAlign: 'center',
  },
});
