import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import Macbook from "../../image/macbook cote.png";
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PanierFooter from './PanierFooter';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const Paniermain = ({chgTotal}) => {
  const navigation = useNavigation();

  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Products = useSelector((state) => state.products.data);

  const [produits, setProduits] = useState(null);
  const [produitIds, setProduitIds] = useState(null);
  const [Vide, setVide] = useState(null);

  const handleAlert = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  const handleAlertwar = (message) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  const calculateTotal = (products) => {
    let total = 0;
    products.forEach((product) => {
      const productData = DATA_Products?.find((item) => item._id === product.id);
      if (productData) {
        const price = productData.prixPromo > 0 ? productData.prixPromo : productData.prix;
        total += price * product.quantity;
      }
    });
    chgTotal(total);
    return total;
  };

  useEffect(() => {
    const getPanier = async () => {
      try {
        const local = await AsyncStorage.getItem("panier");
        if (local && local.length>0) {
          const parsedLocal = JSON.parse(local);
          setProduits(parsedLocal);
          const a = parsedLocal.map((para) => para.id);
          setProduitIds(a);
          calculateTotal(parsedLocal);
        } else {
          setProduits(null);
          setVide("Aucune produit sélectionné, veuillez vous rendre dans la section Orders pour vos commandes !");
        }
      } catch (error) {
        console.error("Error fetching panier from AsyncStorage", error);
      }
    };

    getPanier();
  }, []);

  const incrementQuantity = (index) => {
    const updatedProducts = [...produits];
    updatedProducts[index].quantity += 1;
    setProduits(updatedProducts);
    AsyncStorage.setItem('panier', JSON.stringify(updatedProducts));
    calculateTotal(updatedProducts);
  };

  const decrementQuantity = (index) => {
    const updatedProducts = [...produits];

    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setProduits(updatedProducts);
      AsyncStorage.setItem('panier', JSON.stringify(updatedProducts));
      calculateTotal(updatedProducts);
    } else {
      updatedProducts.splice(index, 1); // Supprimer le produit du panier
      handleAlertwar('Produit supprimé !');
      setProduits(updatedProducts);

      // Vérifier si le panier est vide après la suppression
      if (updatedProducts.length === 0) {
        AsyncStorage.removeItem('panier'); // Supprimer l'objet du localStorage
      } else {
        AsyncStorage.setItem('panier', JSON.stringify(updatedProducts));
      }
      calculateTotal(updatedProducts);
    }
  };


  const removeProduct = (index) => {
    const updatedProducts = [...produits];
    updatedProducts.splice(index, 1); // Supprimer le produit du panier
    handleAlertwar('Produit supprimé !');
    setProduits(updatedProducts);

    // Vérifier si le panier est vide après la suppression
    if (updatedProducts.length === 0) {
      AsyncStorage.removeItem('panier'); // Supprimer l'objet du localStorage
    } else {
      AsyncStorage.setItem('panier', JSON.stringify(updatedProducts));
    }
    calculateTotal(updatedProducts);
  };


  return (
    <View style={styles.container}>
      {produits?.map((card, index) => {
        if (card.quantity === 0) {
          return null; // Ne pas afficher le produit si la quantité est 0
        }

        const product = DATA_Products?.find((item) => item._id === card.id);

        if (!product) {
          return null; // Ne pas afficher le produit si les données sont manquantes
        }

        const price = product.prixPromo > 0 ? product.prixPromo : product.prix;
        const totalPrice = price * card.quantity;

        return (
          <View key={index} style={styles.panierCart}>
            <View style={styles.panierImg}>
              <Image source={{uri: product.image1}} style={styles.image} />
            </View>
            <View style={styles.panierText}>
              <Text style={styles.panierText1}>
                {product.name.slice(0, 20)}...
              </Text>

              {product.prixPromo > 0 ? (
                <>
                  <Text style={styles.panierText33}>cfa {product.prix}</Text>
                  <Text style={styles.panierText3}>cfa {product.prixPromo}</Text>
                </>
              ) : (
                <Text style={styles.panierText3}>cfa {product.prix}</Text>
              )}

              <View style={styles.countNumber}>
                <TouchableOpacity onPress={() => incrementQuantity(index)}>
                  <EvilIcons name="plus" size={24} color="black" style={Platform.OS === 'ios' ? styles.iOS : styles.android} />
                </TouchableOpacity>
                <Text style={styles.countNumberText}>{card.quantity}</Text>
                <TouchableOpacity onPress={() => decrementQuantity(index)}>
                  <EvilIcons name="minus" size={24} color="black" style={Platform.OS === 'ios' ? styles.iOS : styles.android} />
                </TouchableOpacity>
              </View>
              <View style={styles.result}>
                <Text style={styles.prix}>TT {totalPrice}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.IconCircle} onPress={() => removeProduct(index)}>
              <Ionicons name="trash" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        );
      })}

<View style={styles.container2}>
      {(produits?.length<=0 || Vide) && (
        <>
          <Text style={styles.emptyText}>Aucune produit sélectionné, veuillez vous rendre dans la section Orders pour vos commandes !</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Commande Page')}
          >
            <EvilIcons name="cart" size={24} color="#fff" />
            <Text style={styles.buttonText}>Orders</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
    </View>
  );
};

export default Paniermain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 190
  },
  panierCart: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  panierImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  panierText: {
    flex: 1,
    marginLeft: 20,
  },
  panierText1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  panierText3: {
    fontSize: 16,
    color: '#FF6A69',
  },
  panierText33: {
    fontSize: 13,
    color: '#FF6A69',
    textDecorationLine: "line-through"
  },
  countNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 85,
    height: Platform.OS === 'ios' ?  40 : 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  countNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"
  },
  android: {
    bottom: 2,
    // position: "absolute"
  },
  result: {
    marginTop: 10,
  },
  prix: {
    color: '#FF6A69',
    fontSize: 16,
    fontWeight: 'bold',
  },
  IconCircle: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6A69",
    borderRadius: 15,
    marginRight: 12
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  emptyText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6A69',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
