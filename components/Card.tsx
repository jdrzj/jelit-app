import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'subtle' | 'fog';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  const gradientColors = variant === 'fog'
    ? [colors.surfaceFog, colors.surfaceAlt]
    : variant === 'subtle'
    ? [colors.surfaceAlt, colors.surface]
    : [colors.cardGradientStart, colors.cardGradientEnd];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.card, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
});
