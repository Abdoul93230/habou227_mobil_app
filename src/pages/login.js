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
  Image
} from "react-native";
import LogoProject from "../../src/image/PlashScreen.png"
import { ChevronRight, Lock, Phone, User } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function LogIn({ chg, creer }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [selectedInput, setSelectedInput] = useState("email");
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

    if (email.length !== 0 && !regexMail.test(email)) {
      handleError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    if (
      phoneNumber.length > 0 &&
      (!regexPhone.test(phoneNumber) || phoneNumber.length > 11)
    ) {
      handleError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }
    if (password === "" || password.length < 6) {
      handleError("Votre mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    const loginData = {
      email: email.length > 0 ? email : null,
      phoneNumber: phoneNumber.length > 0 ? phoneNumber : null,
      password: password,
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
   
        {isloading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              Connection en cours Veuillez Patientez....
            </Text>
            <ActivityIndicator size="large" color="#FF6969" />
          </View>
        ) : (
          <View style={styles.container}>
               <View style={{width: "100%", height: 100,}}>
              <Image source={LogoProject} style={{width: "100%", height: "100%", resizeMode: "center"}}/>
            </View>
            {/* <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <User style={styles.icon} />
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="abass123@email.com"
                    keyboardType="abass123@email.com"
                  />
                </View>
              </View>
              <Text style={styles.orText}>OU</Text>
              <View style={styles.inputContainer}>
                <Phone style={styles.icon} />
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Numéro de téléphone"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View> */}

            {/* //////////////////// */}
            <View style={styles.inputGroup}>
<View style={styles.btnUtilisateur}>
  <TouchableOpacity
    style={[
      styles.buttonBTN,
      selectedInput === "email" && styles.selectedButton
    ]}
    onPress={() => setSelectedInput("email")}
  >
    <Text style={styles.buttonTextBTN}>Email</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[
      styles.buttonBTN,
      selectedInput === "phone" && styles.selectedButton
    ]}
    onPress={() => setSelectedInput("phone")}
  >
    <Text style={styles.buttonTextBTN}>Téléphone</Text>
  </TouchableOpacity>
</View>

{selectedInput === "email" ? (
  <View style={styles.inputContainer}>
    <User style={styles.icon} />
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="abass123@email.com"
        keyboardType="email-address"
      />
    </View>
  </View>
) : (
  <View style={styles.inputContainer}>
    <Phone style={styles.icon} />
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Numéro de téléphone"
        keyboardType="phone-pad"
      />
    </View>
  </View>
)}
</View>

{/* ///////////////////// */}
            <View style={styles.inputContainer}>
              <Lock style={styles.icon} />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Mot de passe"
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
                Mot de passe oublié ?
              </Text>
              {/* </TouchableOpacity> */}
            </View>
            <TouchableOpacity style={styles.button} onPress={connect}>
              <Text style={styles.buttonText}>Se connecter</Text>
              <View style={styles.buttonIcon}>
                <ChevronRight style={{ color: "#30A08B" }} />
              </View>
            </TouchableOpacity>
            <Text style={styles.signUpText}>
            Vous n'avez pas de compte ? Faites glisser votre doigt vers la droite pour{" "}
              <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate("Signup")}
              >
                créer un nouveau compte
              </Text>
            </Text>
          </View>
        )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputGroup: {
    width: "100%",
    marginVertical: 10,
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
    elevation: 2, 
    width: "100%",
    minHeight: 50, 
  },
  icon: {
    marginRight: 10,
    color: "#B2905F",
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#515C6F",
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#515C6F",
    minHeight: 40, // Hauteur minimale pour plus de confort
  },
  inputFocused: {
    borderBottomColor: "#FF6969",
    borderBottomWidth: 2,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderBottomColor: "#FF0000",
    borderBottomWidth: 2,
  },
  orText: {
    textAlign: "center",
    color: "#515C6F",
    marginVertical: 10,
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
  signUpText: {
    color: "#515C6F",
    textAlign: "center",
    fontSize: 14,
  },
  signUpLink: {
    color: "#B17235",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
    color: "#515C6F",
  },
  buttonFD: {
    width: "100%",
    textAlign: "left"
  },
  buttonF: {
    textAlign: "left",
    borderBlockColor: "red",
    borderWidth: 3,
  },
  buttonFT: {
    textAlign: "left",
    fontSize: 16,
    color: "#515C6F",
    marginBottom: 5,
  },
  // /////////////////////////////:

  btnUtilisateur: {
    flexDirection: 'row',         
    justifyContent: 'center',     
    alignItems: 'center',        
    marginVertical: 20,          
  },
  buttonBTN: {
    backgroundColor: 'rgb(181, 182, 184)',  
    paddingVertical: 10,       
    paddingHorizontal: 20,       
    borderRadius: 30,           
    marginHorizontal: 10,       
  },
  buttonTextBTN: {
    color: 'white',              
    fontSize: 16,                
    fontWeight: 'bold',          
    textAlign: 'center',         
  },
  selectedButton: {
    backgroundColor: '#30A08B', 
  },
  buttonFD: {
    width: "100%",
    textAlign: "left"
  },
  //////////////////////////
});

export default LogIn;




{/* <View style={styles.inputGroup}>
<View style={styles.btnUtilisateur}>
  <TouchableOpacity
    style={[
      styles.buttonBTN,
      selectedInput === "email" && styles.selectedButton
    ]}
    onPress={() => setSelectedInput("email")}
  >
    <Text style={styles.buttonTextBTN}>Email</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[
      styles.buttonBTN,
      selectedInput === "phone" && styles.selectedButton
    ]}
    onPress={() => setSelectedInput("phone")}
  >
    <Text style={styles.buttonTextBTN}>Téléphone</Text>
  </TouchableOpacity>
</View>

{selectedInput === "email" ? (
  <View style={styles.inputContainer}>
    <User style={styles.icon} />
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="abass123@email.com"
        keyboardType="email-address"
      />
    </View>
  </View>
) : (
  <View style={styles.inputContainer}>
    <Phone style={styles.icon} />
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Numéro de téléphone"
        keyboardType="phone-pad"
      />
    </View>
  </View>
)}
</View> */}