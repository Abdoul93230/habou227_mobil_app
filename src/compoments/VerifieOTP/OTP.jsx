import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, TextInput } from 'react-native';
import LogoForm from '../Connexion/Logo.png';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OTP = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(['', '', '', '', '',]); // Array to store OTP digits
    const inputs = useRef([]);

    const handleTextChange = (text, index) => {
        // Keep only numeric characters
        const numericText = text.replace(/\D/g, '');
        const updatedOtp = [...otp];
        updatedOtp[index] = numericText;
        setOtp(updatedOtp);

        // Move to next input if text is entered
        if (numericText && index < otp.length - 1) {
            inputs.current[index + 1].focus();
        }
        console.log(updatedOtp.join(''));
    };

    const handleFilled = () => {
        // Ensure the OTP is valid when filled
        const otpCode = otp.join('');
        if (otpCode.length === 5) {
            console.log(`OTP is ${otpCode}`);
        } else {
            console.log('Invalid OTP');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Inscription')}>
                    <Ionicons name="chevron-back-outline" size={24} color="#FF3232" />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', marginLeft: 3}}>Vérifier </Text>
                    <Text style={{fontWeight: 'bold', marginLeft: 3}}> +227 970000001</Text>
                </View>
                
            </View>
            <View style={styles.innerContainer}>
                <Image source={LogoForm} style={styles.logo} />
                <Text style={styles.title}>
                    Entrer le code à 6 chiffres qui a été envoyé {'\n'} à votre numéro
                </Text>
                <View style={styles.otpInputContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => inputs.current[index] = ref}
                            style={styles.otpInput}
                            keyboardType='number'
                            maxLength={1}
                            onChangeText={(text) => handleTextChange(text, index)}
                            onBlur={handleFilled}
                            value={digit}
                            textAlign='center'
                            autoFocus={index === 0}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.btnConfirm} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.btnConfirmText}>Envoyer le code OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCodeOTP}>
                    <Text style={styles.btnCodeOPTText}>Renvoyer le code</Text>
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
    },
    header: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
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
        fontSize: width * 0.03,
        fontWeight: 'bold',
        marginBottom: height * 0.015,
        textAlign: 'center',
        color: '#505151',
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: height * 0.03,
    },
    otpInput: {
        width: width * 0.1,
        height: width * 1/8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        margin: 5,
        fontSize: 18,
        textAlign: 'center',
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
        fontSize: width * 0.03,
        fontWeight: 'bold',
        color: '#FFF',
    },
    btnCodeOTP: {
        marginTop: 10,
    },
    btnCodeOPTText: {
        fontSize: width * 0.03,
        fontWeight: 'bold',
        color: '#FF3231',
    },
});

export default OTP;
