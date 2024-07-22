import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
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
        <Ionicons name="close" size={30} color="#FF6A69" />
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
    height: 110,
    width: "100%",
    backgroundColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 15
  
  },
  headerImage: {
    width: "30%",
    height: 40,
    
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
    backgroundColor: "transparent"
  }
})
