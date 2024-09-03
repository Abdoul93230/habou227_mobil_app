import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, ScrollView,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, Box, Select, CheckIcon, Center } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';


const BackendUrl = 'https://chagona.onrender.com';
const LivraisonPage = () => {
  const [service, setService] = useState("");
  const regexPhone = /^[0-9]{8,}$/;
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [Quartier, setQuartier] = useState("");
  const [plus, setPlus] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);



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
  };




  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userEcomme');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(userData);
        if (userData) {
          axios
      .get(`${BackendUrl}/getAddressByUserKey/${userData.id}`)
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
        console.log(error.response);
        setLoading(false)
      });


        }
      } catch (e) {
        console.error('Failed to load user data:', e);
      }
    };

    fetchUserData();
  }, []);


  const envoyer = () => {
    // e.preventDefault();
    setLoading(true);
    if (nom.trim().length < 3) {
      setLoading(false);
      alert("Votre nom doit etre superieur ou inferieur a 3 caracteres");
      return;
    }
    // if (!regexMail.test(email)) {
    //   handleAlertwar("forma du mail non valid!");
    //   return;
    // }
    if (!regexPhone.test(phone.toString())) {
      setLoading(false);
      handleAlertwar("forma du numero non valid!");
      return;
    }
    if (region.trim().length <= 0 || region.trim() === "choisir") {
      setLoading(false);
      handleAlertwar("Vous avez pas selectionner votre region.");
      return;
    }
    if (Quartier.trim().length <= 2) {
      setLoading(false);
      handleAlertwar("Vous avez pas bien fourni votre nom de quartier.");
      return;
    }

    const obj = {
      name: nom,
      email: email,
      numero: phone,
      region: region,
      quartier: Quartier,
      clefUser: user.id,
    };
    if (plus.length !== 0) {
      obj.description = plus;
    }
    // setRond(true)
    axios
      .post(`${BackendUrl}/createOrUpdateAddress`, obj)
      .then((shipping) => {
        // setRond(false)

        handleAlert(shipping.data.message);

        axios
          .get(`${BackendUrl}/getAddressByUserKey/${user.id}`)
          .then((shippingAd) => {
            setEmail(shippingAd.data.address.email);
            setNom(shippingAd.data.address.name);
            setPhone(shippingAd.data.address.numero);
            setQuartier(shippingAd.data.address.quartier);
            setRegion(shippingAd.data.address.region);
            setPlus(shippingAd.data.address.description);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // setRond(false)
        if (error.response.status === 400) {
          setLoading(false);
          handleAlertwar(error.response.data.err);
        }
        console.log(error.response);
      });
  };






  // const platformStyles = Platform.select({
  //   ios: { minWidth: 370, minHeight: 40 }, // Ajustez selon vos besoins pour iOS
  //   android: { minWidth: 340, minHeight: 50 }, // Ajustez selon vos besoins pour Android
  // });


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6A69" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Adresse de livraison</Text>
        <View style={styles.cardAddress}>

      <View style={styles.formGroup}>
      <Text style={styles.text}>
        Région: <Text style={styles.regionText}>{region || 'Votre région va apparaître ici...'}</Text>
      </Text>
      {/* <Center style={{borderWidth:0}}> */}
        {/* <Box style={[styles.dropdown,styles.input]}> */}
          <Select
          style={[styles.input2]}
            selectedValue={region}
            accessibilityLabel="Choisir une région"
            // placeholder={region}
            // defaultValue={region}
            mt={0}
            onValueChange={itemValue => setRegion(itemValue)}
          >
            <Select.Item label="Niamey" value="Niamey" />
            <Select.Item label="Maradi" value="Maradi" />
            <Select.Item label="Dosso" value="Dosso" />
            <Select.Item label="Zinder" value="Zinder" />
            <Select.Item label="Agadez" value="Agadez" />
            <Select.Item label="Diffa" value="Diffa" />
            <Select.Item label="Tillaberi" value="Tillaberi" />
            <Select.Item label="Tahoua" value="Tahoua" />
          </Select>
        {/* </Box> */}
      {/* </Center> */}
    </View>

          <View style={styles.formGroup}>
            <Text style={styles.text} >Quartier</Text>
            <TextInput style={styles.input} onChangeText={(text=>setQuartier(text))} value={Quartier} placeholder='Enregistrez ici' />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Nom:</Text>
            <TextInput style={styles.input} onChangeText={(text=>setNom(text))} value={nom} placeholder='Entrez votre nom' />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Email:</Text>
            <TextInput style={styles.input} onChangeText={(text=>setEmail(text))} value={email} placeholder='Entrez votre email' keyboardType='email-address' />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Téléphone:</Text>
            <TextInput style={styles.input} onChangeText={(text=>setPhone(text))} value={(phone.toString())} placeholder='Entrez votre numéro' keyboardType='phone-pad' />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Plus de détails:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={plus}
              onChangeText={(text=>setPlus(text))}
              placeholder='Détails sur votre location'
              multiline
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={envoyer}>
            <Text style={styles.buttonText}>Soumettre</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default LivraisonPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 1,
    padding: 5,
    fontWeight: "bold",
    color: "#515C70",
  },
  cardAddress: {
    marginHorizontal: 0,
    marginVertical: 10,
    padding: 20,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: "#515C70",
  },
  regionText: {
    color: '#515C70',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input2: {
    height: 40,
    borderColor: '#ddd',
    fontSize: 16,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdown:{
    height: 40,
    borderRadius: 5,
    paddingVertical:10

  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: "100%",
  },
  button: {
    backgroundColor: '#FF6A69',
    paddingVertical: 10,
    width: "100%",
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Fond de la page de chargement
  },
});
