import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import VerifierNumeroTelephone from '../compoments/VerifierNumeroTelephonePage/VerifierNumeroTelephone';

const VerificationNumPage = () => {
  return (
    <View style={styles.container}>
      <VerifierNumeroTelephone />
    </View>
  );
};

export default VerificationNumPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
    backgroundColor: '#f9f9f9',
  },
});



