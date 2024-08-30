import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import Produit from "../../image/Vnike2.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const Invite = () => {
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [message, setMessage] = useState("Salut [Nom de votre ami], Je viens de découvrir un super site de commerce électronique avec des produits de haute qualité à des prix compétitifs. Si tu t'inscris en utilisant mon lien de parrainage, tu bénéficieras d'une réduction sur ta première commande, et moi aussi ! Ne rate pas cette occasion, rejoins-moi sur ce site génial ! Amicalement, [Ton nom]");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [emailP, setEmailP] = useState(null);
  const [name, setName] = useState(null);

  const { height } = Dimensions.get('window');

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(30)).current;
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
    const fetchData = async()=>{
      const jsonValue = await AsyncStorage.getItem('userEcomme');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(userData);
        setName(userData.name)
      if (userData) {
        axios
          .get(`https://chagona.onrender.com/user`, {
            params: {
              id: userData.id,
            },
          })
          .then((response) => {
            const data = response.data.user;
            if (!emailP) {
              setEmailP(data.email);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },[]);

  const envoyer = async (e) => {
    e.preventDefault();
    if (!regexMail.test(email) && number.length < 8) {
      handleAlertwar("Format de l'email non valide !");
      return;
    }
    handleAlert("Envoi en cours...");
    if (regexMail.test(email) || number.length >= 8) {
      if (regexMail.test(email)) {
        const emailData = {
          senderEmail: emailP,
          subject: "Sujet de l'e-mail",
          message: message,
          friendEmail: email,
          clientName: name,
        };

        try {
          setLoading(true);
          await axios.post(`https://chagona.onrender.com/Send_email_freind`, emailData);
          handleAlert("Email envoyé !");
          setLoading(false);
          // Attendre quelques secondes avant de naviguer
          setTimeout(() => {
            navigue("/Profile");
          }, 3000);
        } catch (error) {
          console.error("Erreur lors de la requête:", error);
        }
      }

      // if (regexPhone.test(number.toString())) {
      //   handleAlert("Invitation envoyée avec succès par téléphone !");
      // }
    }
  };



  useEffect(() => {
    Animated.sequence([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();
  }, [imageOpacity, formOpacity, buttonTranslateY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.containerTop, { opacity: imageOpacity }]}>
        <Image source={Produit} style={styles.image} />
      </Animated.View>
      <Animated.View style={[styles.containerBottom, { opacity: formOpacity }]}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={styles.textInput}
          multiline
        />
        <View style={styles.emailContainer}>
          <Text style={styles.text}>Email de votre ami: </Text>
          <TextInput
            placeholder="Enregistrez ici"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.emailInput}
          />
        </View>
        <Animated.View style={{ transform: [{ translateY: buttonTranslateY }], width: "100%", }}>
          <TouchableOpacity style={styles.submitButton} onPress={envoyer}>
            <Text style={styles.submitButtonText}>Soumettre</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.whatsappContainer}>
          <Text style={styles.whatsappText}>Via WhatsApp</Text>
          <FontAwesome5 name="whatsapp" size={24} color="#25D366" />
        </View>
      </Animated.View>
    </View>
  )
}

export default Invite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerTop: {
    width: "100%",
    height: "45%",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  containerBottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  textInput: {
    width: "100%",
    height: 170,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    bottom: 25,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  emailContainer: {
    width: "100%",
    bottom: 12,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  emailInput: {
    width: "100%",
    height: 40,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    width: "100%",
    height: 43,
    backgroundColor: "#ff6f61",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  whatsappContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  whatsappText: {
    fontSize: 18,
    marginRight: 10,
    color: "#333",
  }
});
