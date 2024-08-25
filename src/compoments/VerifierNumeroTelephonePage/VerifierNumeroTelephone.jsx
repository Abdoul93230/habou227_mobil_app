import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import LogoForm from '../Connexion/Logo.png';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VerifierNumeroTelephone = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Connexion')}>
                    <Ionicons name="chevron-back-outline" size={24} color="#FF3232" />
                </TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
                <Image source={LogoForm} style={styles.logo} />
                <Text style={styles.title}>
                    Vérifier votre{'\n'}numéro  de téléphone
                </Text>
                <View style={styles.formInput}>
                    <MaterialIcons name="password" size={24} color="black" />
                    <TextInput
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder='Confirmer votre mot de passe'
                      secureTextEntry
                      placeholderTextColor='#999'
                      style={styles.textInput}
                    />
                </View>
                

                <TouchableOpacity style={styles.btnConfirm} onPress={() => navigation.navigate('Changez votre mot de passe')}>
                    <Text style={styles.btnConfirmText}>Confirmer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: width * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        backgroundColor: '#F7D946',
        padding: 8,
        borderRadius: 5,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: width * 0.65, 
        height: width * 0.20,
        marginBottom: height * 0.02,
    },
    title: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginBottom: height * 0.015,
        textAlign: 'center',
        color: '#505151',
    },
    formInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 12,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#F8F8F8', 
     
    },
    textInput: {
        flex: 1, 
        fontSize: 16,
        color: '#000',
        marginLeft: 10, 
      },
    btnConfirm: {
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 17,
        borderRadius: 15,
        marginBottom: 15,
        backgroundColor: "#F7D946",
        alignItems: 'center',
        width: '100%',
    },
    btnConfirmText: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default VerifierNumeroTelephone;
