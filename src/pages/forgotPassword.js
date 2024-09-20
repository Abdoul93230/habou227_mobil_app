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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { API_URL } from "@env";
import { ChevronRight } from "react-native-feather";
import Toast from "react-native-toast-message";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!regexMail.test(email)) {
      handleAlertwar("Veuillez entrer une adresse e-mail valide.");
      setIsLoading(false);
      return;
    } else {
      try {
        const response = await axios.post(`${API_URL}/forgot_password`, {
          email,
        });
        handleAlert(response.data.message); // Assurez-vous que votre backend renvoie un code OTP à ce stade
        setIsLoading(false);
        navigation.navigate("ResetPassword", { email });
      } catch (error) {
        setIsLoading(false);
        console.log("Erreur lors de la récupération du mot de passe:", error);
        handleAlertwar("Erreur lors de la récupération du mot de passe");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Traitement en cours, veuillez patienter...
          </Text>
          <ActivityIndicator size="large" color="#30A08B" />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Ajustez la valeur si nécessaire
        >
          <Text style={styles.instructions}>
            Enter the email address you used to create your account and we will
            email you a link to reset your password
          </Text>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={24} color="#515C6F" />
            <View style={styles.rightContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="janedoe123@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Send email</Text>
            <View style={styles.buttonIcon}>
              <ChevronRight style={{ color: "#30A08B" }} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  instructions: {
    color: "#515C6F",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "300",
    textTransform: "uppercase",
    color: "#515C6F",
  },
  input: {
    width: "100%",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#515C6F",
    color: "#515C6F",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2ea28dd0",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 20,
    width: "100%",
    minWidth: "100%",
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
  // signUpText: {
  //   color: "#515C6F",
  //   textAlign: "center",
  //   fontSize: 14,
  // },
  // signUpLink: {
  //   color: "#B17235",
  //   fontWeight: "bold",
  // },
});

export default ForgotPassword;
