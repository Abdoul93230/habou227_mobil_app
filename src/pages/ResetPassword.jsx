import React, { useState } from "react";
import { View, Text, TextInput, Image, KeyboardAvoidingView, StyleSheet, ActivityIndicator,TouchableOpacity,Platform, } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";
import { ChevronLeft, ChevronRight, Lock } from "react-native-feather";
import LogoProject from "../../src/image/PlashScreen.png";


const ResetPassword = () => {
  const route = useRoute();
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);


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
    if (newPassword === "" || newPassword.length < 6) {
      handleAlertwar("Votre mot de passe doit contenir au moins 6 caractères.");
      setIsLoading(false);
      return;
    } else if (newPassword.trim() !== newPassword2.trim()) {
      handleAlertwar("Vos deux mots de passe ne sont pas conformes.");
      setIsLoading(false);
      return;
    } else {
      try {
        const response = await axios.post(`${API_URL}/reset_password`, {
          email,
          otp,
          newPassword,
        });
        handleAlert(response.data.message);
        setIsLoading(false);
        navigation.navigate("Login"); // Remplacez "Home" par votre écran d'accueil
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          handleAlertwar(error.response.data.message);
        } else {
          console.error("Erreur lors de la réinitialisation du mot de passe:", error);
          handleAlertwar("Erreur lors de la réinitialisation du mot de passe.");
        }
      }
    }
  };

  return (
    
        <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Ajustez la valeur si nécessaire
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Traitement en cours. Veuillez patienter...</Text>
          <ActivityIndicator size="large" color="#30A08B" />
        </View>
      ) : (
        <View style={styles.signUpContainer}>
            <View style={{ width: "100%", height: 100 }}>
              <Image
                source={LogoProject}
                style={{ width: "100%", height: "100%", resizeMode: "center" }}
              />
            </View>
          <Text style={styles.title}>Réinitialisation de mot de passe</Text>
          <Text style={styles.instruction}>Un code OTP a été envoyé à {email}. Veuillez le saisir ci-dessous.</Text>
          
          {/* <TextInput
            style={styles.input}
            placeholder="Code OTP"
            value={otp}
            onChangeText={setOtp}
          /> */}

          {/* ///////////////////////////////////////////////////////////////////// */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Code OTP</Text>
            <View style={styles.inputContainer}>
              <Lock color="#B2905F" />
              <TextInput
                style={styles.input}
                placeholder="*******************"
                // secureTextEntry={true}
                value={otp}
                onChangeText={setOtp}
              />
            </View>
          </View>
          {/* ///////////////////////////////////////////////////////////////////// */}
          
          {/* <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          /> */}


{/* ///////////////////////////////////////////////////////////////////// */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nouveau mot de passe</Text>
            <View style={styles.inputContainer}>
              <Lock color="#B2905F" />
              <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>
          </View>
{/* ///////////////////////////////////////////////////////////////////// */}

          
          {/* <TextInput
            style={styles.input}
            placeholder="Confirmez le mot de passe"
            secureTextEntry
            value={newPassword2}
            onChangeText={setNewPassword2}
          /> */}


{/* ///////////////////////////////////////////////////////////////////// */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirmez le mot de passe</Text>
            <View style={styles.inputContainer}>
              <Lock color="#B2905F" />
              <TextInput
                style={styles.input}
                placeholder="Confirmez le mot de passe"
                secureTextEntry={true}
                value={newPassword2}
                onChangeText={setNewPassword2}
              />
            </View>
          </View>
{/* ///////////////////////////////////////////////////////////////////// */}

         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
            <View style={styles.buttonIcon}>
              <ChevronRight color="#30A08B" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Annuler !</Text>
            <View style={styles.buttonIcon}>
              <ChevronLeft color="#B2905F" />
            </View>
          </TouchableOpacity>
          {/* <Button title="Réinitialiser le mot de passe" onPress={handleSubmit} />
          <Button title="Annuler !" onPress={() => navigation.navigate("Home")} color="#ff6969" /> */}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
    padding: 10,
    backgroundColor: "#fff",
  },
  
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  loadingText: {
    textAlign: "center",
    marginBottom: 20,
  },
  signUpContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  instruction: {
    textAlign: "center",
    color: "#555",
    marginBottom: 7,
  },
  


  ////////////////////////////
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#515C6F",
    marginBottom: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    borderColor: "#2ea28dd0",
    borderWidth: 1,
    backgroundColor: "#fff",
    elevation: 2, // Augmenter l'élévation pour une ombre plus visible
    width: "100%",
    minHeight: 50,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#515C6F",
  },
  buttonIcon: {
    position: "absolute",
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    color: "#FF6969",
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    color: "#515C6F",
  },
  button: {
    backgroundColor: "#2ea28dd0",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: "100%",
    minWidth: "100%",
    marginBottom:10,
    
  },
  button2: {
    backgroundColor: "#B2905F",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: "100%",
    minWidth: "100%",
    marginBottom:10
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  agreementText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#515C6F",
  },
  linkText: {
    color: "#30A08B",
  },
});

export default ResetPassword;
