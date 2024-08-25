import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Connexion from '../compoments/Connexion/Connexion'

const ConnexionPage = () => {
  return (
    <View style={styles.container}>
      <Connexion />
    </View>
  )
}

export default ConnexionPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13,
        backgroundColor: '#f9f9f9',
    },
})







