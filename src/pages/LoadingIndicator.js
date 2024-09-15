import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, Text, StyleSheet } from 'react-native';

const LoadingIndicator = ({ loading, children }) => {
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        color="#30A08B"
      />
      {!loading && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#B2905F',
  },
});

export default LoadingIndicator;
