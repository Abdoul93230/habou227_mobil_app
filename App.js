import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {ScrollView} from "react-native";
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
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="More" component={More} />
        <Stack.Screen name="ChatMessage" component={ChatMessage} />
        <Stack.Screen name="Détail-Produit" component={ProductDet}/>
        <Stack.Screen name="Checkout" component={Checkout}/>
        <Stack.Screen name="Succes" component={Succes} />
        <Stack.Screen name="Inviter les amis" component={Invite} options={{headerShown: true}} />
        <Stack.Screen name="Service Page" component={ServicePage} options={{headerShown: true}} />
        <Stack.Screen name="Commande Page" component={Commande} options={{headerShown: true}} />
        <Stack.Screen name="Suggestion Page" component={SuggestionPage} options={{headerShown: true}} />
        <Stack.Screen name="Livraison Page" component={LivraisonPage} options={{headerShown: true}} />
        <Stack.Screen name="Paiement Page" component={PaiementPage} options={{headerShown: true}} />
        <Stack.Screen name="Paramètre de notification" component={ParaNotification} options={{headerShown: true}} />
        <Stack.Screen name="Avis de confidentialité" component={Confidentialite} options={{headerShown: true}} />
        <Stack.Screen name="Question Page" component={QuestionPage} options={{headerShown: true}} />
        <Stack.Screen name="Information Page" component={InformationPage} options={{headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

