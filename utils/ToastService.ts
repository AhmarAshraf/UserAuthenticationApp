import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  text1: string;
  text2?: string;
  visibilityTime?: number;
}

export const showToast = (type: ToastType, options: ToastOptions) => {
  Toast.show({
    type,
    text1: options.text1,
    text2: options.text2 || '',
    visibilityTime: options.visibilityTime || 3000,
    position: 'top',
    topOffset: 50,
  });
};
