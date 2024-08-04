import { Button, StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from 'react-native';
import React, { useState } from 'react';
import Profil from "../../image/logo.png";
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const Categories = ({categories} ) => {
  const titre = "Categories";
  const [Categories, setCategories] = useState([
    { id: 1, name: "Homme", image: require("../../image/IHFt.jpg") },
    { id: 2, name: "Électroniques", image: require("../../image/IHFt.jpg") },
    { id: 3, name: "Bauté", image: require("../../image/IHFt.jpg") },
    { id: 4, name: "All", image: require("../../image/IHFt.jpg") },
    { id: 5, name: "Cuisine & Ustensiles", image: require("../../image/IHFt.jpg") },
    { id: 6, name: "Électroménager", image: require("../../image/IHFt.jpg") },
    // { id: 7, name: "Travel", image: require("../../image/IHFt.jpg") },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.titre__img}>{titre}</Text>
      <View style={styles.menu}>
        {categories.map((category,index) => {
          if(index<6 && category.name !== "all"){
            return  <View key={index} style={styles.box__img}>
            <Image source={{uri:category.image}} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
          }else{
            return null;
          }
        }


        )}
        <TouchableOpacity style={styles.seeAll}>
          <View style={styles.seeAll__icon}>
            <AntDesign name='right' size={24} color="#FF6A69" />
          </View>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF00',
    marginBottom:10,
  },
  titre__img: {
    padding: 12,
    fontSize: 30,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 6,
    flexWrap: 'wrap',
  },
  box__img: {
    width: width * 0.20, // Largeur relative
    height: width * 0.20, // Hauteur relative pour garder le carré
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 50,
    shadowColor: "#FF6A69",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,

  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: width * 0.026,
    fontWeight: 'sans serif',
  },
  seeAll: {
    width: 100,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeAll__icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: 'sans serif',
  },
});
