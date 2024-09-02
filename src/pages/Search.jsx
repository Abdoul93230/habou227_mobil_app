// src/pages/Search.js
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import Footer from '../compoments/footer/Footer'; // Adjust the path as necessary
import SearchMain from '../compoments/searchProduit/SearchMain';
import { useSelector } from 'react-redux';

const Search = () => {


  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);


  return (
    <View style={styles.container}>
        <SearchMain
        allCategories={DATA_Categories}
        allProducts={DATA_Products}
        />
      <Footer />
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
