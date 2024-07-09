import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import Profil from "../image/logo.png";
import Header__page from '../compoments/header/Header__page'; 
import Footer from '../compoments/footer/Footer';
import Categories from '../compoments/categories/Categories';

const Home = () => {
  const fadeAnimMain = useRef(new Animated.Value(0)).current;


  useEffect(() => {


    Animated.timing(fadeAnimMain, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();


  }, [ fadeAnimMain]);

  return (
    <View style={styles.container}>
      <Header__page />
      
      <Animated.View style={[styles.main, { opacity: fadeAnimMain }]}>
        <Categories />
      </Animated.View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  main: {
    flex: 1,
    
  },
});

export default Home;
