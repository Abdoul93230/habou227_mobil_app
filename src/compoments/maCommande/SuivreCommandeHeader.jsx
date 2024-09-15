import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SuivieCommandesHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Commande Page')}>
      <Ionicons name="chevron-back-outline" size={24} color="#FFF" />
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
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
    alignItems: 'center', 
    justifyContent: "flex-start", 
    paddingHorizontal: 12,
    flexDirection: 'row',
    height: 93,

  },
  menuButton: {
    backgroundColor: '#B17236',
    padding: 8, 
    borderRadius: 5,
    marginRight: 10, 
    top: 20,
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#B17236', 
    top: 20,
  },
  
});





