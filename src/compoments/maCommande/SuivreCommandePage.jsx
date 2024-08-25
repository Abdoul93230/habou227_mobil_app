import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';

// Liste des articles de la commande
const items = [
    { marque: 'Oriba gaz', taille: '6 kg', quantite: 1, prix: '3 500 F CFA' },
    { marque: 'Oriba gaz', taille: '12 kg', quantite: 1, prix: '11 500 F CFA' }
];

// Calculer le total des prix
const total = items.reduce((sum, item) => sum + parseInt(item.prix.replace(/[^0-9]/g, '' )), 0);
const { width, height } = Dimensions.get('window');
const SuivreCommandePage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.mapBox}>
                <MapView style={styles.map} />
                <ScrollView>
                <View style={styles.menu}>
                    <View style={styles.menuHead}>
                        <Text style={styles.title}>Commande #001</Text>
                        <TouchableOpacity
                            style={styles.edit}
                            onPress={() => { navigation.navigate('Suivie commandes'); }}
                        >
                            <Text style={styles.editText}>En cours</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuMain}>
                        <View style={styles.locationContainer}>
                            <TouchableOpacity style={styles.bgLocation}>
                                <EvilIcons name="location" size={24} color="#FFF" />
                            </TouchableOpacity>
                            <Text style={styles.locationText}>Point de Recharge SAGA</Text>
                        </View>

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
                                            <MaterialIcons name="call" size={17} color="#FF3231" />   
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.callButton}>
                                            <AntDesign name="message1" size={17} color="#FF3231" />
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
                        <View style={styles.locationContainer}>
                            <TouchableOpacity style={styles.bgSucess}>
                                <AntDesign name="checkcircle" size={24} color="#fff" />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.locationText}>Chez Madame 1</Text>
                                <Text style={styles.locationTextPara}>Saga , Niamey, Niger</Text>
                            </View>
                        </View>
                    </View>
                    {[...Array(1)].map((card, index) => (
                    <View style={styles.box} key={index}>
                        <View style={styles.boxHead}>
                          <Text style={styles.boxTitle}>Commande #001</Text>
                          <TouchableOpacity style={styles.edit} onPress={() => {navigation.navigate('Suivie commandes')}}>
                            <Text style={styles.editText}>En cours</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.boxContent}>
                          <View style={styles.boxMain}>
                            <Text style={styles.boxTextBold}>Marque</Text>
                            <Text style={styles.boxTextBold}>Tailles</Text>
                            <Text style={styles.boxTextBold}>Quantité</Text>
                            <Text style={styles.boxTextBold}>Prix</Text>
                          </View>
                          {items.map((item, index) => (
                              <View key={index} style={styles.boxItem}>
                              <Text style={styles.boxText}>{item.marque}</Text>
                              <Text style={styles.boxText}>{item.taille}</Text>
                              <Text style={styles.boxText}>{item.quantite}</Text>
                              <Text style={styles.boxText}>{item.prix}</Text>
                            </View>
                          ))}
                          <View style={styles.boxMainFooter}>
                            <Text style={styles.boxTextFoot}>Total</Text>
                            <Text style={styles.boxTextFoot}>
                              {total.toLocaleString()} F CFA
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
        height: height * 0.3, // Augmenter la hauteur pour la visibilité
    },
    menu: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 12,
        borderRadius: 10,
        padding: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FF3231',
    },
    menuHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    edit: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FF3232',
        borderRadius: 5,
    },
    editText: {
        color: '#fff',
        fontSize: 14,
    },
    bgLocation: {
        backgroundColor: '#FF3232',
        padding: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    menuMain: {
        width: '100%',
        height: height * 0.3,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        marginLeft: 10,
        fontSize: 16,
    },
    locationTextPara: {
        marginLeft: 10,
        fontSize: 11,
    },
    ligneHori: {
        width: width * 0.01,
        height: height * 0.13,
        backgroundColor: '#FF3232',
        marginVertical: 0,
        marginHorizontal: 18,
    },
    pointContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        position: 'absolute',
        width: '100%',
        top: 50,
    },
    point: {
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: '#FF3232',
        marginHorizontal: 13.7,
        zIndex: 100,
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
    },
    subtitle: {
        fontSize: 11,
    },
    cardCall: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#ccc",
        width: '93%',
        borderRadius: 10,
        margin: 5,
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
    },
    callActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
    },
    callButton: {
        padding: 5,
        marginHorizontal: 3,
        marginHorizontal: 3,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    ligneMadame: {
        width: width * 0.01,
        height: '16%',
        backgroundColor: '#8E8E8E',
        marginVertical: 0,
        marginHorizontal: 18,
    },
    contentMadame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        position: 'absolute',
        width: '100%',
        top: 145,
    },
    pointMadame: {
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: '#FF3232',
        marginHorizontal: 13.7,
        zIndex: 130,
    },
    bgSucess: {
        backgroundColor: '#8E8E8E',
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
        borderColor: '#ddd',
        backgroundColor: '#fff',
        marginVertical: 12,        
    },
    boxHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
    },
    boxTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF3232',
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
        borderColor: '#333',
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
        borderColor: '#333',
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
    },
});

export default SuivreCommandePage;




