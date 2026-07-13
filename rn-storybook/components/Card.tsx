import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { borderWidth, color, font, radius, size as sizeTokens } from '../theme/tokens';

export interface CardProps {
  title: string;
  image: ImageSourcePropType;
  /** Visual state override; Figma only shows "default" — "selected" is ☆ extrapolated. */
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Card — minimal "image + title" product card (state: default/selected).
 * `selected` is a forced Visual state prop; real tap feedback (Interactive
 * state) is handled separately via `onPress` + TouchableOpacity press opacity.
 */
export function Card({ title, image, selected = false, onPress, style, testID }: CardProps) {
  return (
    <TouchableOpacity
      accessibilityRole={onPress ? 'button' : undefined}
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, style]}
      testID={testID}
    >
      <Image
        source={image}
        style={[
          styles.image,
          {
            borderColor: selected ? color.accent : color.borderDefault, // ★ default / ☆ selected
            borderWidth: selected ? borderWidth.focusOrSelected : borderWidth.default, // ★ / ☆
          },
        ]}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: sizeTokens.card.image.width, // ★ 327
  },
  image: {
    width: sizeTokens.card.image.width, // ★ 327
    height: sizeTokens.card.image.height, // ★ 264
    borderRadius: radius.md, // ★ 8px
  },
  title: {
    marginTop: 8,
    fontFamily: font.family,
    fontSize: font.size.medium, // ★ 14px
    fontWeight: font.weight.medium, // ★ 500
    color: color.textPrimary, // ★ black
  },
});
