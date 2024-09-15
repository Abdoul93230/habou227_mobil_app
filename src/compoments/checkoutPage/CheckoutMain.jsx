import React, { useEffect, useState,forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, Modal, TextInput, TouchableWithoutFeedback, Platform,ActivityIndicator } from 'react-native';
import { Feather, EvilIcons, Ionicons } from '@expo/vector-icons';
import Items from "../../image/macbook cote.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation , useNavigationState} from '@react-navigation/native';
import { API_URL } from "@env";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const CheckoutMain =  forwardRef(({chgTotal,chgReduction},ref)=>{
  const [user, setUser] = useState(null);
  const [codeValide, setCodeValide] = useState(null);
  const [produits, setProduits] = useState(null);
  const [produitIds, setProduitIds] = useState(null);
  const [Vide, setVide] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [Quartier, setQuartier] = useState("");
  const [plus, setPlus] = useState("");
  const [choix, setChoix] = useState("");
  const [numeroCard, setNumeroCard] = useState("");
  const [cvc, setCvc] = useState("");
  const [numero, setNumero] = useState("");
  const [operateur, setOperateur] = useState("");
  const DATA_Products = useSelector((state) => state.products.data);
  let total = 0;
  const navigation = useNavigation();
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

  const handleButtonPress = () => {
    Alert.alert("Voir les données", "Étudiant\n+227 85822480\nCodeloccol\ndelomodibo@gmail.com\n+227 85822480");
  };

  const handleApplyPromoCode = () => {
    // Logic to apply the promo code
    setLoading(true)

    if (promoCode.length === 0) {
      setLoading(false)
      handleAlertwar("code invalide.");
      setModalVisible(!modalVisible);
      return;
    }
    // setRond(true)
    // const encodedHashedCode = encodeURIComponent(codePro);
    axios
      .get(`${API_URL}/getCodePromoByHashedCode`, {
        params: {
          hashedCode: promoCode,
        },
      })
      .then((code) => {
        // console.log(code);
        setLoading(false)
        if (code.data.data.isValide) {
          setCodeValide(code.data.data);
          chgReduction(code.data.data.prixReduiction)
          setModalVisible(!modalVisible);
          handleAlert('Code Appliquer')
        } else {
          handleAlertwar("Ce code la est expirer.");
          setModalVisible(!modalVisible);
        }
      })
      .catch((error) => {
        setLoading(false)
        handleAlertwar("Ce code de promo n'exite pas");
        setModalVisible(!modalVisible);
      });
  };



  useEffect(() => {
    // setLoading(true);

    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userEcomme');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(userData)
        if(userData){
          setUser(userData);
          axios
              .get(`${API_URL}/getAddressByUserKey/${userData.id}`)
              .then((shippingAd) => {
                setEmail(shippingAd.data.address.email);
                setNom(shippingAd.data.address.name);
                setPhone(shippingAd.data.address.numero);
                setQuartier(shippingAd.data.address.quartier);
                setRegion(shippingAd.data.address.region);
                setPlus(shippingAd.data.address.description);
                setLoading(false)
              })
              .catch((error) => {
                setLoading(false)
                console.log(error.response);
              });

            axios
              .get(`${API_URL}/getMoyentPaymentByClefUser/${userData.id}`)
              .then((res) => {
                if (res.data.paymentMethod.type) {
                  setChoix(res.data.paymentMethod.type);
                }
                if (res.data.paymentMethod.numeroCard) {
                  setNumeroCard(res.data.paymentMethod.numeroCard);
                }
                if (res.data.paymentMethod.cvc) {
                  setCvc(res.data.paymentMethod.cvc);
                }
                if (res.data.paymentMethod.phone) {
                  setNumero(res.data.paymentMethod.phone);
                }
                if (res.data.paymentMethod.operateur) {
                  setOperateur(res.data.paymentMethod.operateur);
                }
              })
              .catch((error) => {console.log(error.response);});
        }

      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

// //////////////////////////////////////////////////////////////////////////////////////////
function generateUniqueID() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Ajoute un zéro au début si le mois est < 10
  const day = String(now.getDate()).padStart(2, "0"); // Ajoute un zéro au début si le jour est < 10
  const hours = String(now.getHours()).padStart(2, "0"); // Ajoute un zéro au début si l'heure est < 10
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Ajoute un zéro au début si la minute est < 10
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Ajoute un zéro au début si la seconde est < 10

  // Concatène les différentes parties pour former l'identifiant unique
  const uniqueID = `${year}${month}${day}${hours}${minutes}${seconds}`;

  return uniqueID;
}
// //////////////////////////////////////////////////////////////////////////////////////////

const Plasser = async() => {

  const local = await AsyncStorage.getItem("panier");

  setLoading(true);
  if (local=== null || JSON.parse(local)?.length === 0) {
    handleAlertwar("Aucun produit n'est selectionner.");
    setLoading(false);
    // navigue('/home')
    navigation.navigate('Home')
    return;
  }
  if (phone?.length <= 0) {
    setLoading(false);
    // navigue("/More/shipping_address?fromCart=true");
    navigation.navigate("Livraison Page",{ fromCart: true })
    return;
  }
  if (choix?.length <= 0) {
    setLoading(false);
    // navigue("/More/payment_method?fromCart=true");
    navigation.navigate("Paiement Page",{ fromCart: true })

    return;
  }

  if (local) {
    const pane = JSON.parse(local);
    let prod = [];
    for (let i = 0; i < produits.length; i++) {
      let ob = {
        produit: produits[i]?.id,
        quantite: produits[i]?.quantity,
        tailles: produits[i]?.sizes,
        couleurs: produits[i]?.colors,
      };
      prod.push(ob);
    }
    let data = {
      clefUser: user.id,
      nbrProduits: prod,
      prix: total,
    };
    if (codeValide) {
      if (codeValide.isValide) {
        data.codePro = true;
        data.idCodePro = codeValide?._id;
      }
    }

    // console.log(data);
    if (choix.length > 0) {
      const uniqueID = generateUniqueID();
      const dataToSend = {
        name: user?.name,
        currency: "XOF",
        country: "NE",
        total: total ? total : "",
        transaction_id: uniqueID,
        choix: choix,
        numeroCard: numeroCard,
        phone: numero,
      };
      data.reference = uniqueID;

      if (
        choix === "Visa" ||
        choix === "Master Card" ||
        choix === "Mobile Money"
      ) {
        axios
          .post(`${API_URL}/payments`, dataToSend)
          .then((response) => {
            const ref = response.data.data.reference;
            handleAlert("success");
            axios
              .get(`${API_URL}/payments/`)
              .then((res) => {
                // setAllPayment(res.data.data);

                if (
                  res.data.data.find((item) => item.reference === ref)
                    .status != "Failed"
                  // ||
                  // res.data.data.find((item) => item.reference === ref)
                  //   .status != "Initiated"
                ) {
                  axios
                    .post(`${API_URL}/createCommande`, data)
                    .then(async(resp) => {
                      handleAlert(resp.data.message);
                      setLoading(false);
                      // localStorage.removeItem("panier");
                      await AsyncStorage.removeItem('panier');
                      if (codeValide) {
                        if (codeValide.isValide) {
                          axios
                            .put(`${API_URL}/updateCodePromo`, {
                              codePromoId: codeValide._id,
                              isValide: false,
                            })
                            .then(() => {
                              // console.log("fait")
                            })
                            .catch((error) => console.log(error));
                        }
                      }
                      // navigation.navigate("Cart")
                      navigation.navigate("Succes")
                    })
                    .catch((error) => {
                      setLoading(false);
                      console.log("errrr", error);
                    });
                  console.log("Réponse de l'API:", response);
                } else {
                  setLoading(false);
                  handleAlertwar(
                    "le payment na pas pu etre effectuer veuiller ressayer !"
                  );
                  return;
                }
              })
              .catch((error) => {
                setLoading(false);
                console.log(error);
              });
          })
          .catch((error) => {
            setLoading(false);
            console.log(
              "Erreur lors de la requête:",
              error.response ? error.response.data : error.message,
              error
            );
          });
      } else if (choix === "Payment a domicile") {
        axios
          .post(`${API_URL}/createCommande`, data)
          .then(async(res) => {
            handleAlert(res.data.message);
            setLoading(false);
            await AsyncStorage.removeItem('panier');
            if (codeValide) {
              if (codeValide.isValide) {
                axios
                  .put(`${API_URL}/updateCodePromo`, {
                    codePromoId: codeValide._id,
                    isValide: false,
                  })
                  .then(() => {
                    setLoading(false);
                    // console.log("fait")
                  })
                  .catch((error) => {
                    setLoading(false);
                    console.log(error);
                  });
              }
            }
            // navigation.navigate("Cart")
            navigation.navigate("Succes")
          })
          .catch((error) => {
            setLoading(false);
            console.log("errrr", error);
          });
      }
    } else {
      setLoading(false);
      handleAlertwar("les infos du payment ne sont pas encore mis");
      return;
    }
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////


useImperativeHandle(ref, () => ({
  Plasser
}));

if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FF6A69" />
      <Text style={styles.loadingText}>Chargement...</Text>
    </View>
  );
}



  return (
    <View style={styles.CheckoutMain}>
      <Text style={styles.title}>Vérification</Text>
      <Text style={styles.paraMain}>Adresse de livraison</Text>
      <View style={styles.card}>
        <View style={styles.donner}>
          <Text style={styles.para}>Name : {nom} </Text>
        </View>
        <View style={styles.donner}>
          <Text style={styles.para}>Region : {region} </Text>
        </View>
        <View style={styles.donner}>
          <Text style={styles.para}>Quartier : {Quartier} </Text>
        </View>
        <View style={styles.donner}>
          <Text style={styles.para}>Email : {email} </Text>
        </View>
        <View style={styles.donner}>
          <Text style={styles.para}>Tel : {phone} </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Livraison Page",{ fromCart: true })}>
        <Text style={styles.buttonText}>Voir les données</Text>
      </TouchableOpacity>

      <View style={styles.paymentContainer}>
      <Text style={styles.paymentText}>Mode de paiement</Text>
      <TouchableOpacity onPress={()=> navigation.navigate("Paiement Page",{ fromCart: true })} >
        <View style={styles.cardMoney}>
          <Feather name="credit-card" size={24} color="#FF6A69" />
          <Text style={styles.paraMoney}>
            {choix}
            {choix === "Mobile Money" ? ` ${numero}` : ""}
            {choix === "master Card" || choix === "Visa"
              ? ` ending **${String(numeroCard).slice(-2)}`
              : ""}
            {choix.length <= 0
              ? " veuillez configurer votre moyen de paiement"
              : ""}
          </Text>
          <View style={Platform.OS === 'ios' ? styles.IconCircle : styles.IconCircle2}>
            <EvilIcons name="arrow-right" size={30} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
{/* {console.log(produits.length)} */}
      {produits?.map((item, index) => {
        if (item.quantity === 0) {
          return null; // Ne pas afficher le produit si la quantité est 0
        }
        const product = DATA_Products?.find((iteme) => iteme._id === item.id);

        if (!product) {
          return null; // Ne pas afficher le produit si les données sont manquantes
        }

        const price = product.prixPromo > 0 ? product.prixPromo : product.prix;
        total += price * item.quantity;

        return (
          <View key={index} style={styles.cardItem}>
          <View style={styles.cardItemContainer}>
            <View style={styles.circleItem}>
              <Image source={{uri: product.image1}} style={styles.image} />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.nike}>{product.name.slice(0, 20)}...</Text>
              {/* <Text style={styles.CFAPrix}>CFA 11000</Text> */}
              {product.prixPromo > 0 ? (
                <>
                  {/* <Text style={styles.panierText33}>cfa {product.prix}</Text> */}
                  <Text style={styles.CFAPrix}>CFA {product.prixPromo}</Text>
                </>
              ) : (
                <Text style={styles.CFAPrix}>CFA {product.prix}</Text>
              )}
            </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => incrementQuantity(index)} style={styles.IconCircle}>
                  <EvilIcons name="plus" size={30} color="#FFF" style={Platform.OS === 'ios' ? styles.iOS : styles.android} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.IconCircle} onPress={() => decrementQuantity(index)}>
                  <EvilIcons name="minus" size={30} color="#fff" style={Platform.OS === 'ios' ? styles.iOS : styles.android}/>
                </TouchableOpacity>
              </View>


          </View>
        </View>
        )
      }
      )}

      <TouchableOpacity style={styles.proMo} onPress={() => setModalVisible(true)}>
        <View style={styles.cardMoney}>
          <Feather name="credit-card" size={24} color="#FF6A69" />
          <Text style={styles.paraMoney}>Ajouter un code promotionnel</Text>
          <View style={styles.IconCircle}>
            <EvilIcons name="arrow-right" size={30} color="#FFF" style={Platform.OS === 'ios' ? styles.iOS : styles.android}/>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
       <TouchableWithoutFeedback onPress={handleApplyPromoCode}>
            <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter un code promotionnel</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrer le code"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleApplyPromoCode}>
              <Text style={styles.modalButtonText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>

      </Modal>
    </View>
  );
})

