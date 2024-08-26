import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTP from '../compoments/VerifieOTP/OTP'
const OTPPage = () => {
  return (
    <View style={styles.container}>
      <OTP />
    </View>
  )
}

export default OTPPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13,
        backgroundColor: '#f9f9f9',
    },
})