import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Profile from "../../image/logo.png"
import { useNavigation, useNavigationState } from '@react-navigation/native';

const CheckoutHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Image source={Profile} style={styles.headerImage} />
      <TouchableOpacity style={styles.iconClose} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={30} color="#B2905F" />
      </TouchableOpacity>
    </View>
  )
}

export default CheckoutHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    paddingTop:0,
    height: Platform.OS==='ios'? 93:65,
    width: "100%",
    backgroundColor: '#rgba(255, 152, 0, 0.2)',
    paddingHorizontal: 15

  },
  headerImage: {
    width: "30%",
    height: 40,
    top: Platform.OS==='ios'? 15:5

  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconClose: {
    padding: 6,
    backgroundColor: "transparent",
    top: Platform.OS==='ios'? 15:5
  }
})
