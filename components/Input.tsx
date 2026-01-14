import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';

interface InputProps {
  label?: string;
  icon?: string;
  error?: string;
  isPassword?: boolean;
  onRightIconPress?: () => void;
  rightIcon?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  isPassword = false,
  onRightIconPress,
  rightIcon,
  value,
  onChangeText,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const finalRightIcon = isPassword ? (showPassword ? 'eye-outline' : 'eye-off-outline') : rightIcon;
  const handleRightIconPress = isPassword ? handleTogglePassword : onRightIconPress;

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error ? styles.inputWrapperError : {}
      ]}>
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          {...rest}
        />

        {finalRightIcon && (
          <TouchableOpacity style={styles.rightIconButton} onPress={handleRightIconPress}>
            <Icon name={finalRightIcon} size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 16, borderWidth: 2, borderColor: colors.border, paddingHorizontal: 16, height: 56 },
  inputWrapperFocused: { borderColor: colors.primary },
  inputWrapperError: { borderColor: colors.error },
  leftIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: colors.text, fontWeight: '400', paddingVertical: Platform.OS === 'ios' ? 12 : 0 },
  rightIconButton: { padding: 8 },
  errorText: { color: colors.error, fontSize: 13, marginTop: 4 }
});

// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps, Platform } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { colors } from '../constants/colors';

// interface InputProps extends TextInputProps {
//   label?: string;
//   icon?: string;
//   error?: string;
//   isPassword?: boolean;
//   onRightIconPress?: () => void;
//   rightIcon?: string;
// }

// export const Input: React.FC<InputProps> = ({
//   label,
//   icon,
//   error,
//   isPassword = false,
//   onRightIconPress,
//   rightIcon,
//   ...textInputProps
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const finalRightIcon = isPassword 
//     ? (showPassword ? 'eye-outline' : 'eye-off-outline')
//     : rightIcon;

//   const handleRightIconPress = isPassword 
//     ? handleTogglePassword 
//     : onRightIconPress;

//   return (
//     <View style={styles.container}>
//       {label && <Text style={styles.label}>{label}</Text>}

//       <View style={[
//         styles.inputWrapper,
//         isFocused && styles.inputWrapperFocused,
//         error && styles.inputWrapperError
//       ]}>
//         {icon && (
//           <Icon 
//             name={icon} 
//             size={20} 
//             color={isFocused ? colors.primary : colors.textSecondary}
//             style={styles.leftIcon}
//           />
//         )}

//         <TextInput
//           style={styles.input}
//           placeholderTextColor={colors.placeholder}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           secureTextEntry={isPassword && !showPassword}
//           underlineColorAndroid="transparent"
//           {...textInputProps}
//         />

//         {finalRightIcon && (
//           <TouchableOpacity
//             style={styles.rightIconButton}
//             onPress={handleRightIconPress}
//             activeOpacity={0.7}
//           >
//             <Icon 
//               name={finalRightIcon} 
//               size={22} 
//               color={colors.textSecondary}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: colors.text,
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.card,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderColor: colors.border,
//     paddingHorizontal: 16,
//     height: 56,
//   },
//   inputWrapperFocused: {
//     borderColor: colors.primary,
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   inputWrapperError: {
//     borderColor: colors.error,
//   },
//   leftIcon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: colors.text,
//     fontWeight: '400',
//     paddingVertical: Platform.OS === 'ios' ? 12 : 0,
//   },
//   rightIconButton: {
//     padding: 8,
//   },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//     paddingHorizontal: 4,
//   },
//   errorText: {
//     color: colors.error,
//     fontSize: 13,
//     marginLeft: 6,
//     fontWeight: '500',
//     flex: 1,
//   },
// });
