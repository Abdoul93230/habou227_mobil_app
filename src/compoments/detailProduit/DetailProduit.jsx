import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation , useNavigationState} from '@react-navigation/native';



const DetailProduit = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
          <AntDesign name="left" size={24} color="#FF6A69" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Refroidisseur d'ordinateur portable</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.CFAText}>CFA 15000</Text>
            <View style={styles.staro}>
              <AntDesign name="staro" size={15} color="#FFF" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartContainer}>
            <Feather name="shopping-cart" size={24} color="#000000c2" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>0</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailProduit;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#DDD",
    height: 105,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    color: '#000000c2',
    fontSize: 17,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 5,
  },
  staro: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: "#FF6A69",
    borderRadius: 5,
    marginLeft: 10,
  },
  ratingText: {
    color: "#FFF",
    marginLeft: 3,
  },
  CFAText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: "#FF6A69",
    borderRadius: 12,
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
