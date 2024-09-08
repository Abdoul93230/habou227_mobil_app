import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import CheckoutHeader from '../compoments/checkoutPage/CheckoutHeader'
import CheckoutMain from '../compoments/checkoutPage/CheckoutMain'
import CheckoutFooter from '../compoments/checkoutPage/CheckoutFooter'

const Checkout = () => {
  const [total,setTotal] = useState(0)
  const [reduction,setReduction] = useState(0)
  const checkoutMainRef = useRef(null);
  const chgTotal = (t)=>{
    setTotal(t)
  }
  const chgReduction = (t)=>{
    setReduction(t)
  }

  const handleButtonClick = () => {
    if (checkoutMainRef.current) {
      checkoutMainRef.current.Plasser(); // Assurez-vous que `yourFunctionName` est la méthode que vous souhaitez appeler
    }
  };


  return (
    <View style={styles.CheckoutContainer}>
      <View></View>
      <CheckoutHeader />
      <ScrollView style={styles.contenu} showsVerticalScrollIndicator={false}>
        <CheckoutMain chgTotal={chgTotal} chgReduction={chgReduction} />
      </ScrollView>
      {
    total>0?<CheckoutFooter onButtonClick={handleButtonClick} total={total} reduction={reduction} />:<></>
  }
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
