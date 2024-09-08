import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Home from "./src/pages/Home";
import Search from "./src/pages/Search";
import Cart from "./src/pages/Cart";
import Profile from "./src/pages/Profile";
import More from "./src/pages/More";
import ChatMessage from "./src/pages/ChatMessage";
import ProductDet from "./src/pages/ProductDet";
import Checkout from "./src/pages/Checkout";
import Succes from "./src/compoments/orderSuccesful/Succes";
import Invite from "./src/compoments/invitéAmi/Invite";
import ServicePage from "./src/compoments/servicePage/ServicePage";
import Commande from "./src/compoments/maCommande/Commande";
import SuggestionPage from "./src/compoments/suggestionPage/SuggestionPage";
import LivraisonPage from "./src/compoments/livraisonPage/LivraisonPage";
import PaiementPage from "./src/compoments/paiementPage/PaiementPage";
import ParaNotification from "./src/compoments/parametreNotification/ParaNotification";
import Confidentialite from "./src/compoments/AvisConfidentialitePage/Confidentialite";
import QuestionPage from "./src/compoments/questionFrequementposePage/QuestionPage";
import InformationPage from "./src/compoments/legalInformationPage/InformationPage";
import toastConfig from "./src/pages/toastConfig";
import store from "./src/redux/store";
import CategoriDetailPage from "./src/pages/CategoriDetailPage";
import LogIn from "./src/pages/login";
import SignUp from "./src/pages/signup";
import axios from "axios";
import {
  getCategories,
  getProducts,
  getProducts_Commentes,
  getProducts_Pubs,
  getTypes,
} from "./src/redux/ProductsActions";
import ForgotPassword from "./src/pages/forgotPassword";
import SeePage from "./src/pages/SeePage";
import SuivreCommande from "./src/pages/SuivreCommande";
import ConnexionPage from "./src/pages/ConnexionPage";
import InscriptionPage from "./src/pages/InscriptionPage";
import OTPPage from "./src/pages/OTPPage";
import VerificationNumPage from "./src/pages/VerificationNumPage";
import ChangePassword from "./src/pages/ChangePassword";
import { API_URL } from "@env";

const Stack = createNativeStackNavigator();


export default function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    store.dispatch(getProducts());
    store.dispatch(getTypes());
    store.dispatch(getCategories());
    store.dispatch(getProducts_Pubs());
    store.dispatch(getProducts_Commentes());
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userEcomme");
        const user = JSON.parse(jsonValue);
        if (user) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          const response = await axios.get(`${API_URL}/verify`, {
            withCredentials: true,
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification:", error);
      } finally {
        setIsAuthChecked(true);
      }
    };

    fetchUserData();
  }, []);
  // initialRouteName={isAuthenticated ? 'Home' : 'Login'}
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {isAuthChecked ? (
            <Stack.Navigator
              initialRouteName={isAuthenticated?"Home":"Login"}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Login" component={LogIn} />
              <Stack.Screen name="Signup" component={SignUp} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="CategoriDetailPage"
                component={CategoriDetailPage}
              />
              <Stack.Screen name="Voir tous" component={SeePage} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="More" component={More} />
              <Stack.Screen name="ChatMessage" component={ChatMessage} />
              <Stack.Screen name="Détail-Produit" component={ProductDet} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="Succes" component={Succes} />
              <Stack.Screen
                name="Inviter les amis"
                component={Invite}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Service Page"
                component={ServicePage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Commande Page"
                component={Commande}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Suivre la commande"
                component={SuivreCommande}
              />
              <Stack.Screen
                name="Suggestion Page"
                component={SuggestionPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Livraison Page"
                component={LivraisonPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Paiement Page"
                component={PaiementPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Paramètre de notification"
                component={ParaNotification}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Avis de confidentialité"
                component={Confidentialite}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Question Page"
                component={QuestionPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Information Page"
                component={InformationPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="forgotPassword"
                component={ForgotPassword}
                options={{ headerShown: true }}
              />
              <Stack.Screen name="Connexion" component={ConnexionPage} />
              <Stack.Screen name="Inscription" component={InscriptionPage} />
              <Stack.Screen name="OTP" component={OTPPage} />
              <Stack.Screen
                name="Vérifier votre numéro de téléphone"
                component={VerificationNumPage}
              />
              <Stack.Screen
                name="Changez votre mot de passe"
                component={ChangePassword}
              />
            </Stack.Navigator>
          ) : (
            <View style={styles.container}>
              <ActivityIndicator
                size="small"
                color="#FF6969"
                style={styles.spinner}
              />
              <Text>En cours de vérification...</Text>
            </View>
          )}
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  spinner: {
    borderWidth: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderTopColor: "#FF6969",
    borderRadius: 50,
    width: 30,
    height: 30,
  },
});
