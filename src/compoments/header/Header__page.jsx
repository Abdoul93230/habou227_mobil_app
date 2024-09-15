import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated,Platform,DeviceEventEmitter } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import Profil from "../../image/logo.png";
import io from "socket.io-client";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from "@env";

const BackendUrl = `${API_URL}`;
const socket = io(BackendUrl);
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
    <Image source={Profil} style={styles.image} />
    <View style={styles.shoppingIcon}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ChatMessage')}>
        <Entypo name='circle' size={24} color="black" />
        <View style={styles.circleBTN}>
          <Text style={styles.badgeText}>{nbr > 0 ? allMessage.length : 0}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Cart")}>
        <Feather name="shopping-cart" size={24} color="black" />
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
    header: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 12,
        width: "100%",
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: "#000",
        paddingBottom: 10,
        backgroundColor: "#DDD"
      },
      image: {
        width: 95,
        height: 50,
        resizeMode: 'contain',
      },
      shoppingIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        width: 85,
      },
      iconContainer: {
        position: 'relative',
      },
      circleBTN: {
        position: 'absolute',
        top: -5,
        right: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#FF6A69",
        justifyContent: 'center',
        alignItems: 'center',
      },
      badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: 'bold',
      },
})