export default CheckoutMain;

const styles = StyleSheet.create({
  CheckoutMain: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 7,
    justifyContent: 'flex-start',
  },
  title: {
    marginHorizontal: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: "#515C70",
  },
  paraMain: {
    marginHorizontal: 1,
    fontSize: 16,
    textTransform: "uppercase",
    color: "#515C70",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  donner: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  para: {
    color: "#000",
  },
  button: {
    backgroundColor: '#FF6A69',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentContainer: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  paymentText: {
    fontSize: 16,
    color: "#515C70",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardMoney: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: Platform.OS == 'ios' ? 1 : 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: Platform.OS === 'ios' ?  2 : 1,
  },
  paraMoney: {
    fontSize: 16,
    color: "#515C70",
    flex: 1,
    marginHorizontal: 10,
  },
  IconCircle: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6A69",
    borderRadius: 15,
  },
  IconCircle2: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6A69",
    borderRadius: 15,
    position: 'relative',
  },
  android: {
    bottom: 6,
    position: "absolute"
  },
  cardItem: {
    backgroundColor: '#FFFF',
    padding: 15,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 2,
  },
  cardItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  circleItem: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6A69',
    borderRadius: 50,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  itemInfo: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 20
  },
  nike: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#515C70"
  },
  CFAPrix: {
    fontSize: 16,
    color: '#FF6A69',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: "#515C70"
  },
  proMo: {
    marginTop: 20
  },
  trash: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    width: 150,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#515C70"
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#515C70"
  },
  modalButton: {
    backgroundColor: '#FF6A69',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Fond de la page de chargement
  },
});
