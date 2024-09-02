import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategorieDetails from '../compoments/CategorieDetails/CategorieDetails'
const CategoriDetailPage = () => {
  return (
    <View style={styles.container}>
      <CategorieDetails />
    </View>
  )
}

export default CategoriDetailPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})