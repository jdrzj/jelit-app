/**
 * Jellit Typography System
 * Calm, meditative type hierarchy using Quicksand
 */

export const typography = {
  // Font families
  fontFamily: {
    regular: 'Quicksand_400Regular',
    medium: 'Quicksand_500Medium',
    semiBold: 'Quicksand_600SemiBold',
    bold: 'Quicksand_700Bold',
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const;
