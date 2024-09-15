import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import CheckoutHeader from '../compoments/checkoutPage/CheckoutHeader'
import CheckoutMain from '../compoments/checkoutPage/CheckoutMain'
import CheckoutFooter from '../compoments/checkoutPage/CheckoutFooter'

const Checkout = () => {
  const checkoutMainRef = useRef(null);
  const [total,setTotal] = useState(0)
  const [reduction,setReduction] = useState(0)


  // Fonction appelée dans CheckoutFooter qui déclenche la fonction de CheckoutMain
  const handleFooterClick = () => {
    if (checkoutMainRef.current) {
      checkoutMainRef.current.Plasser(); // Appelle la fonction dans CheckoutMain
    }
  };


  const chgTotal = (t)=>{
    setTotal(t)
  }
  const chgReduction = (t)=>{
    setReduction(t)
  }




  return (
    <View style={styles.CheckoutContainer}>

      <CheckoutHeader />
      <ScrollView style={styles.contenu} showsVerticalScrollIndicator={false}>
        <CheckoutMain ref={checkoutMainRef} chgTotal={chgTotal} chgReduction={chgReduction} />
      </ScrollView>
      {
    total>0?<CheckoutFooter onFooterClick={handleFooterClick} total={total} reduction={reduction} />:<></>
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
