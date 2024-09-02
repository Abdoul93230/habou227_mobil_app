import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SuivreCommandePage from '../compoments/maCommande/SuivreCommandePage'
import SuivreCommandeHeader from '../compoments/maCommande/SuivreCommandeHeader'
const SuivreCommande = () => {
  return (
    <View style={styles.container}>
      <SuivreCommandeHeader />
      <SuivreCommandePage />
    </View>
  )
}

export default SuivreCommande

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      },
})