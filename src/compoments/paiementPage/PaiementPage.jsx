import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, TouchableOpacity, ImageBackground,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MasterCard from "./paiementPhoto/masterCard.jpeg";
import VisaCard from "./paiementPhoto/VisaCard.png";
import DomicileCard from "./paiementPhoto/domicile.jpeg";
import MobileMoney from "./paiementPhoto/MobileMoney.png";
import AierteLogo from './paiementPhoto/Aiertel.jpg'
import MoovLogo from './paiementPhoto/Moov.png'
import ZamaniLogo from './paiementPhoto/Zamani.jpeg'
import MTNLogo from './paiementPhoto/MTN.png'
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Box, Select, CheckIcon, Center } from 'native-base';
import axios from 'axios';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const BackendUrl = `${API_URL}`;

function MyCheckbox({ checked, onPress }) {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onPress}
    >
      {checked && <Ionicons name="checkmark-sharp" size={24} color="white" />}
    </Pressable>
  );
}

const PaiementPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(''); // Initial state set to 'MasterCard'
  const [numero, setNumero] = useState("");
  const [numeroCard, setNumeroCard] = useState("");
  const [expiredCard, setExpiredCard] = useState("");
  const [operateur, setOperateur] = useState("");
  const [cvc, setCvc] = useState("");
  const [choix, setChoix] = useState("");


  const regexPhone = /^[0-9]{8,}$/;
  const handlePress = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };


  const handleAlert = (message) => {
    Toast.show({
      type: 'success',
      text1: 'success',
      text2: message,
      position: 'top',
      visibilityTime: 5000,
      autoHide: true,
      bottomOffset: 40,

    });
  };

  const handleAlertwar = (message) => {
    Toast.show({
      type: 'error',
      text1: 'error',
      text2: message,
      position: 'top',
      visibilityTime: 5000,
      autoHide: true,
      bottomOffset: 40,

    });
    setLoading(false)
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userEcomme');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(userData);
        if (userData) {

          axios
      .get(`${BackendUrl}/getMoyentPaymentByClefUser/${userData?.id}`)
      .then((res) => {
        // console.log(res.data.paymentMethod)
        setOperateur('227');
        setLoading(false)
        if (res.data.paymentMethod.type) {
          setSelectedPayment(res.data.paymentMethod.type);
        }
        if (res.data.paymentMethod.numeroCard) {
          setNumeroCard(res.data.paymentMethod.numeroCard);
          // console.log(res.data.paymentMethod.numeroCard)
        }
        if (res.data.paymentMethod.cvc) {
          setCvc(res.data.paymentMethod.cvc);
        }
        if (res.data.paymentMethod.phone) {
          setNumero(res.data.paymentMethod.phone);
        }
        if (res.data.paymentMethod.operateur) {
          if(res.data.paymentMethod.operateur==='Airtel')
            setOperateur('227');
          if(res.data.paymentMethod.operateur==='Orange')
            setOperateur('227');
          if(res.data.paymentMethod.operateur==='Moov')
            setOperateur('227');
          if(res.data.paymentMethod.operateur==='227')
            setOperateur('227');
          if(res.data.paymentMethod.operateur==='229')
            setOperateur('229');

        }
        if (res.data.paymentMethod.expire) {
          setExpiredCard(res.data.paymentMethod.expire);
        }
      })
      .catch((error) => {setLoading(false)});

        }
      } catch (e) {
        setLoading(false)
        console.error('Failed to load user data:', e);
      }
    };

    fetchUserData();
  }, []);


  const optionS = operateur === "229"
  ? [
    { value: "229", label: "229" },
    { value: "227", label: "227" }
  ]:

  [
      { value: "227", label: "227" },
      { value: "229", label: "229" }
    ]
  ;




    const envoyer = () => {

      const data = { clefUser: user.id };

      if (!selectedPayment) {
        handleAlertwar("veuiller choisir un moyen de payment.");
        return;
      }
      if (selectedPayment === "Visa") {
        const option = "Visa";
        data.option = option;

        if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(numeroCard)) {
          handleAlertwar("le numero de la carte n'est pas valide1");
          return;
        }
        if (!/^[0-9]{3}$/.test(cvc)) {
          handleAlertwar("le code de la carte n'est pas valide");
          return;
        }
        if (expiredCard.length <= 0) {
          handleAlertwar("veuiller selectionner la date d'expiration");
          return;
        }
        data.numeroCard = numeroCard;
        data.cvc = cvc;
        data.expire = expiredCard;
      } else if (selectedPayment === "master Card") {
        const option = "master Card";
        data.option = option;
        if (!/^(?:5[1-5][0-9]{14})$/.test(numeroCard)) {
          handleAlertwar("le numero de la carte n'est pas valide2");
          return;
        }
        if (!/^[0-9]{3}$/.test(cvc)) {
          handleAlertwar("le code de la carte n'est pas valide");
          return;
        }
        if (expiredCard.length <= 0) {
          handleAlertwar("veuiller selectionner la date d'expiration");
          return;
        }
        data.numeroCard = numeroCard;
        data.cvc = cvc;
        data.expire = expiredCard;
      } else if (selectedPayment === "Mobile Money") {
        const option = "Mobile Money";
        data.option = option;
        if (!regexPhone.test(numero.toString())) {
          return handleAlertwar("forma du numero non valid!");
        } else if (numero.length < 8 && operateur==="227") {

          handleAlertwar(
            "Le numéro de l'utilisateur doit contenir au moins 8 chiffres Niger"
          );
          return;
        }else if (numero.length < 8 && operateur==="229") {
          // console.log(2)
          handleAlertwar(
            "Le numéro de l'utilisateur doit contenir au moins 8 chiffres Benin"
          );
          return;
        }
         else if (numero.length === 8) {

          // Ajouter le préfixe "227" au début du numéro
          const userNumber = operateur==="229"? "229" + numero :"227" + numero;
          setNumero(userNumber);
          data.numero = userNumber;
        } else if (numero.length === 11) {
          data.numero = operateur + numero.substring(3, numero.length);
          // Vérifier si le préfixe est "227"
          if (numero.substring(0, 3) !== "227" && numero.substring(0, 3) !== "229") {
            handleAlertwar(
              "Le préfixe du numéro de l'utilisateur doit être '227 ou 229'"
            );
            return;
          }
        } else if (numero.length > 11) {

          handleAlertwar(
            "Le numéro doit contenir 8, ou 11 chiffres avec l'identifiant"
          );
          return;
        } else if (numero.length > 8 && numero.length < 11) {

          handleAlertwar(
            "Le numéro doit contenir 8, ou 11 chiffres avec l'identifiant"
          );
          return;
        }else{

          data.numero = numero;
        }

        data.operateur = operateur==="227"? '227' : '229';
      } else if (selectedPayment === "Payment a domicile") {
        const option = "Payment a domicile";
        data.option = option;
      } else {
      }
      setLoading(true)
      axios
        .post(`${BackendUrl}/createMoyentPayment`, data)
        .then((res) => {
          handleAlert(res.data.message);
          setLoading(false)
          // const fromCartParam = new URLSearchParams(location.search).get(
          //   "fromCart"
          // );
          // if (fromCartParam === "true") {
          //   navigue(`/Cart?fromCart=true`);
          //   return;
          // } else {
          // }
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)});

      // console.log(data);
    };






    const renderSelectedPaymentPage = () => {
      // const [service, setService] = useState("");
      const dernierChiffres = numeroCard.toString().length >= 3 ? numeroCard.toString().slice(-3) : ''; // Extraire les 3 derniers chiffres
    switch (selectedPayment) {
      case 'master Card':
  return (
    <View style={styles.pageContent}>
      <View style={styles.paymentDetail}>
        <Text style={styles.masterText}>Détails de paiement</Text>
        <Text style={styles.masterText}>Master Carte</Text>
      </View>
      <Text style={styles.numeroText}>Numéro de carte</Text>
      <TextInput
        value={numeroCard}
        onChangeText={(text) => {
          setNumeroCard(text);
        }}
        placeholder={(dernierChiffres && selectedPayment==="master Card") ? `*** *** *** ${dernierChiffres}` : "Entrez votre numéro de carte"}
        style={styles.input}
        keyboardType="numeric"
      />
      <View style={styles.expirationDate}>
        <View style={styles.boxInput}>
          <Text style={styles.dateText}>Date d'expiration :</Text>
          <TextInput
              onChangeText={(text) => {
                setExpiredCard(text);
              }}
           textContentType='date' style={styles.input} placeholder='EX : 12/09/27' />
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.dateText}>CV Code</Text>
          <TextInput
            placeholder="CVC"
            onChangeText={(text) => {
              setCvc(text);
            }}
            style={styles.input}
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.expirationDate}>
        <TouchableOpacity style={styles.btnSoumettre} onPress={envoyer}>
          <Text style={styles.soumettreText}>Soumettre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
      case 'Visa':
        return (
          <View style={styles.pageContent}>
          <View style={styles.paymentDetail}>
            <Text style={styles.masterText}>Détails de paiement</Text>
            <Text style={styles.masterText}>Visa</Text>
          </View>
          <Text style={styles.numeroText}>Numéro de carte</Text>
          <TextInput
           placeholder={(dernierChiffres && selectedPayment==='Visa') ? `*** *** *** ${dernierChiffres}` : "Entrez votre numéro de carte"}
          style={styles.input}
          onChangeText={(text) => {
            setNumeroCard(text);
          }}
          />
          <View style={styles.expirationDate}>
            <View style={styles.boxInput}>
              <Text style={styles.dateText}>Date d'expiration :</Text>
              <TextInput
              onChangeText={(text) => {
                setExpiredCard(text);
              }}
           textContentType='date' style={styles.input} placeholder='EX : 12/09/27' />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.dateText}>CV Code</Text>
              <TextInput
              onChangeText={(text) => {
                setCvc(text);
              }}
              placeholder='CVC' style={styles.input} />
            </View>
          </View>
          <View style={styles.expirationDate}>
            <TouchableOpacity style={styles.btnSoumettre} onPress={envoyer}>
              <Text style={styles.soumettreText}>Soumettre</Text>
            </TouchableOpacity>
          </View>
        </View>
        );
      case 'Payment a domicile':
        return (
          <View style={styles.pageContent}>

          <View style={styles.domicileBox}>
          <ImageBackground
            source={require('./paiementPhoto/background.jpg')}
            // source={{uri:'https://static.vecteezy.com/system/resources/thumbnails/000/616/494/small/home-06.jpg'}}

            style={styles.imageBackground}
            >
            <Text style={styles.DomicileText}>Paiement à domicile</Text>
          </ImageBackground>
          </View>

            <TouchableOpacity style={styles.btnSoumettreDome}>
              <Text style={styles.soumettreText} onPress={envoyer}>Soumettre</Text>
            </TouchableOpacity>

          </View>
        );
      case 'Mobile Money':
        return (
          <View style={styles.pageContent}>
            <View style={styles.MobileMoney}>
             <View style={styles.reseauText}>
             <Text style={styles.numeroText}>Mobile Money</Text>
             </View>
              <View style={styles.logo}>
                <Image source={AierteLogo} style={styles.logoImage} />
                <Image source={MoovLogo} style={styles.logoImage} />
                <Image source={ZamaniLogo} style={styles.logoImage} />
                <Image source={MTNLogo} style={styles.logoImage} />
              </View>
            </View>
            <View style={styles.compteText}>
              <Text style={styles.numeroText}>Compte mobile Money</Text>
              <View style={styles.PhoneInput}>
              
                    <Select
                    style={{borderColor: "#B2905F", borderWidth: 0, overflow: "hidden"}}
                      selectedValue={operateur==='227' || operateur==='229'?operateur:'227'}
                      minWidth="100"
                      minHeight="20"
                      borderColor={"#B2905F"}
                      accessibilityLabel="Choisir une région"

                      mt={0}
                      onValueChange={itemValue => setOperateur(itemValue)}>


                      {optionS.map(option => (
                         <Select.Item key={option.value} label={option.label} value={option.value} />

        ))}


                    </Select>
              
                <View style={styles.dropdownInput}>
                <TextInput
                value={numero.length>8&&(numero.substring(0, 3)==='227' || numero.substring(0, 3)==='229')?numero.substring(3, numero.length):numero}
                onChangeText={(text) => {
                  setNumero(text);
                }}
                  placeholder='Entrez votre numéro'
                  placeholderTextColor='#a9a9a9'
                  style={{marginHorizontal: 3, height: 40,}}
                />
                </View>

              </View>

              <View style={styles.expirationDate}>
                <TouchableOpacity style={styles.btnSoumettre} onPress={envoyer}>
                  <Text style={styles.soumettreText}>Soumettre</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#30A08B" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }



  return (
    <NativeBaseProvider>
          <View style={styles.container}>
      <Text style={styles.title}>Mode de paiement</Text>
      <View style={styles.livraisoncard}>
        <View style={styles.cardPa}>
          <Pressable
            style={[styles.box, selectedPayment === 'master Card' && styles.selectedBox]}
            onPress={() => handlePress('master Card')}
          >
            <View style={styles.boxText}>
              <MyCheckbox checked={selectedPayment === 'master Card'} onPress={() => handlePress('master Card')} />
            </View>
            <View style={styles.boxImage}>
              <Image source={MasterCard} style={styles.image} />
              <Text style={styles.texBox}>Master Card</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.box, selectedPayment === 'Visa' && styles.selectedBox]}
            onPress={() => handlePress('Visa')}
          >
            <View style={styles.boxText}>
              <MyCheckbox checked={selectedPayment === 'Visa'} onPress={() => handlePress('Visa')} />
            </View>
            <View style={styles.boxImage}>
              <Image source={VisaCard} style={styles.image} />
              <Text style={styles.texBox}>Visa</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.cardPa}>
          <Pressable
            style={[styles.box, selectedPayment === 'Payment a domicile' && styles.selectedBox]}
            onPress={() => handlePress('Payment a domicile')}
          >
            <View style={styles.boxText}>
              <MyCheckbox checked={selectedPayment === 'Payment a domicile'} onPress={() => handlePress('Payment a domicile')} />
            </View>
            <View style={styles.boxImage}>
              <Image source={DomicileCard} style={styles.image} />
              <Text style={styles.texBox}>Paiement à domicile</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.box, selectedPayment === 'Mobile Money' && styles.selectedBox]}
            onPress={() => handlePress('Mobile Money')}
          >
            <View style={styles.boxText}>
              <MyCheckbox checked={selectedPayment === 'Mobile Money'} onPress={() => handlePress('Mobile Money')} />
            </View>
            <View style={styles.boxImage}>
              <Image source={MobileMoney} style={styles.image} />
              <Text style={styles.texBox}>Mobile Money</Text>
            </View>
          </Pressable>
        </View>
      </View>
      {renderSelectedPaymentPage()}
    </View>
    </NativeBaseProvider>

  );
};

