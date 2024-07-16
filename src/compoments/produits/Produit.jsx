import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ordi from '../../image/ordinateur14.jpg';
import { useNavigation } from '@react-navigation/native';

const Produits = ({ titre }) => {
    const navigation = useNavigation()
    const [produits,setProduits] = useState([1,2,3,4,5,6])
  return (
    <View style={styles.container}>
      <View style={styles.product__page}>
        <View style={styles.navProduct}>
          <Text style={styles.title__product}>{titre}</Text>
        </View>
      </View>

      <View style={styles.box__menu}>
        {
          produits.map((item,index) => {
            
            return  <TouchableOpacity key={index} onPress={() => navigation.navigate("Détail-Produit")} style={styles.box__card}>
          <Image source={Ordi} style={styles.image} resizeMode="cover" />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Footer 1</Text>
          </View>
        </TouchableOpacity>
          })
        }

       
      </View>
    </View>
  );
};

export default Produits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 7,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f099",
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  product__page: {
    flex: 1,
    // marginHorizontal: 10,
  },
  navProduct: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1FAFA",
  },
  title__product: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#000',
    marginVertical: 10,
  },
  box__menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  box__card: {
    width: "30%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "#DDD",
    marginVertical: 10,
    justifyContent: "flex-end",
    overflow: "hidden", // Pour s'assurer que l'image ne dépasse pas le cadre
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  footer: {
    height: 35,
    backgroundColor: "#676767b0", // Couleur de fond avec opacité
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 12,
  },
});
