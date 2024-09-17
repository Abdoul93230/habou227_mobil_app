import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Animated, Easing, ActivityIndicator,KeyboardAvoidingView,Platform } from 'react-native';
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
<<<<<<< HEAD
    <KeyboardAvoidingView
    behavior={Platform.OS  === "ios" ? "padding" : "height"}
=======
    <KeyboardAvoidingView 
    behavior={Platform.OS  === "ios" ? "height" : "height"}
>>>>>>> 9c76883299a9447ec7346dfc180fd0400b886817
    style={styles.container}>
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
    </KeyboardAvoidingView>
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
    backgroundColor: "#B2905F", // Couleur de fond pour la partie supérieure
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
    backgroundColor: "#FFFFFF", // Couleur de fond pour la partie inférieure
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  suggestionText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#B17236", // Couleur pour le texte de suggestion
    marginBottom: 15,
  },
  textInput: {
    height: 100,
    borderColor: "#B2905F", // Couleur de la bordure
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#F0F0F0", // Couleur de fond du champ de texte
    marginBottom: 20,
  },
  envoieBtn: {
    backgroundColor: "#30A08B", // Couleur pour le bouton
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
    color: "#FFFFFF", // Couleur du texte sur le bouton
    fontWeight: "bold",
  },
});
