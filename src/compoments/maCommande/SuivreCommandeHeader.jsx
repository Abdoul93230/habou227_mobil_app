import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SuivieCommandesHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Commande Page')}>
      <Ionicons name="chevron-back-outline" size={24} color="#FF3232" />
    </TouchableOpacity>
    <Text style={styles.title}>Suivie commandes #001</Text>
  </View>
  );
};

export default SuivieCommandesHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    alignItems: 'center', 
    justifyContent: "flex-start", 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 12,
    flexDirection: 'row',
    height: 90,

  },
  menuButton: {
    backgroundColor: '#F7D946',
    padding: 8, 
    borderRadius: 5,
    marginRight: 10, 
    top: 20,
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    top: 20,
  },
  
});





