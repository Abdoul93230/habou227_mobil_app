import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Liste des articles de la commande
const items = [
    { marque: 'Oriba gaz', taille: '6 kg', quantite: 1, prix: '3 500 F CFA' },
    { marque: 'Oriba gaz', taille: '12 kg', quantite: 1, prix: '11 500 F CFA' }
];

// Calculer le total des prix
const total = items.reduce((sum, item) => sum + parseInt(item.prix.replace(/[^0-9]/g, '' )), 0);
const { width, height } = Dimensions.get('window');
const SuivreCommandePage = ({commande,allProducts,recut}) => {
  // console.log(commande?.commande)
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const commandes = commande?.commande


    // useEffect(() => {
    //   axios
    //     .get(`${BackendUrl}/payments/`)
    //     .then((res) => {
    //       setAllPayment(res.data.data);
    //       // console.log(res.data.data[0].reference);
    //     })
    //     .catch((error) => console.log(error));
    // }, []);


    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userEcomme');
          const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
          setUser(userData);
          if (userData) {
            axios
        .get(`${API_URL}/getAddressByUserKey/${userData.id}`)
        .then((shippingAd) => {
          setProfile(shippingAd.data.address)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false)
        });


          }
        } catch (e) {
          console.error('Failed to load user data:', e);
        }
      };

      fetchUserData();
    }, []);




    return (
        <View style={styles.container}>
            <View style={styles.mapBox}>
                {/* <MapView style={styles.map} /> */}
                <ScrollView>
                <View style={styles.menu}>
                    <View style={styles.menuHead}>
                        <Text style={styles.title}>Commande #{commandes._id?.slice(0,16)}... </Text>
                        <TouchableOpacity
                            style={styles.edit}
                            // onPress={() => { navigation.navigate('Suivie commandes'); }}
                        >
                            <Text style={styles.editText}>En cours</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuMain}>
                        <View style={styles.locationContainer}>
                            <TouchableOpacity style={styles.bgLocation}>
                                <EvilIcons name="location" size={24} color="#FFF" />
                            </TouchableOpacity>
                            <Text style={styles.locationText}>Point de Depart SAGA</Text>
                        </View>

                        {/* /////////////////////////////////////// */}

                        <View style={styles.ligneHori1} />
                        <View style={styles.pointContent1}>
                             <View style={styles.point1} />
                             <View>
                                <Text style={styles.titleLivraison}>Commande En Cours de Preparation</Text>
                                {/* <Text style={styles.subtitle}>Reçu par</Text> */}

                             </View>
                        </View>

                        {/* /////////////////////////////////////// */}

                        <View style={styles.ligneHori} />
                        <View style={styles.pointContent}>
                             <View style={styles.point} />
                             <View>
                                <Text style={styles.titleLivraison}>Commande Reçu</Text>
                                <Text style={styles.subtitle}>Reçu par</Text>
                                <View style={styles.cardCall}>
                                    <View style={styles.callHead}>
                                        <View style={styles.imageWrapper}>
                                            <Image source={require("../../image/IHFt.jpg")} style={styles.imageProfile} />
                                        </View>
                                        <Text style={styles.profileName}>Abassa Soumana</Text>
                                    </View>
                                    <View style={styles.callActions}>
                                        <TouchableOpacity style={styles.callButton}>
                                            <MaterialIcons name="call" size={17} color="#30A08B" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.callButton}>
                                            <AntDesign name="message1" size={17} color="#30A08B" />
                                       </TouchableOpacity>
                                    </View>
                                </View>
                             </View>
                        </View>
                        <View style={styles.ligneMadame} />
                        <View style={styles.contentMadame}>
                             <View style={styles.pointMadame} />
                             <View>
                                <Text style={styles.titleLivraison}>Votre Commande est En Cours de Livraison</Text>
                                <Text style={styles.subtitle}>Votre commande va arriver dans environs 8 - 15 min</Text>
                             </View>
                        </View>
                        <View style={styles.ligneMadame} />
                        <View style={styles.locationContainer}>
                            <TouchableOpacity style={styles.bgSucess}>
                                <AntDesign name="checkcircle" size={24} color="#fff" />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.locationText}>Chez {profile?.name}</Text>
                                <Text style={styles.locationTextPara}>{profile?.quartier} , {profile?.region}, Niger</Text>
                            </View>
                        </View>
                    </View>
                    {[...Array(1)].map((card, index) => (
                    <View style={styles.box} key={index}>
                        <View style={styles.boxHead}>
                          <Text style={styles.boxTitle}>Commande #{commande?.commande._id?.slice(0,8)}...</Text>
                          <TouchableOpacity style={styles.edit}>
                            <Text style={styles.editText}>En cours</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.boxContent}>
                          <View style={styles.boxMain}>
                            <Text style={styles.boxTextBold}>Nom</Text>
                            <Text style={styles.boxTextBold}>Tailles</Text>
                            <Text style={styles.boxTextBold}>Quantité</Text>
                            <Text style={styles.boxTextBold}>Prix</Text>
                          </View>
                          {commandes.nbrProduits?.map((item, index) => (
                              <View key={index} style={styles.boxItem}>
                              <Text style={styles.boxText}>
                                {/* {item.marque} */}
                                {
                        allProducts?.find((item2) => item2._id === item.produit)
                          ?.name.slice(0, 10)
                      } ...
                                </Text>
                              <Text style={styles.boxText}>{(item.tailles&&item.tailles[0]!==null)?item.tailles.map((produit) => `${produit}`).join(', '):"none"}</Text>
                              <Text style={styles.boxText}>{item.quantite?item.quantite:"none"}</Text>
                              <Text style={styles.boxText}>
                                {/* {item.prix} */}
                                {allProducts?.find((item2) => item2._id === item.produit)
                        ?.prixPromo
                        ? allProducts?.find(
                            (item2) => item2._id === item.produit
                          )?.prixPromo
                        : allProducts?.find(
                            (item2) => item2._id === item.produit
                          )?.prix}
                                </Text>
                            </View>
                          ))}
                          <View style={styles.boxMainFooter}>
                            <Text style={styles.boxTextFoot}>Total</Text>
                            <Text style={styles.boxTextFoot}>
                              {commandes.prix?.toLocaleString()} F CFA
                            </Text>
                          </View>
                        </View>
                    </View>
                    ))}



            </View>
            </ScrollView>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    mapBox: {
        flex: 1,
        borderRadius: 15,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: height * 0.3,
    },
    menu: {
        width: '100%',
        // borderWidth: 1,
        borderColor: '#B2905F',
        marginVertical: 12,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FFF',
        marginTop:20
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#B17236',
      },
      menuHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      edit: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#B17236',
        borderRadius: 5,
      },
      editText: {
        color: '#FFF',
        fontSize: 14,
      },
      bgLocation: {
        backgroundColor: '#30A08B',
        padding: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      menuMain: {
        width: '100%',
        height: height * 0.38,
        backgroundColor: '#F5F6F8',
        borderRadius: 10,
        padding: 10,
      },
      locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      locationText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
      },
      locationTextPara: {
        marginLeft: 10,
        fontSize: 11,
        color: '#333',
      },
      ligneHori1: {
        width: width * 0.01,
        height: height * 0.035,
        backgroundColor: '#30A08B',
        marginVertical: 0,
        marginHorizontal: 18,
      },
      ligneHori: {
        width: width * 0.01,
        height: height * 0.10,
        backgroundColor: '#B17236',
        marginVertical: 0,
        marginHorizontal: 18,
      },
      pointContent1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        position: 'absolute',
        width: '100%',
        top: 65,
      },
      pointContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        position: 'absolute',
        width: '100%',
        top: 100,
      },
      point1: {
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: '#30A08B',
        marginHorizontal: 15.7,
        zIndex: 100,
        left: 8,
      },
      point: {
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: '#B2905F',
        marginHorizontal: 15.7,
        zIndex: 100,
        left: 8
      },
      imageProfile: {
        width: 30,
        height: 30,
        borderRadius: 20,
        resizeMode: 'cover',
      },
      titleLivraison: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#B17236',
      },
      subtitle: {
        fontSize: 11,
        color: '#B2905F',
      },
      cardCall: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#F9F9F9",
        width: '93%',
        borderRadius: 10,
        margin: 5,
        borderColor: '#B2905F',
        borderWidth: 1,
      },
      callHead: {
        flexDirection: 'row',
        alignItems: "center",
      },
      imageWrapper: {
        width: 30,
        height: 30,
      },
      profileName: {
        fontWeight: '500',
        marginHorizontal: 7,
        fontSize: 12,
        color: '#333', // Couleur sombre pour le nom du profil
      },
      callActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
      },
      callButton: {
        padding: 5,
        marginHorizontal: 3,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#B2905F',
        borderWidth: 1,
      },
      ligneMadame: {
        width: width * 0.01,
        height: '16%',
        backgroundColor: '#B17236', // Couleur secondaire pour la ligne madame
        marginVertical: 0,
        marginHorizontal: 18,
      },
      contentMadame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        position: 'absolute',
        width: '100%',
        top: 210,
      },
      pointMadame: {
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: '#B2905F', // Couleur principale pour les points madame
        marginHorizontal: 15.7,
        zIndex: 130,
        left: 8
      },
      bgSucess: {
        backgroundColor: '#30A08B', // Couleur principale pour le bouton de succès
        padding: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      box: {
        width: '100%',
        maxWidth: 600,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B2905F', // Bordure de boîte
        backgroundColor: '#FFF', // Fond blanc pour les boîtes
        marginVertical: 12,
        // top:  15
      },
      boxHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#B2905F', // Bordure de tête de boîte
        paddingVertical: 8,
      },
      boxTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#B17236', // Couleur principale pour le titre de la boîte
      },
      boxContent: {
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      boxMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        borderBottomWidth: 2,
        borderColor: '#B2905F', // Bordure principale de la boîte
      },
      boxItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
      },
      boxMainFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        borderTopWidth: 2,
        borderColor: '#B2905F', // Bordure du bas de la boîte
        marginTop: 10,
      },
      boxTextBold: {
        color: '#333',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
      },
      boxText: {
        color: '#333',
        flex: 1,
        textAlign: 'center',
      },
      boxTextFoot: {
        color: '#333',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
      },});

export default SuivreCommandePage;




