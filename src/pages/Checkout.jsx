import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import CheckoutHeader from '../compoments/checkoutPage/CheckoutHeader'
import CheckoutMain from '../compoments/checkoutPage/CheckoutMain'
import CheckoutFooter from '../compoments/checkoutPage/CheckoutFooter'

const Checkout = () => {
  return (
    <View style={styles.CheckoutContainer}>
      <View></View>
      <CheckoutHeader />
      <ScrollView style={styles.contenu} showsVerticalScrollIndicator={false}>
        <CheckoutMain />
      </ScrollView>
      <CheckoutFooter />
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({
    CheckoutContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    contenu: {
      marginBottom: 100
      }
  
})