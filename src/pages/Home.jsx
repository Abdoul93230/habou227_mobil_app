import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Profil from "../image/logo.png";
import Header__page from '../compoments/header/Header__page'; 
import Footer from '../compoments/footer/Footer';
import Categories from '../compoments/categories/Categories';
import Bienvennue__page from '../compoments/bienvennuePlateforme/Bienvennue__page';
import Produits from '../compoments/produits/Produit';
import Ordi from '../image/ordinateur14.jpg';
import ProductsSli from '../compoments/Slider/Slider__page';
import Galerie__page from '../galerie/Galerie__page';
import FooterMain from '../compoments/footerMain/FooterMain';
import IconFooter from '../compoments/IconVersHautfooter/IconFooter';

const Home = () => {
  const fadeAnimMain = useRef(new Animated.Value(0)).current;
  const [showIcon, setShowIcon] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    Animated.timing(fadeAnimMain, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimMain]);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 600) {
      setShowIcon(true);
    } else {
      setShowIcon(false);
    }
  };

  const handleIconPress = () => {
    scrollViewRef.current.scrollTo({ y: 180, animated: true });
  };

  const products = [
    { _id: '1', name: 'Laptop A', prix: 1000, prixPromo: 900, image1: Ordi, },
    { _id: '2', name: 'Smartphone B', prix: 500, prixPromo: 450, image1:Ordi, },
    { _id: '3', name: 'Tablet C', prix: 300, prixPromo: 0, image1: Ordi, },
    { _id: '4', name: 'Headphones D', prix: 100, prixPromo: 80, image1: Ordi, },
    { _id: '5', name: 'Smartwatch E', prix: 200, prixPromo: 0, image1: Ordi, },
    { _id: '6', name: 'Camera F', prix: 800, prixPromo: 750, image1: Ordi, },
    { _id: '7', name: 'Monitor G', prix: 400, prixPromo: 350, image1: Ordi, },
    { _id: '8', name: 'Keyboard H', prix: 50, prixPromo: 45, image1: Ordi, },
    { _id: '9', name: 'Mouse I', prix: 30, prixPromo: 25, image1: Ordi, },
    { _id: '10', name: 'Printer Ji', prix: 150, prixPromo: 0, image1: Ordi, },
    { _id: '9', name: 'Mouse I', prix: 30, prixPromo: 25, image1: Ordi, },
    { _id: '10', name: 'Printer Ji', prix: 150, prixPromo: 0, image1: Ordi, },
    { _id: '4', name: 'Headphones D', prix: 100, prixPromo: 80, image1: Ordi, },
    { _id: '5', name: 'Smartwatch E', prix: 200, prixPromo: 0, image1: Ordi, },
    { _id: '6', name: 'Camera F', prix: 800, prixPromo: 750, image1: Ordi, },
    { _id: '7', name: 'Monitor G', prix: 400, prixPromo: 350, image1: Ordi, },
    { _id: '8', name: 'Keyboard H', prix: 50, prixPromo: 45, image1: Ordi, },
    { _id: '9', name: 'Mouse I', prix: 30, prixPromo: 25, image1: Ordi, },
    { _id: '10', name: 'Printer Ji', prix: 150, prixPromo: 0, image1: Ordi, },
    { _id: '9', name: 'Mouse I', prix: 30, prixPromo: 25, image1: Ordi, },
    { _id: '10', name: 'Printer Ji', prix: 150, prixPromo: 0, image1: Ordi, },
  ];

  return (
    <View style={styles.container}>
      <IconFooter />
      <Header__page />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.contenu}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // ref={scrollViewRef}
      >
        <Animated.View style={[styles.main, { opacity: fadeAnimMain }]}>
          <Categories />
          <Bienvennue__page />
          <Produits titre="Produits"/>
          <Produits titre="Electroniques" />
          <ProductsSli products={products} name="Électroniques" />
          <Galerie__page />
          <Produits titre="Homme" />
          <ProductsSli products={products} name="Homme" />
          <Produits titre="Cuisine & Ustensiles" />
          <ProductsSli products={products} name="Cuisine & Ustensiles" />
          <Produits titre="Électroménager" />
          <ProductsSli products={products} name="Électroménager" />
          <FooterMain />
        </Animated.View>
      </ScrollView>
      {showIcon && (
        <TouchableOpacity style={styles.icon} onPress={handleIconPress}>
          <AntDesign name="up" size={24} color="white" style={styles.iconCircle} />
        </TouchableOpacity>
      )}
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
    height: "auto"
  },
  contenu: {
    marginBottom: 90,
  },
  icon: {
    position: "absolute",
    bottom: 90,
    right: 20,
    padding: 10,
    backgroundColor: "#FF6A69",
    borderRadius: 50,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    color: 'white',
  }
});

export default Home;
