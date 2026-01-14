
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
import Toast from 'react-native-toast-message';
import { showToast } from '../service/ToastService';

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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
   showToast('success', { text1: 'Login Successful', text2: 'Welcome back!' });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
  showToast('error', { text1: 'Login Failed', text2: err instanceof Error ? err.message : 'Login failed' });

    } finally {
      setLoading(false);
    }
  };

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
                onChangeText={text => {
                  setEmail(text);
                  setEmailError(!validateEmail(text) ? 'Check your email' : '');
                }}
                onBlur={() => {
                  setEmailError(!validateEmail(email) ? 'Check your email' : '');
                }}
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
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError(text.length < 6 ? 'Password must be at least 6 chars' : '');
                }}
                onBlur={() => {
                  setPasswordError(password.length < 6 ? 'Password must be at least 6 chars' : '');
                }}
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
                disabled={!email || !password || emailError || passwordError}
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
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { marginBottom: 40 },
  title: { fontSize: 36, fontWeight: '700', color: colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.textSecondary, fontWeight: '400' },
  form: { width: '100%' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 15, color: colors.textSecondary },
  linkText: { fontSize: 15, color: colors.primary, fontWeight: '600' }
});
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useAuth } from '../context/AuthContext';
// import { Button } from '../components/Button';
// import { Input } from '../components/Input';
// import { colors } from '../constants/colors';
// import { RootStackParamList } from '../types';
// import Toast from 'react-native-toast-message';

// type LoginScreenProps = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
// };

// export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     setError('');
//     setLoading(true);
//     try {
//       await login(email, password);
//       Toast.show({
//         type: 'success',
//         text1: 'Login Successful',
//         text2: 'Welcome back!',
//         visibilityTime: 3000
//       });
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }]
//       });
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Login failed';
//       setError(message);
//       Toast.show({
//         type: 'error',
//         text1: 'Login Failed',
//         text2: message,
//         visibilityTime: 3000
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.content}>
//             <View style={styles.header}>
//               <Text style={styles.title}>Welcome Back</Text>
//               <Text style={styles.subtitle}>
//                 Sign in to continue your journey
//               </Text>
//             </View>

//             <View style={styles.form}>
//               <Input
//                 label="Email Address"
//                 placeholder="your.email@example.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 icon="mail-outline"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoComplete="email"
//                 error={error ? ' ' : ''}
//               />

//               <Input
//                 label="Password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChangeText={setPassword}
//                 icon="lock-closed-outline"
//                 isPassword
//                 autoCapitalize="none"
//                 autoComplete="password"
//                 error={error ? ' ' : ''}
//               />

//               {error && (
//                 <View style={styles.errorContainer}>
//                   <Ionicons
//                     name="alert-circle-outline"
//                     size={20}
//                     color={colors.error}
//                   />
//                   <Text style={styles.errorText}>{error}</Text>
//                 </View>
//               )}

//               <Button
//                 title="Login"
//                 onPress={handleLogin}
//                 loading={loading}
//                 disabled={!email || !password}
//                 variant="primary"
//               />

//               <View style={styles.footer}>
//                 <Text style={styles.footerText}>Don't have an account? </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//                   <Text style={styles.linkText}>Go to Signup</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background
//   },
//   keyboardView: { flex: 1 },
//   scrollContent: { flexGrow: 1 },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24
//   },
//   header: { marginBottom: 40 },
//   title: {
//     fontSize: 36,
//     fontWeight: '700',
//     color: colors.text,
//     marginBottom: 8
//   },
//   subtitle: {
//     fontSize: 16,
//     color: colors.textSecondary,
//     fontWeight: '400'
//   },
//   form: { width: '100%' },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FEE2E2',
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 16
//   },
//   errorText: {
//     color: colors.error,
//     fontSize: 14,
//     marginLeft: 8,
//     fontWeight: '500',
//     flex: 1
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24
//   },
//   footerText: {
//     fontSize: 15,
//     color: colors.textSecondary
//   },
//   linkText: {
//     fontSize: 15,
//     color: colors.primary,
//     fontWeight: '600'
//   }
// });
