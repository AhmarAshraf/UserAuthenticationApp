import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors } from '../constants/colors';
import { RootStackParamList } from '../types';
import AppHeader from '../components/AppHeader';
import { showToast } from '../utils/ToastService';

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const { signup } = useAuth();

  const validateNameField = (value: string) => {
    if (!value) return '';
    return value.trim() === '' ? 'Name cannot be empty' : '';
  };

  const validateEmailField = (value: string) => {
    if (!value) return '';
    return !validateEmail(value) ? 'Enter a valid email' : '';
  };

  const validatePasswordField = (value: string) => {
    if (!value) return '';
    return value.length < 6 ? 'Password must be at least 6 characters' : '';
  };

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }));
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
  };

  const handleSignup = async () => {
    setTouched({ name: true, email: true, password: true });

    const nameError = validateNameField(name);
    const emailError = validateEmailField(email);
    const passwordError = validatePasswordField(password);

    if (nameError || emailError || passwordError) {
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      showToast('success', {
        text1: 'Account created!',
        text2: 'You have successfully signed up.',
      });

      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (err) {
      showToast('error', {
        text1: 'Signup Failed',
        text2: err instanceof Error ? err.message : 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const nameError = touched.name ? validateNameField(name) : '';
  const emailError = touched.email ? validateEmailField(email) : '';
  const passwordError = touched.password ? validatePasswordField(password) : '';
  const isButtonDisabled =
    !name || !email || !password || !!nameError || !!emailError || !!passwordError;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Create Account" showBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>
            </View>

            <View style={styles.form}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                onBlur={handleNameBlur}
                icon="person-outline"
                autoCapitalize="words"
                autoComplete="name"
                error={nameError}
              />

              <Input
                label="Email Address"
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                onBlur={handleEmailBlur}
                icon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={emailError}
              />

              <Input
                label="Password"
                placeholder="Min 6 characters"
                value={password}
                onChangeText={setPassword}
                onBlur={handlePasswordBlur}
                icon="lock-closed-outline"
                isPassword
                autoCapitalize="none"
                autoComplete="password"
                error={passwordError}
              />

              <Button
                title="Sign Up"
                onPress={handleSignup}
                loading={loading}
                disabled={isButtonDisabled}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  form: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  linkText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
});