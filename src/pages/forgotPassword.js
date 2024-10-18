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
import { ChevronRight, PhoneCall } from "react-native-feather";
import {  Select,NativeBaseProvider, Center  } from 'native-base';
import Toast from "react-native-toast-message";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numero, setNumero] = useState("");
  const [numeroV, setNumeroV] = useState("");
  const [operateur, setOperateur] = useState("227");
  const navigation = useNavigation();
  const [isEmail, setIsEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
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

  const optionS = operateur === "229"
  ? [
    { value: "229", label: "229" },
    { value: "227", label: "227" }
  ]:

  [
      { value: "227", label: "227" },
      { value: "229", label: "229" }
    ]
  ;


  // const handleSubmit = async () => {
  //   setIsLoading(true);

  //   if(isEmail){

  //     if (!regexMail.test(email)) {
  //       handleAlertwar("Veuillez entrer une adresse e-mail valide.");
  //       setIsLoading(false);
  //       return;
  //     } else {
  //       try {
  //         const response = await axios.post(`${API_URL}/forgot_password`, {
  //           email,
  //         });
  //         handleAlert(response.data.message); // Assurez-vous que votre backend renvoie un code OTP à ce stade
  //         setIsLoading(false);
  //         navigation.navigate("ResetPassword", { email });
  //       } catch (error) {
  //         if(error.response && error.response.status === 404){
  //           setIsLoading(false);
  //           handleAlertwar(error.response.data.message)
  //         }else{
  //           setIsLoading(false);
  //           console.log("Erreur lors de la récupération du mot de passe:", error);
  //           handleAlertwar("Erreur lors de la récupération du mot de passe");
  //         }

  //       }
  //     }
  //   }else{
  //     if (!regexPhone.test(numero.toString())) {
  //       setIsLoading(false);
  //       return handleAlertwar("forma du numero non valid!");
  //     } else if (numero.length < 8 && operateur==="227") {

  //       handleAlertwar(
  //         "Le numéro de l'utilisateur doit contenir au moins 8 chiffres Niger"
  //       );
  //       setIsLoading(false);
  //       return;
  //     }else if (numero.length < 8 && operateur==="229") {
  //       // console.log(2)
  //       handleAlertwar(
  //         "Le numéro de l'utilisateur doit contenir au moins 8 chiffres Benin"
  //       );
  //       setIsLoading(false);
  //       return;
  //     }
  //      else if (numero.length === 8) {

  //       // Ajouter le préfixe "227" au début du numéro
  //       const userNumber = operateur==="229"? "229" + numero :"227" + numero;
  //       setNumero(userNumber);
  //       setNumeroV(userNumber)

  //     } else if (numero.length === 11) {
  //       setNumeroV(operateur + numero.substring(3, numero.length));
  //       // Vérifier si le préfixe est "227"
  //       if (numero.substring(0, 3) !== "227" && numero.substring(0, 3) !== "229") {
  //         handleAlertwar(
  //           "Le préfixe du numéro de l'utilisateur doit être '227 ou 229'"
  //         );
  //         setIsLoading(false);
  //         return;
  //       }
  //     } else if (numero.length > 11) {

  //       handleAlertwar(
  //         "Le numéro doit contenir 8, ou 11 chiffres avec l'identifiant"
  //       );
  //       setIsLoading(false);
  //       return;
  //     } else if (numero.length > 8 && numero.length < 11) {

  //       handleAlertwar(
  //         "Le numéro doit contenir 8, ou 11 chiffres avec l'identifiant"
  //       );
  //       setIsLoading(false);
  //       return;
  //     }else{

  //       setNumeroV(numero);
  //     }
  //     setIsLoading(false);

  //     console.log(numeroV)

  //   }



  // };


  const handleSubmit = async () => {
    setIsLoading(true);
    // console.log(API_URL)

    if (isEmail) {
      // Validation de l'email
      if (!regexMail.test(email)) {
        handleAlertwar("Veuillez entrer une adresse e-mail valide.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.post(`${API_URL}/forgot_password`, { email });
        handleAlert(response.data.message); // Assurez-vous que votre backend renvoie un code OTP à ce stade
        setIsLoading(false);
        navigation.navigate("ResetPassword", { email });
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.status === 404) {
          handleAlertwar(error.response.data.message);
        } else {
          console.error("Erreur lors de la récupération du mot de passe:", error);
          handleAlertwar("Erreur lors de la récupération du mot de passe.");
        }
      }
    } else {
      // Validation du numéro de téléphone
      if (!regexPhone.test(numero.toString())) {
        setIsLoading(false);
        return handleAlertwar("Format du numéro non valide !");
      }

      if (numero.length < 8) {
        const message =
          operateur === "227"
            ? "Le numéro doit contenir au moins 8 chiffres (Niger)."
            : "Le numéro doit contenir au moins 8 chiffres (Bénin).";
        handleAlertwar(message);
        setIsLoading(false);
        return;
      }

      let userNumber;
      if (numero.length === 8) {
        // Ajout du préfixe "227" ou "229"
        userNumber = operateur === "229" ? "229" + numero : "227" + numero;
        setNumero(userNumber);
        setNumeroV(userNumber);
      } else if (numero.length === 11) {
        // Vérification du préfixe et extraction du numéro sans préfixe
        const prefix = numero.substring(0, 3);
        if (prefix !== "227" && prefix !== "229") {
          handleAlertwar("Le préfixe du numéro doit être '227' ou '229'.");
          setIsLoading(false);
          return;
        }
        userNumber = operateur + numero.substring(3);
        setNumeroV(userNumber);
      } else {
        handleAlertwar("Le numéro doit contenir 8 chiffres ou 11 avec le préfixe.");
        setIsLoading(false);
        return;
      }

      // Requête pour la récupération de mot de passe par numéro de téléphone
      try {
        const response = await axios.post(`${API_URL}/forgot_password`, {
          phoneNumber: userNumber,
          num:numero.substring(3, 11)
        });
        handleAlert(response.data.message); // Assurez-vous que votre backend renvoie un code OTP à ce stade
        setIsLoading(false);
        navigation.navigate("ResetPassword", { numero: userNumber });
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.status === 404) {
          handleAlertwar(error.response.data.message);
        } else {
          console.error("Erreur lors de la récupération du mot de passe:", error);
          handleAlertwar("Erreur lors de la récupération du mot de passe.");
        }
      }
    }
    // console.log(numero.substring(3, 11))
  };



  return (
    <NativeBaseProvider>
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
          <View style={styles.email_phone}>
            <TouchableOpacity
              style={isEmail ? styles.touchOptions2 : styles.touchOptions}
              onPress={() => setIsEmail(true)}
            >
              <Text style={isEmail ? styles.option : styles.option2}>
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isEmail ? styles.touchOptions : styles.touchOptions2}
              onPress={() => setIsEmail(false)}
            >
              <Text style={isEmail ? styles.option2 : styles.option}>
                Phone
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {isEmail ? (
              <>
                <Text style={styles.label}>Email</Text>

                <View style={styles.rightContainer}>
                  <Feather name="mail" size={24} color="#B2905F" />
                  <TextInput
                    style={styles.input}
                    placeholder="janedoe123@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </>
            ) : (
              <>
               {
                isTrue?<>
                   <Text style={styles.label}>Numéro de téléphone</Text>
                {/* <View style={styles.rightContainer}>
                  <PhoneCall color="#B2905F" />
                  <TextInput
                    style={styles.input}
                    placeholder="+227 87727501"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View> */}
                <View style={styles.PhoneInput}>
                {/* Select opérateur */}
                <Select
                  style={{ borderColor: "#B2905F", borderWidth: 0, overflow: "hidden" }}
                  selectedValue={operateur === '227' || operateur === '229' ? operateur : '227'}
                  minWidth="100"
                  minHeight="20"
                  borderColor={"#B2905F"}
                  accessibilityLabel="Choisir une région"
                  mt={0}
                  onValueChange={itemValue => setOperateur(itemValue)}
                >
                  {optionS.map(option => (
                    <Select.Item key={option.value} label={option.label} value={option.value} />
                  ))}
                </Select>

                {/* Input du numéro */}
                <View style={styles.dropdownInput}>
                  <TextInput
                    value={
                      numero.length > 8 &&
                      (numero.substring(0, 3) === '227' || numero.substring(0, 3) === '229')
                        ? numero.substring(3)
                        : numero
                    }
                    onChangeText={(text) => {
                      setNumero(text);
                    }}
                    placeholder='Entrez votre numéro'
                    placeholderTextColor='#a9a9a9'
                    style={{ marginHorizontal: 3, height: 40 }}
                    keyboardType='numeric' // Pour un clavier numérique
                  />
                </View>
              </View>
                </>:<View style={styles.indisponible}>
                <Text style={styles.indisponibleText}>Sera bientot operationelle</Text>
                </View>
               }

              </>
            )}
          </View>
          {
            isEmail?<TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isEmail ? "Send email" : "Send Sms"}
            </Text>
            <View style={styles.buttonIcon}>
              <ChevronRight style={{ color: "#30A08B" }} />
            </View>
          </TouchableOpacity>:<></>
          }

        </KeyboardAvoidingView>
      )}
    </NativeBaseProvider>
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
    color: "#B2905F",
    fontSize: 19,
    lineHeight: 20,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 30,
  },
  rightContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#30A08B",
    alignItems: "center",
    padding: 5,
    overflow: "hidden",
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "300",
    textTransform: "uppercase",
    color: "#515C6F",
    bottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomColor: "#515C6F",
    color: "#515C6F",
    fontSize: 19,
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
  indisponible:{
    textAlign:'center',
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:10,
  },
  indisponibleText:{
    color:'#B2905F'
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

  email_phone: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  touchOptions: {
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#B2905F",
    marginHorizontal: 5,
  },
  touchOptions2: {
    padding: 10,
    backgroundColor: "#30A08B",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#B2905F",
    marginHorizontal: 5,
  },
  option: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingHorizontal: 20,
  },
  option2: {
    color: "#B2905F",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingHorizontal: 20,
  },

  // forgotPasswordLink: {
  //   color: "#B17235",
  //   fontWeight: "bold",
  // },

  // bottomText: {
  //   color: "#515C6F",
  //   fontSize: 14,
  //   marginTop: 20,
  // },

  // bottomLink:


  PhoneInput: {
    height: 45,
    width: "100%",
    borderColor: '#B2905F',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "scroll"

  },
  dropdownInput: {
    width: '100%',
    height: "auto",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Fond de la page de chargement
  },
});

export default ForgotPassword;
