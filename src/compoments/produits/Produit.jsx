import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Ordi from '../../image/ordinateur14.jpg';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const Produits = ({ products, name }) => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.product__page}>
        <View style={styles.navProduct}>
          <Text style={styles.title__product}>{name}</Text>
        </View>
      </View>

      <View style={styles.box__menu}>
        {
          products?.map((item,index) => {

            return <TouchableOpacity key={index} onPress={() => navigation.navigate("Détail-Produit",{ id: item._id })} style={styles.box__card}>
          <Image source={{uri:item.image1}} style={styles.image} resizeMode="cover" />
          <View style={styles.footer}>
            <Text style={styles.footerText}>{item.name.slice(0, 20)}...</Text>
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
  //Produit composant
  container: {
    flex: 1,
    marginTop: 7,
    marginHorizontal: 5,
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
    backgroundColor: "#FECC85",
    borderRadius: 10,
  },
  title__product: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#30A08B',
    marginVertical: 10,
    textTransform: 'capitalize',
  },
  box__menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    top: 12,
  },
  box__card: {
    width: "30%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "#FFF8E1",
    marginVertical: 10,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderColor: "#FF9800",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  footer: {
    height: 35,
<<<<<<< HEAD
    // backgroundColor: "rgba(255, 152, 0, 0.48)",
    backgroundColor: "#30a08bb5",
=======
    backgroundColor: "#30a08b89", 
>>>>>>> 9c76883299a9447ec7346dfc180fd0400b886817
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
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
});
