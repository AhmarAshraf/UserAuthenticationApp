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
import { showToast } from '../utils/ToastService';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validateEmailField = (value: string) => {
    if (!value) return '';
    return !validateEmail(value) ? 'Enter a valid email' : '';
  };

  const validatePasswordField = (value: string) => {
    if (!value) return '';
    return value.length < 6 ? 'Password must be at least 6 characters' : '';
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
  };

  const handleLogin = async () => {
    setTouched({ email: true, password: true });

    const emailError = validateEmailField(email);
    const passwordError = validatePasswordField(password);

    if (emailError || passwordError) {
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showToast('success', {
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      showToast('error', {
        text1: 'Login Failed',
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const emailError = touched.email ? validateEmailField(email) : '';
  const passwordError = touched.password ? validatePasswordField(password) : '';
  const isButtonDisabled = !email || !password || !!emailError || !!passwordError;

  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your journey</Text>
            </View>

            <View style={styles.form}>
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
                placeholder="Enter your password"
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
                title="Login"
                onPress={handleLogin}
                loading={loading}
                disabled={isButtonDisabled}
                variant="primary"
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.linkText}>Go to Signup</Text>
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
