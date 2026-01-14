import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { colors } from '../constants/colors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await logout();
      Toast.show({
        type: 'success',
        text1: 'Logged out',
        text2: 'You have successfully logged out.'
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Logout failed',
        text2: err instanceof Error ? err.message : 'Something went wrong'
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{user?.name}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="information-circle"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.cardTitle}>Account Information</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={colors.textSecondary}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{user?.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.textSecondary}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>{user?.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            icon={
              <Ionicons
                name="log-out-outline"
                size={20}
                color={colors.primary}
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    padding: 24
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center'
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colors.primary
  },
  greeting: {
    fontSize: 20,
    color: colors.textSecondary,
    marginBottom: 4
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 12
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  infoContent: {
    flex: 1
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4
  },
  value: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500'
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center'
  }
});
