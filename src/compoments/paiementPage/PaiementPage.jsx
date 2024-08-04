import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import MasterCard from "./paiementPhoto/masterCard.jpeg";
import VisaCard from "./paiementPhoto/VisaCard.png";
import DomicileCard from "./paiementPhoto/domicile.jpeg";
import MobileMoney from "./paiementPhoto/MobileMoney.png";
import AierteLogo from './paiementPhoto/Aiertel.jpg'
import MoovLogo from './paiementPhoto/Moov.png'
import ZamaniLogo from './paiementPhoto/Zamani.jpeg'
import MTNLogo from './paiementPhoto/MTN.png'
import Dropdown from 'react-native-input-select';
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Box, Select, CheckIcon, Center } from 'native-base';

const { width } = Dimensions.get('window');
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
  const [selectedPayment, setSelectedPayment] = useState('MasterCard'); // Initial state set to 'MasterCard'
  const handlePress = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const renderSelectedPaymentPage = () => {
    const [service, setService] = useState("");

    switch (selectedPayment) {
      case 'MasterCard':
        return (
          <View style={styles.pageContent}>
            <View style={styles.paymentDetail}>
              <Text style={styles.masterText}>Détails de paiement</Text>
              <Text style={styles.masterText}>Master Carte</Text>
            </View>
            <Text style={styles.numeroText}>Numéro de carte</Text>
            <TextInput
            placeholder='Entrez votre numéro de carte'
            style={styles.input}
            />
            <View style={styles.expirationDate}>
              <View style={styles.boxInput}>
                <Text style={styles.dateText}>Date d'expiration :</Text>
                <TextInput textContentType='date' style={styles.input} placeholder='EX : 12/09/27' />
              </View>
              <View style={styles.boxInput}>
                <Text style={styles.dateText}>CV Code</Text>
                <TextInput placeholder='CVC' style={styles.input} />
              </View>
            </View>
            <View style={styles.expirationDate}>
              <TouchableOpacity style={styles.btnSoumettre}>
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
          placeholder='Entrez votre numéro de carte'
          style={styles.input}
          />
          <View style={styles.expirationDate}>
            <View style={styles.boxInput}>
              <Text style={styles.dateText}>Date d'expiration :</Text>
              <TextInput textContentType='date' style={styles.input} placeholder='EX : 12/09/27' />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.dateText}>CV Code</Text>
              <TextInput placeholder='CVC' style={styles.input} />
            </View>
          </View>
          <View style={styles.expirationDate}>
            <TouchableOpacity style={styles.btnSoumettre}>
              <Text style={styles.soumettreText}>Soumettre</Text>
            </TouchableOpacity>
          </View>
        </View>
        );
      case 'Domicile':
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
              <Text style={styles.soumettreText}>Soumettre</Text>
            </TouchableOpacity>

          </View>
        );
      case 'MobileMoney':
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
                <Center style={styles.dropdown}>
                  <Box>
                    <Select
                      selectedValue={service}
                      minWidth="100"
                      minHeight="10"
                      accessibilityLabel="Choisir une région"
                      placeholder="+227"
                      mt={0}
                      onValueChange={itemValue => setService(itemValue)}>
                      <Select.Item label="+227" value="Niamey" />
                      <Select.Item label="+229" value="Maradi" />

                    </Select>
                  </Box>
                </Center>
                <View style={styles.dropdownInput}>
                <TextInput
                  placeholder='Entrez votre numéro'
                  placeholderTextColor='#a9a9a9'
                  style={{marginHorizontal: 3, height: 40,}}
                />
                </View>

              </View>

              <View style={styles.expirationDate}>
                <TouchableOpacity style={styles.btnSoumettre}>
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

  return (
    <NativeBaseProvider>
          <View style={styles.container}>
      <Text style={styles.title}>Mode de paiement</Text>
      <View style={styles.livraisoncard}>
        <View style={styles.cardPa}>
          <Pressable
            style={[styles.box, selectedPayment === 'MasterCard' && styles.selectedBox]}
            onPress={() => handlePress('MasterCard')}
          >
            <View style={styles.boxText}>
              <MyCheckbox checked={selectedPayment === 'MasterCard'} onPress={() => handlePress('MasterCard')} />
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
            style={[styles.box, selectedPayment === 'Domicile' && styles.selectedBox]}
            onPress={() => handlePress('Domicile')}
          >
            <View style={styles.boxText}>
              <MyCheckbox checked={selectedPayment === 'Domicile'} onPress={() => handlePress('Domicile')} />
            </View>
            <View style={styles.boxImage}>
              <Image source={DomicileCard} style={styles.image} />
              <Text style={styles.texBox}>Paiement à domicile</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.box, selectedPayment === 'MobileMoney' && styles.selectedBox]}
            onPress={() => handlePress('MobileMoney')}
          >
            <View style={styles.boxText}>
              <MyCheckbox checked={selectedPayment === 'MobileMoney'} onPress={() => handlePress('MobileMoney')} />
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
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#515C70',
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
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },

  selectedBox: {
    borderColor: '#FF6A69',
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
    borderColor: '#CCC',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#FF6A69',
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
  },

  // master card
  paymentDetail: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  masterText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#515C70",
  },
  numeroText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#515C70",
    marginVertical: 12
  },

  input: {
    height: 40,
    borderColor: '#ddd',
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
    color: "#515C70",
    marginVertical: 4
  },
  btnSoumettre: {
    padding: 12,
    backgroundColor: '#FF6A69',
    width: "100%",
    borderRadius: 10,
    marginTop: 20
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
    height: 210,
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
    padding: 12,
    backgroundColor: '#FF6A69',
    width: "100%",
    borderRadius: 10,
    marginTop: 20
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
    height: 40,
    width: "100%",
    borderColor: '#ddd',
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
  }
  ///////Mobile Money
});
