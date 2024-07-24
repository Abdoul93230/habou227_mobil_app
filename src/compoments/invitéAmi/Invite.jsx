import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import Produit from "../../image/Vnike2.jpg";

const Invite = () => {
  const [message, setMessage] = useState("Salut [Nom de votre ami], Je viens de découvrir un super site de commerce électronique avec des produits de haute qualité à des prix compétitifs. Si tu t'inscris en utilisant mon lien de parrainage, tu bénéficieras d'une réduction sur ta première commande, et moi aussi ! Ne rate pas cette occasion, rejoins-moi sur ce site génial ! Amicalement, [Ton nom]");
  const [email, setEmail] = useState("");

  const { height } = Dimensions.get('window');

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(30)).current;

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
          <TouchableOpacity style={styles.submitButton}>
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
