import { Button, StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from 'react-native';
import React, { useState } from 'react';
import Profil from "../../image/logo.png";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const Categories = ({categories} ) => {
  const navigation = useNavigation()
  const titre = "Categories";

  return (
    <View style={styles.container}>
      <Text style={styles.titre__img}>{titre}</Text>
      <View style={styles.menu}>
        {categories.map((category,index) => {
          if(index<6 && category.name !== "all"){
            return  <TouchableOpacity key={index} style={styles.box__img}
            onPress={() =>{ navigation.navigate('CategoriDetailPage', { categoryId: category._id });
            }}>
            <Image source={{uri:category.image}} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
          }else{
            return null;
          }
        }


        )}
        <TouchableOpacity style={styles.seeAll} onPress={() => navigation.navigate('Voir tous')}>
          <View style={styles.seeAll__icon}>
            <AntDesign name='right' size={24} color="#B2905F" />
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
    shadowColor: "#B17236",
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
    textTransform: "capitalize",    
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
