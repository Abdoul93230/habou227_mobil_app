import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated,Platform,DeviceEventEmitter } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import Profil from "../../image/logo.png";
import io from "socket.io-client";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from "@env";
import { Dimensions } from 'react-native';

const BackendUrl = `${API_URL}`;
const socket = io(BackendUrl);

const { width, height } = Dimensions.get('window');

const Header__page = () => {
  const navigation = useNavigation();
  const [allMessage, setAllMessage] = useState([]);
  const [user, setUser] = useState([]);
  const [nbr, setNbr] = useState(0);
  const fadeAnimHeader = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnimHeader, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimHeader]);
  const [produits, setProduits] = useState(null);
  useEffect(() => {

    // console.log("ouié&")
    const getPanier = async () => {
      try {
        const local = await AsyncStorage.getItem("panier");
        if (local) {
          setProduits(JSON.parse(local));
        } else {
          setProduits([]);
        }
      } catch (error) {
        console.error("Error fetching panier from AsyncStorage", error);
      }
    };

    getPanier();
  }, );

  useEffect(() => {


    const fetchData = async()=>{
      const jsonValue = await AsyncStorage.getItem('userEcomme');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(userData);
        // console.log(userData)
        // setName(userData.name)
      if (userData) {
        axios
          .get(`${API_URL}/getUserMessagesByClefUser/${userData.id}`)
          .then((response) => {
            setNbr(
              response.data.filter(
                (item) => item.lusUser === false && item.provenance === false
              )?.length
            );
            setAllMessage(
              response.data.filter(
                (item) => item.lusUser === false && item.provenance === false
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });

      }
    }
     fetchData()



},[]);
useEffect(() => {


    const fetchData = async()=>{
      const jsonValue = await AsyncStorage.getItem('userEcomme');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(userData);
        // console.log(userData)
        // setName(userData.name)
      if (userData) {
        axios
          .get(`${API_URL}/getUserMessagesByClefUser/${userData.id}`)
          .then((response) => {
            setNbr(
              response.data.filter(
                (item) => item.lusUser === false && item.provenance === false
              )?.length
            );
            setAllMessage(
              response.data.filter(
                (item) => item.lusUser === false && item.provenance === false
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    socket.on("new_message_user", fetchData);

  return () => {
    // Nettoyer l'écouteur du socket lors du démontage du composant
    socket.off("new_message_user");
  };


},[socket]);





  return (
    <Animated.View style={[styles.header, { opacity: fadeAnimHeader,paddingTop:Platform.OS==="ios"?40:20 }]}>
      <View style={styles.profileLogo}>
        <Image source={Profil} style={styles.image} />
      </View>
    <View style={styles.shoppingIcon}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ChatMessage')}>
        {/* <Entypo name='circle' size={24} color="#B2905F" /> */}
        <Feather name="message-circle" size={24} color="#B2905F" />
        <View style={styles.circleBTN}>
          <Text style={styles.badgeText}>{nbr > 0 ? allMessage.length : 0}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Cart")}>
        <Feather name="shopping-cart" size={24} color="#B2905F" />
        <View style={styles.circleBTN}>
          <Text style={styles.badgeText}>{produits ? produits.length : 0}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </Animated.View>

  )
}

export default Header__page;

const styles = StyleSheet.create({
  //Header composant
  header: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
      paddingHorizontal: 12,
      width: "100%",
      paddingBottom: Platform.OS === 'ios' ? 10 : 20,
      // backgroundColor: "rgba(255, 152, 0, 0.2)"
      backgroundColor: "blue"
  },
  profileLogo: {
      width: Platform.OS === "ios" ? width * 0.35 : width * 5/11,
      height: height * 0.047,
      borderColor: '#FF9800', // Orange assorti à la bordure du header
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      top: Platform.OS === 'ios' ? 0 : 10,
      right: 20
  },
  image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  shoppingIcon: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
      width: 85,

  },
  iconContainer: {
      position: 'relative',
      top: Platform.OS === 'ios' ? 0 : 10,
  },
  circleBTN: {
      position: 'absolute',
      top: -5,
      right: -10,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "#30A08B", // Vert vif pour un bon contraste
      justifyContent: 'center',
      alignItems: 'center',
  },
  badgeText: {
      color: "white",
      fontSize: 12,
      fontWeight: 'bold',
  },
})
//#B17236
//#B2905F
//#30A08B
