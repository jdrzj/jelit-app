/**
 * Jellit Color System
 * A calm, meditative wellness palette inspired by quiet moments
 */

export const colors = {
  // Backgrounds - soft, breathable spaces
  background: '#F5F7F6',      // Soft off-white with subtle warmth
  backgroundGradientStart: '#F5F7F6',
  backgroundGradientEnd: '#E8F0EE',

  surface: '#FDFEFE',         // Almost-white for floating cards
  surfaceAlt: '#EDF4F2',      // Soft mint-tinted surface
  surfaceFog: '#F0F5F7',      // Fog blue alternative

  // Primary colors - calm, muted teal/mint
  primary: '#7FACA9',         // Soft teal - meditative and calming
  primaryLight: '#C9E4E3',    // Pale mint for gentle backgrounds
  primaryVeryLight: '#E8F5F4', // Very light mint wash
  primaryDark: '#5A8B88',     // Deeper teal for subtle emphasis

  // Secondary colors - muted sage and soft blue-gray
  secondary: '#A3C4BC',       // Sage-mint - gentle and natural
  secondaryLight: '#DCE9E6',  // Pale sage background
  fogBlue: '#B8CCD6',         // Soft fog blue - quiet and peaceful
  fogBlueLight: '#E3EDF2',    // Very light fog blue

  // Text colors - soft, readable hierarchy
  textPrimary: '#2C3E3F',     // Deep teal-gray, not harsh black
  textSecondary: '#6B8685',   // Muted teal-gray for secondary text
  textTertiary: '#9AADAC',    // Lighter teal-gray for subtle text
  textMuted: '#B8C9C8',       // Very muted for disabled states

  // Borders and dividers - barely there
  border: '#D8E5E3',          // Soft mint-gray border
  borderLight: '#E8F0EE',     // Nearly invisible border
  borderFocus: '#7FACA9',     // Primary color for focus states

  // Semantic colors - observational, not alarming
  error: '#C99A98',           // Muted rose, not scary
  errorLight: '#F2E8E8',      // Very soft rose background
  warning: '#D4B896',         // Soft sand-orange
  warningLight: '#F5F0E8',    // Pale sand background
  success: '#9BC4A6',         // Soft sage green
  successLight: '#E8F2EB',    // Pale sage background

  // Chart colors - observational, muted palette
  chartPrimary: '#7FACA9',    // Primary teal
  chartSecondary: '#A3C4BC',  // Sage-mint
  chartTertiary: '#B8CCD6',   // Fog blue
  chartAccent: '#D4B896',     // Soft sand
  chartFill: 'rgba(127, 172, 169, 0.1)', // Very subtle fill

  // Special - gradients for cards and backgrounds
  cardGradientStart: '#FDFEFE',
  cardGradientEnd: '#F5FBFA',

  // UI elements
  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(44, 62, 63, 0.08)', // Soft, colored shadow
  shadowMedium: 'rgba(44, 62, 63, 0.12)',
  overlay: 'rgba(44, 62, 63, 0.25)', // Tinted overlay
} as const;

// Export type for TypeScript
export type ColorKey = keyof typeof colors;
