import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LogOut, Mail, Download } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { LoadingScreen } from '@/components/LoadingScreen';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function SettingsScreen() {
  const { user, loading, signInWithEmail, signUpWithEmail, signOut } =
    useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setSubmitting(true);
      if (isSignUp) {
        await signUpWithEmail(email, password);
        Alert.alert('Success', 'Account created successfully');
      } else {
        await signInWithEmail(email, password);
        Alert.alert('Success', 'Signed in successfully');
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Authentication failed'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch (error) {
            Alert.alert('Error', 'Failed to sign out');
          }
        },
      },
    ]);
  };

  const handleExport = () => {
    Alert.alert(
      'Export Data',
      'Data export functionality will be available in a future update. Your data is securely stored and always accessible.',
      [{ text: 'OK' }]
    );
  };

  return (
    <LinearGradient
      colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Your space, your way</Text>
        </View>

        {user && user.is_anonymous && (
          <Card variant="fog" style={styles.warningCard}>
            <Text style={styles.warningTitle}>Anonymous Session</Text>
            <Text style={styles.warningText}>
              Create an account below to keep your data safe across devices.
            </Text>
          </Card>
        )}

        {user && !user.is_anonymous && (
          <Card variant="subtle" style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.accountInfo}>
              <Mail size={20} color={colors.primary} />
              <Text style={styles.accountEmail}>{user.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
              activeOpacity={0.7}
            >
              <LogOut size={18} color={colors.error} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </Card>
        )}

        {(!user || user.is_anonymous) && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Button
              title={isSignUp ? 'Create Account' : 'Sign In'}
              onPress={handleAuth}
              loading={submitting}
              size="large"
            />

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsSignUp(!isSignUp)}
              activeOpacity={0.7}
            >
              <Text style={styles.toggleButtonText}>
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </Text>
            </TouchableOpacity>
          </Card>
        )}

        <Card variant="fog" style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <Text style={styles.privacyText}>
            Your wellness journey is private. All data is encrypted and stored securely.
          </Text>
          <Text style={styles.privacyText}>
            We use Row Level Security to ensure only you can access your entries. Your data is never shared.
          </Text>
        </Card>

        <Card variant="subtle" style={styles.section}>
          <Text style={styles.sectionTitle}>About Jellit</Text>
          <Text style={styles.aboutText}>
            Jellit is a gentle companion for digestive wellness. Track moments mindfully and discover patterns over time.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </Card>
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
  warningCard: {
    marginBottom: 20,
  },
  warningTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  warningText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: colors.primaryVeryLight,
    borderRadius: 16,
    marginBottom: 12,
  },
  accountEmail: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.textPrimary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: colors.errorLight,
    borderRadius: 16,
  },
  signOutText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.error,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    padding: 18,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  toggleButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  privacyText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    marginBottom: 12,
  },
  versionText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.textTertiary,
  },
});