export default PaiementPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    zIndex: 1000,
    color: "#B17236"
  },
  livraisoncard: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardPa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  box: {
    width: width * 0.44,
    height: 120,
    backgroundColor: '#30A08B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },

  selectedBox: {
    borderColor: '#B2905F',
    borderWidth: 2,
  },
  image: {
    width: '90%',
    height: '60%',
    resizeMode: "contain",
  },
  boxText: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: "center",
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#B17236',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    // backgroundColor: '#B2905F',
  },
  boxImage: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  texBox: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 3,
    color: "#FFF"
  },

  // master card
  paymentDetail: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#30A08B',
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  masterText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFF",
  },
  numeroText: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 12,
    zIndex: 1000,
    color: "#B17236"
  },

  input: {
    height: 40,
    borderColor: '#B2905F',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  expirationDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  boxInput: {
    width: width * 0.44,
    height: 80,
    // backgroundColor: 'red',
    padding: 0,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#B2905F",
    marginVertical: 4
  },
  btnSoumettre: {
    padding: 15,
    backgroundColor: '#30A08B',
    width: "100%",
    borderRadius: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  soumettreText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  ////
  ////domicile
  domicileBox: {
    width: "100%",
    height: 192,
    margin: "auto",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  DomicileText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  btnSoumettreDome: {
    padding: 15,
    backgroundColor: '#30A08B',
    width: "100%",
    borderRadius: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ////domicile


  ///////Mobile Money

  MobileMoney: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  reseauText: {
    width: "30%",
  },
  logo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  logoImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    resizeMode: "cover",
  },
  compteText: {
    marginTop: 20
  },
  PhoneInput: {
    height: 45,
    width: "100%",
    borderColor: '#B2905F',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "scroll"

  },
  dropdownInput: {
    width: '100%',
    height: "auto",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Fond de la page de chargement
  },
  ///////Mobile Money
});
