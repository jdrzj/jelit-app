import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useEntries } from '@/hooks/useEntries';
import { Card } from '@/components/Card';
import { Companion } from '@/components/Companion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { getWeekStart } from '@/utils/dateUtils';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function DashboardScreen() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { entries, loading: entriesLoading } = useEntries();

  const weeklyStats = useMemo(() => {
    const weekStart = getWeekStart();
    const weeklyEntries = entries.filter(
      (entry) => new Date(entry.timestamp) >= weekStart
    );

    const avgBristol =
      weeklyEntries.length > 0
        ? weeklyEntries.reduce((sum, e) => sum + e.bristol_score, 0) /
          weeklyEntries.length
        : 0;

    const avgUrgency =
      weeklyEntries.length > 0
        ? weeklyEntries.reduce((sum, e) => sum + e.urgency_level, 0) /
          weeklyEntries.length
        : 0;

    const avgPain =
      weeklyEntries.length > 0
        ? weeklyEntries.reduce((sum, e) => sum + e.pain_level, 0) /
          weeklyEntries.length
        : 0;

    return {
      count: weeklyEntries.length,
      avgBristol: avgBristol.toFixed(1),
      avgUrgency: avgUrgency.toFixed(1),
      avgPain: avgPain.toFixed(1),
    };
  }, [entries]);

  if (authLoading || entriesLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <LinearGradient
        colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.welcomeContainer}>
            <Companion size="large" />
            <Text style={styles.welcomeTitle}>Welcome to Jellit</Text>
            <Text style={styles.welcomeSubtitle}>
              A gentle space for digestive wellness
            </Text>
            <Text style={styles.welcomeText}>
              Take a slow breath. Sign in to begin your journey.
            </Text>
          </View>
        </View>
      </LinearGradient>
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
            <Text style={styles.greeting}>Your Space</Text>
            <Text style={styles.subtitle}>This week's gentle observations</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <Card variant="subtle" style={styles.statCard}>
            <Text style={styles.statValue}>{weeklyStats.count}</Text>
            <Text style={styles.statLabel}>entries</Text>
          </Card>

          <Card variant="subtle" style={styles.statCard}>
            <Text style={styles.statValue}>{weeklyStats.avgBristol}</Text>
            <Text style={styles.statLabel}>bristol</Text>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <Card variant="fog" style={styles.statCard}>
            <Text style={styles.statValue}>{weeklyStats.avgUrgency}</Text>
            <Text style={styles.statLabel}>urgency</Text>
          </Card>

          <Card variant="fog" style={styles.statCard}>
            <Text style={styles.statValue}>{weeklyStats.avgPain}</Text>
            <Text style={styles.statLabel}>comfort</Text>
          </Card>
        </View>

        {entries.length === 0 && (
          <Card style={styles.emptyCard}>
            <Companion message="Ready when you are" />
            <Text style={styles.emptyText}>
              Take your time. Log your first entry when it feels right.
            </Text>
          </Card>
        )}

        {entries.length > 0 && (
          <Card style={styles.recentCard}>
            <Text style={styles.sectionTitle}>Recent Moments</Text>
            {entries.slice(0, 3).map((entry, index) => (
              <View key={entry.id} style={[styles.recentEntry, index === 0 && styles.recentEntryFirst]}>
                <View style={styles.recentEntryInfo}>
                  <Text style={styles.recentEntryBristol}>
                    {entry.mood_emoji || '😐'}
                  </Text>
                  <Text style={styles.recentEntryTime}>
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.recentEntryType}>
                  Type {entry.bristol_score}
                </Text>
              </View>
            ))}
          </Card>
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/(tabs)/log')}
          activeOpacity={0.8}
        >
          <Plus size={24} color={colors.white} strokeWidth={2.5} />
        </TouchableOpacity>
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
    paddingBottom: 100,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  welcomeTitle: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    maxWidth: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
    marginTop: 48,
  },
  greeting: {
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
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 28,
  },
  statValue: {
    fontSize: typography.fontSize.huge,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  emptyCard: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    maxWidth: 280,
    marginTop: 8,
  },
  recentCard: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  recentEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  recentEntryFirst: {
    borderTopWidth: 0,
  },
  recentEntryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentEntryBristol: {
    fontSize: 28,
  },
  recentEntryTime: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
  },
  recentEntryType: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.textPrimary,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
});
