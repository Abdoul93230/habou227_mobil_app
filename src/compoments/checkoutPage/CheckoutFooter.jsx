


import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';


const CheckoutFooter = ({total,reduction,onFooterClick}) => {
    const navigation = useNavigation();


  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerDetails}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>CFA {total}</Text>
          {
            reduction>0?<Text style={styles.totalAmount}>Reduction : CFA {total}</Text>:<></>
          }
          {/* <Text style={styles.shippingInfo}>livraison: CFA 1000 (Niamey)</Text> */}
          <Text style={styles.shippingInfo}>{total>1000?'shipping : 1000 Niamey':total>20000?"shipping : 1500 Niamey":"Free Bomestic shipping"}</Text>
        </View>
      </View>
      <View style={styles.footerAction}>
        <TouchableOpacity style={styles.buttonCheck} onPress={onFooterClick}>
        <Feather name="arrow-right-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Passer la commande</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CheckoutFooter

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    position: "absolute",
    bottom: 0,
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
    width: '125%',
    elevation: 10,
    marginRight: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
})
