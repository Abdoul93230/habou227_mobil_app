import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SuivreCommandePage from '../compoments/maCommande/SuivreCommandePage'
import SuivreCommandeHeader from '../compoments/maCommande/SuivreCommandeHeader'
import { useSelector } from 'react-redux'
const SuivreCommande = ({route}) => {

  const DATA_Products = useSelector((state) => state.products.data);



  const commande  = route.params;
  // console.log(commande)
  return (
    <View style={styles.container}>
      <SuivreCommandeHeader commande={commande} />
      <SuivreCommandePage allProducts={DATA_Products} commande={commande}/>
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
