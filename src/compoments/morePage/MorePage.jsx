import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const colors = ['#B17236', '#B2905F', '#30A08B'];
const MorePage = () => {
  const navigation = useNavigation()

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login')
    } catch (error) {
      console.error('Erreur lors de la suppression des données :', error);
    }
  };
  return (
    <View style={styles.container}>
    <Text style={[styles.moreTitle, {color: colors[0]}]}>More</Text>
    <View style={styles.moreBox}>
      <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate('Livraison Page')}>
        <View style={[styles.iconContainer, { backgroundColor: colors[0] }]}>
          <AntDesign name="home" size={24} color="#FFF" />
        </View>
        <Text style={styles.shippingAddressText}>Adresse de livraison</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate('Paiement Page')}>
        <View style={[styles.iconContainer, { backgroundColor: colors[0] }]}>
          <Feather name="credit-card" size={24} color="#FFF" />
        </View>
        <Text style={styles.shippingAddressText}>Mode de paiement</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate("Paramètre de notification")}>
        <View style={[styles.iconContainer, { backgroundColor: colors[0] }]}>
          <Feather name="bell" size={24} color="#FFF" />
        </View>
        <Text style={styles.shippingAddressText}>Paramètres de notification</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate('Avis de confidentialité')}>
        <View style={[styles.iconContainer, { backgroundColor: colors[0] }]}>
          <SimpleLineIcons name="lock" size={24} color="#FFF" />
        </View>
        <Text style={styles.shippingAddressText}>Avis de confidentialité</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate('Question Page')}>
        <View style={[styles.iconContainer, { backgroundColor: colors[0] }]}>
          <AntDesign name="questioncircleo" size={24} color="#FFF" />
        </View>
        <Text style={styles.shippingAddressText}>Questions fréquemment posées</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate("Information Page")}>
        <View style={[styles.iconContainer, { backgroundColor: colors[0] }]}>
          <AntDesign name="infocirlceo" size={24} color="#FFF" />
        </View>
        <Text style={styles.shippingAddressText}>Legal information</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.deconnecter} onPress={clearStorage}>
      <Text style={styles.deconnecterText}>Se déconnecter</Text>
    </TouchableOpacity>
  </View>
  );
};

export default MorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  moreTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    zIndex: 1000,
  },
  moreBox: {
    marginTop: 0,
    width: '100%',
    padding: 5,
  },
  shippingAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: "#B2905F",  
    marginVertical: 10,
    borderRadius: 15, 
    paddingHorizontal: 20,
    elevation: 8,  
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3,  
    shadowRadius: 8,
  },
  arrowContainer: {
    backgroundColor: '#30A08B',  // Couleur de fond des flèches
    borderRadius: 50,
    padding: 5,
  },
  iconContainer: {
    backgroundColor: '#B2905F', // Default background color for icons
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shippingAddressText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#FFF',
  },
 
  deconnecter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
    backgroundColor: colors[2],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deconnecterText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});
