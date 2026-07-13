import { useState } from 'react';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { borderWidth, color, font, opacity, radius, size as sizeTokens } from '../theme/tokens';

// ★ Default is the only state present in the Figma fixture.
// ☆ focus/error/disabled are extrapolated per design-system-rules.md.
export type InputVisualState = 'default' | 'focus' | 'error' | 'disabled';

export interface InputProps extends Omit<TextInputProps, 'style' | 'editable'> {
  label?: string;
  /**
   * Forces a Visual state (used by Storybook to demo focus/error/disabled
   * without real interaction). When omitted, the state is derived from real
   * interaction: `disabled` prop -> `error` prop -> live focus -> default.
   */
  visualState?: InputVisualState;
  disabled?: boolean;
  error?: boolean;
  /** Adds the fixture's "hide/show" toggle text (Password field). */
  showPasswordToggle?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const BORDER_COLOR: Record<InputVisualState, string> = {
  default: color.borderDefault, // ★ rgba(217,217,217,0.96)
  focus: color.accent, // ☆
  error: color.error, // ☆
  disabled: color.borderDefault, // ☆ same as default, opacity communicates disabled
};

const BORDER_WIDTH: Record<InputVisualState, number> = {
  default: borderWidth.default, // ★ 0.5
  focus: borderWidth.focusOrSelected, // ☆ 1.5
  error: borderWidth.default, // ☆ only color changes for error, per design-system-rules.md
  disabled: borderWidth.default,
};

export function Input({
  label,
  visualState,
  disabled = false,
  error = false,
  showPasswordToggle = false,
  secureTextEntry,
  style,
  testID,
  onFocus,
  onBlur,
  ...textInputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry ?? showPasswordToggle);

  const effectiveState: InputVisualState =
    visualState ?? (disabled ? 'disabled' : error ? 'error' : isFocused ? 'focus' : 'default');

  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          {
            borderColor: BORDER_COLOR[effectiveState],
            borderWidth: BORDER_WIDTH[effectiveState],
            opacity: disabled ? opacity.disabled : 1,
          },
        ]}
      >
        <TextInput
          {...textInputProps}
          editable={!disabled}
          secureTextEntry={isSecure}
          placeholderTextColor={color.textMuted}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          style={styles.textInput}
          testID={testID}
        />
        {showPasswordToggle ? (
          <TouchableOpacity onPress={() => setIsSecure((prev) => !prev)} accessibilityRole="button">
            <Text style={styles.toggle}>{isSecure ? 'hide' : 'show'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: font.family,
    fontSize: font.size.body, // ★ 13px
    fontWeight: font.weight.regular,
    color: color.textPrimary, // ★ black
    marginBottom: 6,
  },
  field: {
    height: sizeTokens.input.height, // ★ 43px
    borderRadius: radius.sm, // ★ 6px
    backgroundColor: color.surfaceInput, // ★ rgba(255,255,255,0.65)
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontFamily: font.family,
    fontSize: font.size.body, // ★ 13px
    color: color.textPrimary, // ★ black
    height: '100%',
  },
  toggle: {
    fontFamily: font.family,
    fontSize: font.size.body,
    color: color.textMuted, // ★ rgba(0,0,0,0.44)
    marginLeft: 8,
  },
});
