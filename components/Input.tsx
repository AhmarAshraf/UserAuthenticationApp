import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';

interface InputProps {
  label?: string;
  icon?: string;
  error?: string;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'off' | 'email' | 'password' | 'name' | 'username';
  editable?: boolean;
  maxLength?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  isPassword = false,
  value,
  onChangeText,
  placeholder,
  onBlur,
  onFocus,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete = 'off',
  editable = true,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const finalRightIcon = isPassword 
    ? (showPassword ? 'eye-outline' : 'eye-off-outline') 
    : undefined;

  const handleRightIconPress = isPassword ? handleTogglePassword : undefined;

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
          !editable && styles.inputWrapperDisabled,
        ]}
      >
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={isFocused ? colors.primary : colors.textSecondary}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={isPassword && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          editable={editable}
          maxLength={maxLength}
        />

        {finalRightIcon && (
          <TouchableOpacity
            style={styles.rightIconButton}
            onPress={handleRightIconPress}
            activeOpacity={0.7}
          >
            <Icon name={finalRightIcon} size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {error && error.length > 0 && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  inputWrapperDisabled: {
    backgroundColor: colors.background,
    opacity: 0.6,
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '400',
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
  },
  rightIconButton: {
    padding: 8,
    marginRight: -8,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
});
