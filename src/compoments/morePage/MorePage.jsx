import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MorePage = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.moreTitle}>More</Text>
      <View style={styles.moreBox}>
        <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate('Livraison Page')}>
          <AntDesign name="home" size={24} color="black" style={styles.icon} />
          <Text style={styles.shippingAddressText}>Adresse de livraison</Text>
          <AntDesign name="right" size={24} color="black" style={styles.iconRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate('Paiement Page')}>
          <Feather name="credit-card" size={24} color="black" style={styles.icon}  />
          <Text style={styles.shippingAddressText}>Mode de paiement</Text>
          <AntDesign name="right" size={24} color="black" style={styles.iconRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate("Paramètre de notification")}>
          <Feather name="bell" size={24} color="black" style={styles.icon}/>
          <Text style={styles.shippingAddressText}>Paramètres de notification</Text>
          <AntDesign name="right" size={24} color="black" style={styles.iconRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shippingAddress}  onPress={() => navigation.navigate('Avis de confidentialité')} >
          <SimpleLineIcons name="lock" size={24} color="black" style={styles.icon}  />
          <Text style={styles.shippingAddressText}>Avis de confidentialité</Text>
          <AntDesign name="right" size={24} color="black" style={styles.iconRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate('Question Page')}>
          <AntDesign name="questioncircleo" size={24} color="black" style={styles.icon}  />
          <Text style={styles.shippingAddressText}>Questions fréquemment posées</Text>
          <AntDesign name="right" size={24} color="black" style={styles.iconRight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shippingAddress} onPress={() => navigation.navigate("Information Page")}>
          <AntDesign name="infocirlceo" size={24} color="black" style={styles.icon}  />
          <Text style={styles.shippingAddressText}>Legal information</Text>
          <AntDesign name="right" size={24} color="black" style={styles.iconRight} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.deconnecter}>
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
    color: '#FF6A69',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    zIndex: 1000,
  },
  moreBox: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    padding: 15,
  },
  shippingAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  shippingAddressText: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  iconRight: {
    marginLeft: 10,
  },
  deconnecter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deconnecterText: {
    color: "#FF6A69",
    fontSize: 16,
    fontWeight: "bold",
  }
});
