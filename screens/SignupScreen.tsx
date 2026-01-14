import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
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
    password: false
  });
  const { signup } = useAuth();

  const validateField = (
    field: 'name' | 'email' | 'password',
    value: string
  ) => {
    if (!value) return '';
    switch (field) {
      case 'name':
        return value.trim() === '' ? 'Name cannot be empty' : '';
      case 'email':
        return !validateEmail(value) ? 'Enter a valid email' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      default:
        return '';
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSignup = async () => {
    setTouched({ name: true, email: true, password: true });

    if (
      validateField('name', name) ||
      validateField('email', email) ||
      validateField('password', password)
    ) {
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      showToast('success', {
        text1: 'Account created!',
        text2: 'You have successfully signed up.'
      });

      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (err) {
      showToast('error', {
        text1: 'Signup Failed',
        text2: err instanceof Error ? err.message : 'Something went wrong'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Profile" showBack />
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
                onBlur={() => handleBlur('name')}
                icon="person-outline"
                autoCapitalize="words"
                autoComplete="name"
                error={touched.name ? validateField('name', name) : ''}
              />

              <Input
                label="Email Address"
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                onBlur={() => handleBlur('email')}
                icon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={touched.email ? validateField('email', email) : ''}
              />

              <Input
                label="Password"
                placeholder="Min 6 characters"
                value={password}
                onChangeText={setPassword}
                onBlur={() => handleBlur('password')}
                icon="lock-closed-outline"
                isPassword
                autoCapitalize="none"
                autoComplete="password"
                error={
                  touched.password ? validateField('password', password) : ''
                }
              />

              <Button
                title="Sign Up"
                onPress={handleSignup}
                loading={loading}
                disabled={!name || !email || !password}
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
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { marginBottom: 40 },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8
  },
  subtitle: { fontSize: 16, color: colors.textSecondary, fontWeight: '400' },
  form: { width: '100%' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 15, color: colors.textSecondary },
  linkText: { fontSize: 15, color: colors.primary, fontWeight: '600' }
});
