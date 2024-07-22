// src/pages/Search.js
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import React from 'react';
import Footer from '../compoments/footer/Footer'; // Adjust the path as necessary
import SearchMain from '../compoments/searchProduit/SearchMain';

const Search = () => {
  return (
    <View style={styles.container}>
        <SearchMain />

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
