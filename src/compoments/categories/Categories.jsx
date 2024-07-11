import { Button, StyleSheet, Text, View, Image, TouchableOpacity,Platform } from 'react-native';
import React, { useState } from 'react';
import Profil from "../../image/logo.png";
import { AntDesign } from '@expo/vector-icons';

const Categories = () => {
  const titre = "Categories";
  const [categories, setCategories] = useState([
    { id: 1, name: "Homme", image: require("../../image/IHFt.jpg") },
    { id: 2, name: "Électroniques", image: require("../../image/IHFt.jpg") },
    { id: 3, name: "Bauté", image: require("../../image/IHFt.jpg") },
    { id: 4, name: "All", image: require("../../image/IHFt.jpg") },
    { id: 5, name: "Cuisine & Ustensiles", image: require("../../image/IHFt.jpg") },
    { id: 6, name: "Électroménager", image: require("../../image/IHFt.jpg") },

  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.titre__img}>{titre}</Text>
      <View style={styles.menu}>
        {categories.map((category) => (
          <View key={category.id} style={styles.box__img}>
            {
              Platform.OS === 'android'?(
                <View style={styles.box__img1}>
                  <Image source={category.image} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
              ):Platform.OS === 'ios'?(<>
                <Image source={category.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{category.name}</Text>
                </>
              ):{}
            }
            {/* <Image source={category.image} style={styles.categoryImage} /> */}
            {/* <Text style={styles.categoryText}>{category.name}</Text> */}
          </View>
        ))}
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
  },
  titre__img: {
    padding: 12,
    fontSize: 30,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 3,
    flexWrap: 'wrap',
  },
  box__img: {
    width: 100,
    height: 100,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 50,
    shadowColor: "#FF6A69",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.50,

    shadowRadius: 3.84,
    ...Platform.select({
      android: {
        width: 90,
        height: 90,
        // backgroundColor:'white',
        // flex:1,
        // alignContent:'center',

        borderRadius: 0,
        // borderRadius: 0,

      },
      ios: {

      }
    }),
  },
  box__img1: {
    width: 80,
    height: 50,
    backgroundColor:'white',
    borderRadius: 5,
    shadowColor: "#FF6A69",
    shadowRadius: 11, // Android
    elevation: 7,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    marginBottom: 10,
    ...Platform.select({
      android: {
        width: "100%",
        height: "100%",
        borderRadius: 5,

        elevation: 5, // Android
        resizeMode: 'contain',
      },
      ios: {

      }
    }),
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'sans serif',
    alignContent:"center",
    textAlign:'center',
    ...Platform.select({
      android: {
        fontSize: 12,
        fontWeight: 'sans serif',
        // alignItems:'center'
      },
      ios: {

      }
    }),

  },
  seeAll: {
    width: 100,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        // borderWidth:2,
        // borderColor:'red',
        marginTop:-17
      },
      ios: {

      }
    }),
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
    ...Platform.select({
      android: {
        // borderWidth:2,
        // borderColor:'red',
        width: 80,
        height: 50,
        borderRadius: 5,
        elevation: 5, // Android
        shadowColor: "#FF6A69",
    shadowRadius: 11, // Android

      },
      ios: {

      }
    }),
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: 'sans serif',
    ...Platform.select({
      android: {
        fontSize: 12,
      },
      ios: {

      }
    }),
  },
});
