import { Image, StyleSheet, Text, View } from 'react-native';

import { color, font } from '../theme/tokens';
import { Button } from './Button';
import { Input } from './Input';

const backgroundImage = require('../assets/signup-background.png');
const logoImage = require('../assets/signup-logo.png');

/**
 * SignupScreen — full-screen composition of the Figma "signup screen" fixture
 * (fileKey `cobQGyPNOOx3MyrDicL75d`, node `2:4`), assembled from the existing
 * `Button` (primary, size m) and `Input` (default state) components.
 *
 * Canvas is a fixed 375x812 (iPhone-ratio) frame; all children are placed
 * with the fixture's absolute left/top coordinates (☆ = only the outer
 * canvas size is a convention, not a measured value; ★ = every left/top/
 * width/height below is copied from design-context.md).
 */
export function SignupScreen() {
  return (
    <View style={styles.canvas} testID="signup-screen">
      {/* ★ Background photo, full-bleed, object-cover */}
      <Image source={backgroundImage} style={styles.background} resizeMode="cover" />

      {/* ★ Logo, overlaid on the background */}
      <Image source={logoImage} style={styles.logo} resizeMode="cover" />

      {/* ★ Full Name input */}
      <Input
        label="Full Name"
        defaultValue="Reggie James"
        visualState="default"
        style={styles.fullNameInput}
      />

      {/* ★ Email input */}
      <Input
        label="Email"
        defaultValue="reggiejames001@website.com"
        visualState="default"
        style={styles.emailInput}
      />

      {/* ★ Password input, with "hide" toggle */}
      <Input
        label="Password"
        defaultValue="theBirdiSth3W0rD"
        visualState="default"
        showPasswordToggle
        style={styles.passwordInput}
      />

      {/* ★ Create Account button (primary, size m) */}
      <Button label="Create Account" variant="primary" size="m" style={styles.createAccountButton} />

      {/* ★ Subtext */}
      <Text style={styles.signInText}>
        Already have an account <Text style={styles.signInBold}>Sign In</Text>
      </Text>
      <Text style={styles.privacyText}>Privacy Policy</Text>
    </View>
  );
}

const CANVAS_WIDTH = 375;
const CANVAS_HEIGHT = 812;

const styles = StyleSheet.create({
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: '#FFFFFF', // ★ bg-white
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    left: -52, // ★
    top: -60, // ★
    width: 797, // ★
    height: 1039, // ★
  },
  logo: {
    position: 'absolute',
    left: 121, // ★
    top: 61, // ★
    width: 133, // ★
    height: 130, // ★
  },
  fullNameInput: {
    position: 'absolute',
    left: 48, // ★
    top: 348, // ★ (label top; field renders 25px below, per Input's own layout)
    width: 288, // ★
  },
  emailInput: {
    position: 'absolute',
    left: 48, // ★
    top: 432, // ★
    width: 288, // ★
  },
  passwordInput: {
    position: 'absolute',
    left: 48, // ★
    top: 528, // ★
    width: 288, // ★
  },
  createAccountButton: {
    position: 'absolute',
    left: 72, // ★
    top: 648, // ★
    width: 240, // ★
  },
  signInText: {
    position: 'absolute',
    left: 98, // ★
    top: 701, // ★
    fontFamily: font.family,
    fontSize: font.size.body, // ★ 13px
    color: color.textPrimary, // ★ black
  },
  signInBold: {
    fontWeight: '700', // ★ <b>Sign In</b>
  },
  privacyText: {
    position: 'absolute',
    left: 147, // ★
    top: 768, // ★
    fontFamily: font.family,
    fontSize: font.size.body, // ★ 13px
    color: color.textPrimary, // ★ black
  },
});
