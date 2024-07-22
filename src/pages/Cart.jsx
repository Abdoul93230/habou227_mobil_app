import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Footer from '../compoments/footer/Footer'
import Header__page from '../compoments/header/Header__page'
import Paniermain from '../compoments/panier/Paniermain'
import PanierFooter from '../compoments/panier/PanierFooter'

const Cart = () => {
  return (
    <View style={styles.container}>
        <Header__page />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Paniermain />
        </ScrollView>
        <PanierFooter />
      <Footer />
    
    </View>
  )
}

export default Cart
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    
  });