import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ParaNotification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.page}>La page seras bientôt disponible !</Text>
    </View>
  )
}

export default ParaNotification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    fontSize: 25,
  }
})