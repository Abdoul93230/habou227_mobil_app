import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Inscription from '../compoments/inscription/Inscription'
const InscriptionPage = () => {
  return (
    <View style={styles.container}>
      <Inscription />
    </View>
  )
}

export default InscriptionPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13,
        backgroundColor: '#fff',
    },
})



