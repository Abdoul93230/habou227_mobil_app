import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';


const PanierFooter = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerDetails}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>CFA 5000</Text>
          <Text style={styles.shippingInfo}>livraison: CFA 1000 (Niamey)</Text>
        </View>
      </View>
      <View style={styles.footerAction}>
        <TouchableOpacity style={styles.buttonCheck} onPress={() => navigation.navigate('Checkout')}>
            <MaterialIcons name="shopping-cart-checkout" size={24} color="white"/>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PanierFooter

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    position: "absolute",
    bottom: 90,
    width: "100%",
    backgroundColor: "#f8f9fa",
    padding: 16, 
    borderTopWidth: 1,
    borderColor: '#ddd',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  footerDetails: {
    flex: 2,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 4,
  },
  shippingInfo: {
    fontSize: 14,
    color: '#777',
  },
  footerAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCheck: {
    flexDirection: 'row',
    backgroundColor: "#FF6A69",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
})
