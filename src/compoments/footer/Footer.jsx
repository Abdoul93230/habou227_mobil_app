import { StyleSheet, Text,TouchableOpacity, Animated  } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { Feather, Entypo } from '@expo/vector-icons';

const Footer = () => {
    const fadeAnimFooter = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.timing(fadeAnimFooter, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start();
      }, [fadeAnimFooter]);

  return (
      <Animated.View style={[styles.footer, { opacity: fadeAnimFooter }]}>
      <TouchableOpacity style={styles.footerIcon}>
        <Feather name="home" size={24} color="black" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon}>
        <Feather name="search" size={24} color="black" />
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon}>
        <Feather name="shopping-cart" size={24} color="black" />
        <Text>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon}>
        <Feather name="user" size={24} color="black" />
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon}>
        <Feather name="menu" size={24} color="black" />
        <Text>More</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Footer;

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 90,
        borderTopWidth: 1,
        borderColor: '#000',
        backgroundColor: '#DDD',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      },
      footerIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})