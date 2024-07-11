// src/pages/Search.js
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import React from 'react';
import Footer from '../compoments/footer/Footer'; // Adjust the path as necessary
import Header__page from '../compoments/header/Header__page';

const Search = () => {
  return (
    <View style={styles.container}>
      <Header__page />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contenu}>
        <Text>Abassa Soumana</Text>
      </ScrollView>
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
  contenu: {
    marginBottom: 90,
  },
});
