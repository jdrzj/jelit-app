import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trash2, Edit3 } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useEntries } from '@/hooks/useEntries';
import { Card } from '@/components/Card';
import { Companion } from '@/components/Companion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { formatDate, formatTime } from '@/utils/dateUtils';
import { BRISTOL_SCALE, URGENCY_LABELS, PAIN_LABELS } from '@/utils/constants';
import type { Entry } from '@/types/database';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function HistoryScreen() {
  const { user, loading: authLoading } = useAuth();
  const { entries, loading: entriesLoading, deleteEntry } = useEntries();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (authLoading || entriesLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please sign in to view history</Text>
      </View>
    );
  }

  const handleDelete = (entry: Entry) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEntry(entry.id);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete entry');
            }
          },
        },
      ]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <LinearGradient
      colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Journey</Text>
          <Text style={styles.subtitle}>
            {entries.length} {entries.length === 1 ? 'moment' : 'moments'}
          </Text>
        </View>

        {entries.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Companion message="Your story begins here" />
            <Text style={styles.emptyText}>
              Each entry you log will appear in this peaceful space
            </Text>
          </Card>
        ) : (
          entries.map((entry) => {
            const isExpanded = expandedId === entry.id;
            return (
              <TouchableOpacity
                key={entry.id}
                onPress={() => toggleExpand(entry.id)}
                activeOpacity={0.8}
              >
                <Card variant="subtle" style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryMoodContainer}>
                      <Text style={styles.entryMood}>
                        {entry.mood_emoji || '😐'}
                      </Text>
                    </View>
                    <View style={styles.entryHeaderRight}>
                      <Text style={styles.entryBristol}>
                        Type {entry.bristol_score}
                      </Text>
                      <Text style={styles.entryDate}>
                        {formatDate(entry.timestamp)} · {formatTime(entry.timestamp)}
                      </Text>
                    </View>
                  </View>

                  {isExpanded && (
                    <View style={styles.entryDetails}>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Bristol Type</Text>
                        <Text style={styles.detailValue}>
                          {
                            BRISTOL_SCALE[
                              entry.bristol_score as keyof typeof BRISTOL_SCALE
                            ].description
                          }
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Urgency</Text>
                        <Text style={styles.detailValue}>
                          {
                            URGENCY_LABELS[
                              entry.urgency_level as keyof typeof URGENCY_LABELS
                            ]
                          }{' '}
                          ({entry.urgency_level}/5)
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Comfort</Text>
                        <Text style={styles.detailValue}>
                          {PAIN_LABELS[entry.pain_level as keyof typeof PAIN_LABELS]}{' '}
                          ({entry.pain_level}/5)
                        </Text>
                      </View>

                      {entry.notes && entry.notes.trim() && (
                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>Notes</Text>
                          <Text style={styles.detailValue}>{entry.notes}</Text>
                        </View>
                      )}

                      <View style={styles.entryActions}>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleDelete(entry)}
                          activeOpacity={0.7}
                        >
                          <Trash2 size={16} color={colors.error} />
                          <Text style={styles.deleteButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })
        )}
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
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginTop: 8,
  },
  entryCard: {
    marginBottom: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  entryMoodContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryVeryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryMood: {
    fontSize: 28,
  },
  entryHeaderRight: {
    flex: 1,
  },
  entryBristol: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  entryDate: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
  },
  entryDetails: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  detailRow: {
    marginBottom: 14,
  },
  detailLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.error,
  },
  errorText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.error,
    textAlign: 'center',
    padding: 20,
  },
});
