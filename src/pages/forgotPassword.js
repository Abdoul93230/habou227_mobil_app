import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!regexMail.test(email)) {
      alert("Veuillez entrer une adresse e-mail valide.");
      setIsLoading(false);
      return;
    } else {
      try {
        const response = await axios.post(`${BackendUrl}/forgot_password`, {
          email,
        });
        alert(response.data.message); // Assurez-vous que votre backend renvoie un code OTP à ce stade
        setIsLoading(false);
        navigation.navigate("ResetPassword", { email });
      } catch (error) {
        setIsLoading(false);
        alert("Erreur lors de la récupération du mot de passe");
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
          <ActivityIndicator size="large" color="#FF6969" />
        </View>
      ) : (
        <View style={styles.container}>
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
            <View style={styles.iconContainer}>
              <Feather name="chevron-right" size={24} color="#FF6969" />
            </View>
          </TouchableOpacity>
        </View>
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
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6969",
    borderRadius: 26,
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  iconContainer: {
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
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
});

export default ForgotPassword;
