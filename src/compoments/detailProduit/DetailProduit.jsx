import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation , useNavigationState} from '@react-navigation/native';


const { width, height } = Dimensions.get('window');
const DetailProduit = ({produit}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={24} color="#B2905F" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerText}>{produit?.name}</Text>
          <View style={styles.ratingContainer}>
            {
              produit?.prixPromo <= 0 ?<Text style={styles.CFAText}>CFA {produit?.prix}</Text>
              :<View>
                <Text style={styles.CFAText2}>CFA {produit?.prix}</Text>
                <Text style={styles.CFAText}>CFA {produit?.prixPromo}</Text>
              </View>
            }


            <View style={styles.staro}>
              <AntDesign name="staro" size={15} color="#FFF" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartContainer}>
            <Feather name="shopping-cart" size={24} color="#B2905F" />
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
    backgroundColor: "rgba(255, 152, 0, 0.2)",
    height: 95,
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
    color: '#B2905F',
    fontSize: width * 0.027,
    textAlign: 'center',
    marginTop:5
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
    backgroundColor: "#30A08B",
    borderRadius: 5,
    marginLeft: 10,
  },
  ratingText: {
    color: "#FFF",
    marginLeft: 3,
  },
  CFAText: {
    color: '#30A08B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  CFAText2: {
    color: '#B2905F',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine:'line-through'
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
    backgroundColor: "#30A08B",
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
