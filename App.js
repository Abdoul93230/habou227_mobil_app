import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from "./src/pages/Home";
import Search from "./src/pages/Search";
import Cart from "./src/pages/Cart";
import Profile from "./src/pages/Profile";
import More from "./src/pages/More";
import ChatMessage from "./src/pages/ChatMessage";
import ProductDet from "./src/pages/ProductDet";
import Checkout from "./src/pages/Checkout";
import Succes from "./src/compoments/orderSuccesful/Succes";


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
      </Stack.Navigator>
     
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
