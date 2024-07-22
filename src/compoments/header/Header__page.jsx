import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import Profil from "../../image/logo.png";
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Header__page = () => {
  const navigation = useNavigation();
    const fadeAnimHeader = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnimHeader, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start();
    }, [fadeAnimHeader]);
  return (
    <Animated.View style={[styles.header, { opacity: fadeAnimHeader }]}>
    <Image source={Profil} style={styles.image} />
    <View style={styles.shoppingIcon}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ChatMessage')}>
        <Entypo name='circle' size={24} color="black" />
        <View style={styles.circleBTN}>
          <Text style={styles.badgeText}>0</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Cart")}>
        <Feather name="shopping-cart" size={24} color="black" />
        <View style={styles.circleBTN}>
          <Text style={styles.badgeText}>0</Text>
        </View>
      </TouchableOpacity>
    </View>
  </Animated.View>
    
  )
}

export default Header__page;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 12,
        width: "100%",
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#000",
        paddingTop: 40, // Ensures adequate space for status bar
        paddingBottom: 10,
        backgroundColor: "#DDD"
      },
      image: {
        width: 95,
        height: 50,
        resizeMode: 'contain',
      },
      shoppingIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        width: 85,
      },
      iconContainer: {
        position: 'relative',
      },
      circleBTN: {
        position: 'absolute',
        top: -5,
        right: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#FF6A69",
        justifyContent: 'center',
        alignItems: 'center',
      },
      badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: 'bold',
      },
})