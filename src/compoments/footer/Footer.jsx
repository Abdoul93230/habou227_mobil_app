import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Footer = () => {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(state => state.routes[state.index].name);

  const getColor = (routeName) => {
    return currentRouteName === routeName ? "#30A08B" : "#B17236";
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={24} color={getColor('Home')} />
        <Text style={{ color: getColor('Home') }}>Acceuil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Search')}>
        <Feather name="search" size={24} color={getColor('Search')} />
        <Text style={{ color: getColor('Search') }}>Recherche</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Cart')}>
        <Feather name="shopping-cart" size={24} color={getColor('Cart')} />
        <Text style={{ color: getColor('Cart') }}>Panier</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('Profile')}>
        <Feather name="user" size={24} color={getColor('Profile')} />
        <Text style={{ color: getColor('Profile') }}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('More')}>
        <Feather name="menu" size={24} color={getColor('More')} />
        <Text style={{ color: getColor('More') }}>Plus</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 78,
    backgroundColor: '#F5F6F8',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
