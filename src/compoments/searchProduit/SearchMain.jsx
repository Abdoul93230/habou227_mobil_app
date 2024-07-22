import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ordi from '../../image/Vnike2.jpg';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchMain = () => {
  const navigation = useNavigation()

  const Table__Galerie = [
    { id: 1, image: Ordi},
    { id: 2, image: Ordi},
    { id: 3, image: Ordi},
    { id: 4, image: Ordi},
    { id: 5, image: Ordi},
    { id: 6, image: Ordi},
    { id: 7, image: Ordi},
    { id: 8, image: Ordi},
    { id: 9, image: Ordi},
    { id: 10, image: Ordi },
  ];



  return (
    <View style={styles.container}>
          <View style={styles.headerContainer}>
      <View style={styles.contenu}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FF6A69" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            // onSubmitEditing={onSearch}
          />
          <TouchableOpacity style={styles.searchButton} 
          // onPress={onSearch}
          >
            <Ionicons name="search" size={24} color="#FFF" />
            <Text style={{ color: "#FFF", marginLeft: 5 }}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Homme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Électronique</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Beauté</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Cuisine & ustensiles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Électroménager</Text>
        </TouchableOpacity>
      </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
       <Text style={styles.galerie__title}>Galeries</Text>
      <View style={styles.galerie__box}>
        {Table__Galerie.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.galerie__box__img}
            // onPress={() => handleImageClick(item.id)}
          >
            <Image source={item.image} style={styles.image} />
            {/* {selectedImageIds.includes(item.id) && (
              <View style={styles.overlay}>
                <Text style={styles.imageText}>{item.text}</Text>
              </View>
            )} */}
          <View style={styles.cartFooter}>
            <View>
                <Text style={styles.ProduitName}>Nike aïr </Text>
                <Text style={styles.prix}>3750 F</Text>
            </View>
            <View style={styles.staro}>
              <AntDesign name="staro" size={18} color="#FFF" />
              <Text style={{color: "#FFF"}}>3.2</Text>
            </View>
          
         
        </View>
          </TouchableOpacity>
        ))}
    
      </View>
    </ScrollView>
     

    </View>
  );
};

export default SearchMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
  },
  galerie__title: {
    fontSize: 20,
    letterSpacing: 1,
    color: '#000',
    marginVertical: 10,
  },
  galerie__box: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#F0F0F0',
    marginBottom: 100
  },
  galerie__box__img: {
    width: '45%',
    aspectRatio: 1,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  },
  cartFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
    padding: 3,
    backgroundColor: "#ffffff56",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    },
    ProduitName: {
      fontSize: 12,
    },
    prix: {
      fontSize: 12,
      fontWeight: "bold"
    },
    staro: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ff6A69",
      width: 50,
      borderRadius: 30,
      bottom: 4,
      right: 4

    },

    ///////
    headerContainer: {
      paddingHorizontal: 10,
      backgroundColor: '#DDD',
      height: 180,
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: { height: 3, width: 0,},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 2,
    },
    contenu: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: 10,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FF6A69',
      borderRadius: 30,
      paddingHorizontal: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
    },
    searchButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF6A69',
      padding: 8,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      end: 0,
      position: "absolute"
    },
    categories: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 1,
    },
    categoryButton: {
      backgroundColor: '#FF6A69',
      borderRadius: 20,
      marginBottom: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    categoryText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
  
   
});







 