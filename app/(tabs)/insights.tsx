import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { useEntries } from '@/hooks/useEntries';
import { Card } from '@/components/Card';
import { Companion } from '@/components/Companion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { getWeekStart, getMonthStart } from '@/utils/dateUtils';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

type Period = 'week' | 'month';

export default function InsightsScreen() {
  const { user, loading: authLoading } = useAuth();
  const { entries, loading: entriesLoading } = useEntries();
  const [period, setPeriod] = useState<Period>('week');

  const insights = useMemo(() => {
    const startDate = period === 'week' ? getWeekStart() : getMonthStart();
    const filteredEntries = entries.filter(
      (entry) => new Date(entry.timestamp) >= startDate
    );

    if (filteredEntries.length === 0) {
      return null;
    }

    const avgBristol =
      filteredEntries.reduce((sum, e) => sum + e.bristol_score, 0) /
      filteredEntries.length;

    const avgUrgency =
      filteredEntries.reduce((sum, e) => sum + e.urgency_level, 0) /
      filteredEntries.length;

    const avgPain =
      filteredEntries.reduce((sum, e) => sum + e.pain_level, 0) /
      filteredEntries.length;

    const bristolDistribution = filteredEntries.reduce(
      (acc, entry) => {
        acc[entry.bristol_score] = (acc[entry.bristol_score] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>
    );

    const mostCommonBristol = Object.entries(bristolDistribution).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const entriesWithNotes = filteredEntries.filter(
      (e) => e.notes && e.notes.trim().length > 0
    );

    const keywords: Record<string, number> = {};
    entriesWithNotes.forEach((entry) => {
      const words = entry.notes!
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 3);
      words.forEach((word) => {
        keywords[word] = (keywords[word] || 0) + 1;
      });
    });

    const topKeywords = Object.entries(keywords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      count: filteredEntries.length,
      avgBristol: avgBristol.toFixed(1),
      avgUrgency: avgUrgency.toFixed(1),
      avgPain: avgPain.toFixed(1),
      mostCommonBristol: mostCommonBristol
        ? `Type ${mostCommonBristol[0]} (${mostCommonBristol[1]} times)`
        : 'N/A',
      bristolDistribution,
      topKeywords,
    };
  }, [entries, period]);

  if (authLoading || entriesLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please sign in to view insights</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Patterns</Text>
            <Text style={styles.subtitle}>Gentle observations</Text>
          </View>
        </View>

        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              period === 'week' && styles.periodButtonActive,
            ]}
            onPress={() => setPeriod('week')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === 'week' && styles.periodButtonTextActive,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              period === 'month' && styles.periodButtonActive,
            ]}
            onPress={() => setPeriod('month')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === 'month' && styles.periodButtonTextActive,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>

        {!insights ? (
          <Card style={styles.emptyCard}>
            <Companion message="Taking time to notice" />
            <Text style={styles.emptyText}>
              Patterns emerge with time. Keep logging gently.
            </Text>
          </Card>
        ) : (
          <>
            <Card variant="subtle" style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Moments logged</Text>
                <Text style={styles.statValue}>{insights.count}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Bristol average</Text>
                <Text style={styles.statValue}>{insights.avgBristol}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Urgency average</Text>
                <Text style={styles.statValue}>{insights.avgUrgency}/5</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Comfort average</Text>
                <Text style={styles.statValue}>{insights.avgPain}/5</Text>
              </View>
              <View style={[styles.statRow, styles.statRowLast]}>
                <Text style={styles.statLabel}>Most common</Text>
                <Text style={styles.statValue}>{insights.mostCommonBristol}</Text>
              </View>
            </Card>

            <Card variant="fog" style={styles.section}>
              <Text style={styles.sectionTitle}>Bristol Patterns</Text>
              {Object.entries(insights.bristolDistribution)
                .sort((a, b) => Number(a[0]) - Number(b[0]))
                .map(([type, count]) => {
                  const percentage = ((count / insights.count) * 100).toFixed(0);
                  return (
                    <View key={type} style={styles.distributionRow}>
                      <Text style={styles.distributionLabel}>Type {type}</Text>
                      <View style={styles.distributionBarContainer}>
                        <View
                          style={[
                            styles.distributionBar,
                            { width: `${percentage}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.distributionValue}>
                        {count} ({percentage}%)
                      </Text>
                    </View>
                  );
                })}
            </Card>

            {insights.topKeywords.length > 0 && (
              <Card style={styles.section}>
                <Text style={styles.sectionTitle}>Note Themes</Text>
                <View style={styles.keywordsContainer}>
                  {insights.topKeywords.map(([word, count]) => (
                    <View key={word} style={styles.keywordTag}>
                      <Text style={styles.keywordText}>
                        {word} ({count})
                      </Text>
                    </View>
                  ))}
                </View>
              </Card>
            )}

            <Card variant="subtle" style={styles.disclaimerCard}>
              <Text style={styles.disclaimerText}>
                These observations are for personal reflection. Always consult healthcare professionals for medical guidance.
              </Text>
            </Card>
          </>
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
    marginBottom: 24,
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 6,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.textSecondary,
  },
  periodButtonTextActive: {
    color: colors.white,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  statRowLast: {
    borderBottomWidth: 0,
  },
  statLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
  },
  distributionRow: {
    marginBottom: 16,
  },
  distributionLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  distributionBarContainer: {
    height: 28,
    backgroundColor: colors.primaryVeryLight,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 6,
  },
  distributionBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 14,
  },
  distributionValue: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  keywordTag: {
    backgroundColor: colors.primaryVeryLight,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  keywordText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  disclaimerCard: {
    backgroundColor: colors.fogBlueLight,
  },
  disclaimerText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
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
  errorText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.error,
    textAlign: 'center',
    padding: 20,
  },
});
