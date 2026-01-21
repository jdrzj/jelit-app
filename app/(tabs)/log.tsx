import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useEntries } from '@/hooks/useEntries';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { LoadingScreen } from '@/components/LoadingScreen';
import {
  BRISTOL_SCALE,
  MOOD_EMOJIS,
  URGENCY_LABELS,
  PAIN_LABELS,
} from '@/utils/constants';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function LogScreen() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { addEntry } = useEntries();

  const [bristolScore, setBristolScore] = useState<number>(4);
  const [urgencyLevel, setUrgencyLevel] = useState<number>(3);
  const [painLevel, setPainLevel] = useState<number>(1);
  const [moodEmoji, setMoodEmoji] = useState<string>('😐');
  const [notes, setNotes] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please sign in to log entries</Text>
      </View>
    );
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await addEntry({
        timestamp: new Date().toISOString(),
        bristol_score: bristolScore,
        urgency_level: urgencyLevel,
        pain_level: painLevel,
        mood_emoji: moodEmoji,
        notes: notes.trim(),
      });

      setBristolScore(4);
      setUrgencyLevel(3);
      setPainLevel(1);
      setMoodEmoji('😐');
      setNotes('');
      setShowAdvanced(false);

      router.push('/(tabs)/');
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Gentle Check-in</Text>
          <Text style={styles.subtitle}>Take a moment to observe</Text>
        </View>

        <Card variant="subtle" style={styles.section}>
          <Text style={styles.sectionTitle}>Bristol Type</Text>
          <Text style={styles.sectionSubtitle}>Observe gently, type 1-7</Text>
          <View style={styles.bristolGrid}>
            {Object.entries(BRISTOL_SCALE).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.bristolButton,
                  bristolScore === Number(key) && styles.bristolButtonActive,
                ]}
                onPress={() => setBristolScore(Number(key))}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.bristolButtonText,
                    bristolScore === Number(key) &&
                      styles.bristolButtonTextActive,
                  ]}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.bristolDescription}>
            {BRISTOL_SCALE[bristolScore as keyof typeof BRISTOL_SCALE].description}
          </Text>
        </Card>

        <Card variant="fog" style={styles.section}>
          <Text style={styles.sectionTitle}>Urgency</Text>
          <View style={styles.sliderContainer}>
            {[1, 2, 3, 4, 5].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.sliderButton,
                  urgencyLevel === level && styles.sliderButtonActive,
                ]}
                onPress={() => setUrgencyLevel(level)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.sliderButtonText,
                    urgencyLevel === level && styles.sliderButtonTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.sliderLabel}>
            {URGENCY_LABELS[urgencyLevel as keyof typeof URGENCY_LABELS]}
          </Text>
        </Card>

        <Card variant="subtle" style={styles.section}>
          <Text style={styles.sectionTitle}>Comfort</Text>
          <View style={styles.sliderContainer}>
            {[1, 2, 3, 4, 5].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.sliderButton,
                  painLevel === level && styles.sliderButtonActive,
                ]}
                onPress={() => setPainLevel(level)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.sliderButtonText,
                    painLevel === level && styles.sliderButtonTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.sliderLabel}>
            {PAIN_LABELS[painLevel as keyof typeof PAIN_LABELS]}
          </Text>
        </Card>

        <TouchableOpacity
          style={styles.advancedToggle}
          onPress={() => setShowAdvanced(!showAdvanced)}
          activeOpacity={0.7}
        >
          <Text style={styles.advancedToggleText}>
            {showAdvanced ? 'Less' : 'More'} Details
          </Text>
        </TouchableOpacity>

        {showAdvanced && (
          <>
            <Card variant="fog" style={styles.section}>
              <Text style={styles.sectionTitle}>Mood</Text>
              <View style={styles.moodContainer}>
                {MOOD_EMOJIS.map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    style={[
                      styles.moodButton,
                      moodEmoji === emoji && styles.moodButtonActive,
                    ]}
                    onPress={() => setMoodEmoji(emoji)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.moodEmoji}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>

            <Card style={styles.section}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.sectionSubtitle}>
                Anything you'd like to remember
              </Text>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="Food, feelings, or observations..."
                placeholderTextColor={colors.textTertiary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </Card>
          </>
        )}

        <Button
          title="Save"
          onPress={handleSubmit}
          loading={submitting}
          size="large"
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
    marginTop: 48,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  bristolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  bristolButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryVeryLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  bristolButtonActive: {
    backgroundColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  bristolButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textSecondary,
  },
  bristolButtonTextActive: {
    color: colors.white,
  },
  bristolDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  sliderButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primaryVeryLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  sliderButtonActive: {
    backgroundColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  sliderButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textSecondary,
  },
  sliderButtonTextActive: {
    color: colors.white,
  },
  sliderLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  advancedToggle: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 20,
  },
  advancedToggleText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryVeryLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  moodButtonActive: {
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  moodEmoji: {
    fontSize: 32,
  },
  notesInput: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    padding: 16,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
    minHeight: 120,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  errorText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.error,
    textAlign: 'center',
  },
});
