import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import {
  User,
  Lock,
  MessageSquare,
  PhoneCall,
  ChevronRight,
} from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

// const BackendUrl = process.env.REACT_APP_Backend_Url;

const SignUp = () => {
  const navigation = useNavigation();
  const [isloading, setIsloading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);
  const regexPhone = /^[0-9]{8,}$/;

  const handleAlert = (message) => {
    Toast.show({
      type: "success",
      text1: "success",
      text2: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  const handleAlertwar = (message) => {
    Toast.show({
      type: "error",
      text1: "error",
      text2: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  const validateCredentials = () => {
    const nameV = name.trim();
    const emailV = email.trim();
    const passwordV = password.trim();
    const phoneNumberV = phoneNumber.trim();

    if (nameV === "" || nameV.length < 3) {
      handleAlertwar("Veuillez entrer un nom valide au moins 3 caractères.");
      return false;
    } else if (emailV.length !== 0 && !validateEmail(emailV)) {
      handleAlertwar("Veuillez entrer une adresse e-mail valide.");
      return false;
    }  else if (
      (phoneNumberV.length > 0 && !regexPhone.test(phoneNumber)) ||
      phoneNumberV.length > 11
    ) {
      handleAlertwar("Veuillez entrer un numéro fonctionnel");
      return false;
    }else if (phoneNumberV.length === 0 && emailV.length === 0) {
      handleAlertwar(
        "Veuillez entrer une address mail ou un numero"
      );
      return false;
    }
    else if (passwordV === "" || passwordV.length < 6) {
      handleAlertwar(
        "Veuillez entrer un mot de passe valide au moins 6 caractères."
      );
      return false;
    }
     else {
      setIsloading(true);
      axios
        .post(`${API_URL}/user`, {
          name: nameV,
          password: passwordV,
          email: emailV,
          phoneNumber: phoneNumberV,
          whatsapp,
        })
        .then((response) => {
          axios
            .post(
              `${API_URL}/login`,
              {
                email: emailV.length > 0 ? emailV : null,
                phoneNumber: phoneNumberV.length > 0 ? phoneNumberV : null,
                password: passwordV,
              },
              {
                withCredentials: true,
                credentials: "include",
              }
            )
            .then(async (user) => {
              if (user.status === 200) {
                const jsonValue = JSON.stringify(user.data);
                // Stocker les données
                await AsyncStorage.setItem("userEcomme", jsonValue);
                const dateActuelle = new Date();
                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const dateInscription = dateActuelle.toLocaleDateString(
                  "fr-FR",
                  options
                );
                const message = `<h1>Nouvel Utilisateur Inscrit sur Habou227</h1>
                <p>Cher(e)Habou227,</p>
                <p>Nous avons le plaisir de vous informer qu'un nouvel utilisateur s'est inscrit sur Habou227. Voici les détails de l'utilisateur :</p>
                <ul>
                    <li>Nom : ${nameV}</li>
                    <li>Adresse e-mail : ${emailV}</li>
                    <li>Date d'inscription : ${dateInscription}</li>
                </ul>
                <p>Vous pouvez vérifier ces informations dans notre base de données pour assurer le suivi approprié. N'hésitez pas à contacter l'utilisateur pour le saluer et l'orienter dans son expérience de magasinage en ligne.</p>
                <p>Si vous avez des questions ou avez besoin d'informations supplémentaires, n'hésitez pas à me contacter à [abdoulrazak9323@gmail.com] ou par téléphone au [+227 87727501].</p>
                <p>Nous sommes ravis d'accueillir de nouveaux utilisateurs sur Habou227 et espérons que cette nouvelle inscription contribuera à notre croissance continue.</p>
                <p>Cordialement,</p>
                <p>Abdoul Razak<br>L'équipe Habou227</p>`;
                const emailData = {
                  senderEmail: emailV,
                  subject: "Nouveau utilisateur",
                  message: `<div>${message}</div`,
                  titel: `<br/><br/><h3>Nouveau utilisateur sur Habou227</h3>`,
                };

                axios
                  .post(`${API_URL}/sendMail`, emailData)
                  .then((response) => {})
                  .catch((error) => {
                    console.error("Erreur lors de la requête email:", error);
                  });
                handleAlert(user.data.message);
                navigation.navigate("Home");
                setIsloading(false);

              } else {
                handleAlert(user.data.message);
              }
            })
            .catch((error) => {
              setIsloading(false);
              console.log(error);
              if (error.response.status === 400) {
                handleAlertwar(error.response.data.message);
              } else {
                console.log(error.response);
              }
            });
        })
        .catch((error) => {
          setIsloading(false);
          console.log(error);
          if (error.response.status === 400) {
            handleAlertwar(error.response.data.message);
          } else if (error.response.status === 409) {
            handleAlertwar(error.response.data.message);
          }
        });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Ajustez la valeur si nécessaire
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {isloading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              Connection en cours, veuillez patienter...
            </Text>
            <ActivityIndicator size="large" color="#FF6969" />
          </View>
        ) : (
          <View style={styles.signUpContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Nom d'utilisateur</Text>
              <View style={styles.inputContainer}>
                <User color="#515C6F" />
                <TextInput
                  style={styles.input}
                  placeholder="janedoe12345"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.cont}>
              <View style={styles.fieldContainer2}>
                <Text style={styles.label2}>Adresse email</Text>
                <View style={styles.inputContainer2}>
                  <MessageSquare color="#515C6F" />
                  <TextInput
                    style={styles.input}
                    placeholder="janedoe123@email.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              <Text style={styles.orText2}>ou</Text>

              <View style={styles.fieldContainer2}>
                <Text style={styles.label2}>Numéro de téléphone</Text>
                <View style={styles.inputContainer2}>
                  <PhoneCall color="#515C6F" />
                  <TextInput
                    style={styles.input2}
                    placeholder="+227 87727501"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.inputContainer}>
                <Lock color="#515C6F" />
                <TextInput
                  style={styles.input}
                  placeholder="*******************"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            {phoneNumber.length >= 8 && (
              <>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxLabel}>WhatsApp Groupe:</Text>
                  <MyCheckbox
                    checked={whatsapp}
                    onPress={() => setWhatsapp(!whatsapp)}
                  />
                </View>
                <Text style={styles.checkboxText}>
                  Acceptez-vous de faire partie de notre communauté WhatsApp ?
                </Text>
              </>
            )}

            <TouchableOpacity style={{ width: 50 }}>
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{ color: "#FF6969" }}
              >
                LogIn ?
              </Text>
              <ChevronRight color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={validateCredentials}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
              <ChevronRight color="#fff" />
            </TouchableOpacity>

            <Text style={styles.agreementText}>
              By creating an account, you agree to our{" "}
              <Text style={styles.linkText}>Terms of Service</Text> and{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
    padding: 15,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  signUpContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#515C6F",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    borderColor: "#FF6969",
    borderWidth: 1,
    backgroundColor: "#fff",
    elevation: 1,
    width: "100%", // S'assurer que le conteneur prend toute la largeur disponible
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    color: "#515C6F",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6969",
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 5,
  },
  agreementText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#515C6F",
  },
  linkText: {
    color: "#FF6969",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#515C6F",
    marginRight: 10,
  },
  checkboxText: {
    color: "#515C6F",
    fontSize: 14,
  },
  cont: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 5, // Ombre portée pour Android
    shadowColor: "#000", // Couleur de l'ombre pour iOS
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre pour iOS
    shadowOpacity: 0.3, // Opacité de l'ombre pour iOS
    shadowRadius: 3.84, // Rayon de l'ombre pour iOS
  },
  fieldContainer2: {
    marginBottom: 10,
  },
  label2: {
    fontSize: 16,
    color: "#515C6F",
    marginBottom: 5,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    borderColor: "#FF6969",
    borderWidth: 1,
    backgroundColor: "#fff",
    elevation: 1, // Légère ombre pour Android
    width: "100%", // S'assurer que le conteneur prend toute la largeur disponible
  },
  input2: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontSize: 16,
  },
  orText2: {
    textAlign: "center",
    marginVertical: 7,
    color: "#515C6F",
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#CCC",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#FF6A69",
  },
});

export default SignUp;
