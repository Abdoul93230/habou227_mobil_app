import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { ChevronRight, Lock, Phone, User } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";



function LogIn({ chg, creer }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isloading, setIsloading] = useState(false);
  const navigation = useNavigation();
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  const connect = async () => {
    setIsloading(true);

    const handleError = (message) => {
      setIsloading(false);
      handleAlertwar(message);
    };

    if (email.length === 0 && phoneNumber.length===0) {
      handleError("Veuillez entrer des informations valide.");
      return;
    }
    if (email.length !== 0 && !regexMail.test(email.trim())) {
      handleError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    if (
      phoneNumber.length > 0 &&
      (!regexPhone.test(phoneNumber.trim()) || phoneNumber.trim().length > 11)
    ) {
      handleError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }
    if (password === "" || password.trim().length < 6) {
      handleError("Votre mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    const loginData = {
      email: email.trim().length > 0 ? email.trim() : null,
      phoneNumber: phoneNumber.trim().length > 0 ? phoneNumber.trim() : null,
      password: password.trim(),
    };

    try {
      const response = await axios.post(`${API_URL}/login`, loginData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        handleAlert(response.data.message);
        setIsloading(false);
        setEmail("");
        setPassword("");
        setPhoneNumber("");

        // if (response.data.redirectPath) {
        //   navigation.navigate(response.data.redirectPath);
        // } else {
        navigation.navigate("Home");
        const jsonValue = JSON.stringify(response.data);
        // Stocker les données
        await AsyncStorage.setItem("userEcomme", jsonValue);
        // }

        // Store user data
        // AsyncStorage.setItem('userEcomme', JSON.stringify(response.data));
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      handleError(
        error.response && error.response.status === 400
          ? error.response.data.message
          : "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      );
      console.log(error, "sadaew");
    }
  };

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
              Connection en cours Veuillez Patientez....
            </Text>
            <ActivityIndicator size="large" color="#FF6969" />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <User style={styles.icon} />
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Email/UserEmail</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="janedoe123@email.com"
                    keyboardType="email-address"
                  />
                </View>
              </View>
              <Text style={styles.orText}>or</Text>
              <View style={styles.inputContainer}>
                <Phone style={styles.icon} />
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="+227 87701000"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Lock style={styles.icon} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="*******************"
                  secureTextEntry
                />
              </View>
            </View>
            <View style={styles.buttonFD}>
              {/* <TouchableOpacity style={styles.buttonF}> */}
              <Text
                style={styles.buttonFT}
                onPress={() => navigation.navigate("forgotPassword")}
              >
                Forgot Password ?
              </Text>
              {/* </TouchableOpacity> */}
            </View>
            <TouchableOpacity style={styles.button} onPress={connect}>
              <Text style={styles.buttonText}>Log In</Text>
              <View style={styles.buttonIcon}>
                <ChevronRight style={{ color: "#FF6969" }} />
              </View>
            </TouchableOpacity>
            <Text style={styles.signUpText}>
              Don't have an account? Swipe right to{" "}
              <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate("Signup")}
              >
                create a new account
              </Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputGroup: {
    width: "100%", // S'assurer que le groupe prend toute la largeur disponible
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderColor: "#FF6969",
    borderWidth: 1,
    backgroundColor: "#fff",
    elevation: 1,
    width: "100%", // S'assurer que le conteneur prend toute la largeur disponible
  },
  icon: {
    marginRight: 10,
    color: "#515C6F",
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#515C6F",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#515C6F",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#515C6F",
  },
  orText: {
    textAlign: "center",
    color: "#515C6F",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FF6969",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 20,
    width: "100%", // S'assurer que le bouton prend toute la largeur disponible
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonIcon: {
    position: "absolute",
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    color: "#FF6969",
  },
  signUpText: {
    color: "#515C6F",
    textAlign: "center",
    fontSize: 14,
  },
  signUpLink: {
    color: "#FF6969",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
  },
  loadingText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
    color: "#515C6F",
  },
  buttonFD: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  buttonF: {
    textAlign: "left",
    borderBlockColor: "red",
    borderWidth: 3,
  },
  buttonFT: {
    textAlign: "left",
    width: "150px",
  },
});

export default LogIn;
