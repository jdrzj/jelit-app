import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface CompanionProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Companion({ message, size = 'medium' }: CompanionProps) {
  const sizeStyles = {
    small: { width: 60, height: 60, fontSize: 28 },
    medium: { width: 80, height: 80, fontSize: 36 },
    large: { width: 120, height: 120, fontSize: 52 },
  };

  const currentSize = sizeStyles[size];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.companion,
          {
            width: currentSize.width,
            height: currentSize.height,
          }
        ]}
      >
        <Text style={{ fontSize: currentSize.fontSize }}>🚽</Text>
      </View>
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  companion: {
    backgroundColor: colors.primaryVeryLight,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  message: {
    marginTop: 16,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    paddingHorizontal: 32,
  },
});
