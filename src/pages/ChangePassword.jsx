import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChangePage from '../compoments/ChangezvotreMotPasse/ChangePage'
const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <ChangePage />
    </View>
  )
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13,
        backgroundColor: '#f9f9f9',
      },
})