// toastConfig.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: ({ text1, ...rest }) => (
    <BaseToast
      {...rest}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text1={text1}
    />
  ),
  error: ({ text1, ...rest }) => (
    <ErrorToast
      {...rest}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text1={text1}
    />
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: 'green',
    backgroundColor: '#e6ffe6',
  },
  errorToast: {
    borderLeftColor: 'red',
    backgroundColor: '#ffe6e6',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default toastConfig;
