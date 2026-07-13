/**
 * Design tokens — derived from `docs/design-system-rules.md` (project root).
 *
 * Marker legend (kept in comments, mirroring the source document):
 *   ★ = extracted directly from the Figma fixture (get_design_context output)
 *   ☆ = not present in the Figma fixture; extrapolated in design-system-rules.md
 *
 * Only ★ values are scored for "Figma fidelity" in the cross-stack comparison;
 * ☆ values (disabled/focus/error/selected/size variants) are evaluated for
 * internal consistency & implementation quality only.
 */

export const color = {
  surfaceInput: 'rgba(255,255,255,0.65)', // ★ Input background
  borderDefault: 'rgba(217,217,217,0.96)', // ★ Input/Card border
  borderMuted: 'rgba(217,217,217,0.80)', // ★ Primary Button border
  buttonPrimaryBg: 'rgba(21,21,21,0.65)', // ★ Primary Button background
  buttonSecondaryBg: '#151515', // ★ Secondary Button background
  textPrimary: '#000000', // ★ default text (black)
  textOnDark: '#FFFFFF', // ★ text on buttons (white)
  textMuted: 'rgba(0,0,0,0.44)', // ★ helper text ("hide" toggle)
  accent: '#151515', // ☆ focus/selected accent (reuses Secondary Button color)
  error: '#D64545', // ☆ generic error red (not present in fixture)
} as const;

export const opacity = {
  disabled: 0.4, // ☆ overall opacity applied to disabled controls
} as const;

export const radius = {
  sm: 6, // ★ Button / Input
  md: 8, // ★ Card
} as const;

export const size = {
  button: {
    height: 43, // ★ Primary Button height (Figma source-of-truth for size "m")
    heightSecondary: 47, // ★ Secondary Button height
  },
  input: {
    height: 43, // ★
  },
  card: {
    image: { width: 327, height: 264 }, // ★
  },
} as const;

export const borderWidth = {
  default: 0.5, // ★
  focusOrSelected: 1.5, // ☆
} as const;

export const font = {
  // ★ source is "SF Pro Display" (iOS-only); ☆ RN fallback is the platform
  // System font, so `fontFamily` is intentionally left `undefined`.
  family: undefined as string | undefined,
  size: {
    body: 13, // ★
    medium: 14, // ★
  },
  weight: {
    regular: '400' as const, // ★
    medium: '500' as const, // ★
  },
};
