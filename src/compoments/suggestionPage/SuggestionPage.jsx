import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Animated, Easing, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import Produit from "../../image/Vnike2.jpg";
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { API_URL } from "@env";

const SuggestionPage = () => {
  const [onSubmit, setOnsubmit] = useState(false)
  const [valueText, setValueText] = useState("")



  const { height } = Dimensions.get('window');

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(30)).current;

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


  const envoyer = async () => {
    setOnsubmit(true)
    if (valueText.length < 8) {
      handleAlertwar("Veuillez entrer un commentaire valide !");
      setOnsubmit(false)
      return;
    }

    handleAlert("Envoi en cours...");

    try {
      const emailData = {
        senderEmail: "abdoulrazak9323@gmail.com",
        subject: "Commentaire iham-baobab.onrender.com",
        message: valueText,
        friendEmail: "abdoulrazak9323@gmail.com",
        clientName: "un Client",
      };

      await axios.post(`${API_URL}/Send_email_freind`, emailData);
      setOnsubmit(false)
      handleAlert("Commentaire envoyé !");
      // setAlertClosed(true);

      // Attendez un peu avant de naviguer
      setTimeout(() => {
        // navigue("/Profile");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };



  useEffect(() => {
    Animated.sequence([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        duration: 800,
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

      <Animated.View style={[styles.containerBottom, { opacity: formOpacity, transform: [{ translateY: buttonTranslateY }] }]}>
        <Text style={styles.suggestionText}>Votre suggestion</Text>
        <TextInput
        value={valueText}
          style={styles.textInput}
          onChangeText={setValueText}
          placeholder='Enregistrez ici'
          placeholderTextColor="#a0a0a0"
          multiline
        />
        <TouchableOpacity onPress={envoyer} style={styles.envoieBtn}>
          {
            onSubmit?(<ActivityIndicator size="small" color="#FFFFFF" />):(

              <Text style={styles.envoieText}>Envoyer</Text>
            )
          }
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default SuggestionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerTop: {
    width: "100%",
    height: "50%",
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  containerBottom: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  suggestionText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  textInput: {
    height: 100,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
    marginBottom: 20,
  },
  envoieBtn: {
    backgroundColor: "#FF6A69",
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  envoieText: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  }
});
