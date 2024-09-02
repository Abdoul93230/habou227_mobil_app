


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import LogoForm from '../Connexion/Logo.png';
import { useNavigation } from '@react-navigation/native';
import {Ionicons, MaterialIcons, Feather} from '@expo/vector-icons';

const Inscription = () => {
  const navigation = useNavigation()
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={LogoForm} style={styles.logo} />
        <Text style={styles.title}>Inscription</Text>
        <View style={styles.inputRow}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
               <Ionicons name="call-outline" size={24} color="#505151" />
            </View>
        <TextInput
          style={styles.input}
          placeholder="Entrer votre Numéro de téléphone"
          value={phoneNum}
          onChangeText={setPhoneNum}
          keyboardType="email-address"
          accessibilityLabel="Entrer votre Numéro de téléphone"
        />
        </View>
        <View style={styles.inputRow}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
               <Feather name="mail" size={24} color="#505151" />
            </View>
        <TextInput
          style={styles.input}
          placeholder="Entrer votre email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          accessibilityLabel="Entrer votre email"
        />
        </View>

        <View style={styles.inputRow}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
               <MaterialIcons name="password" size={24} color="#505151" />
            </View>
        <TextInput
          style={styles.input}
          placeholder="Entrer votre mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Entrer encore votre mot de passe"
        />
        </View>
        <View style={styles.inputRow}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
               <MaterialIcons name="password" size={24} color="#505151" />
            </View>
        <TextInput
          style={styles.input}
          placeholder="Entrer votre mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          accessibilityLabel="Entrer encore votre mot de passe"
        />
        </View>

        
        <TouchableOpacity style={styles.btnSignup} onPress={() => navigation.navigate('OTP')}>
          <Text style={styles.btnSignupText}>Confirmer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Vous avez déjà un compte ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Connexion')}>
          <Text style={styles.btnLoginText}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff00',
    padding: width * 0.03,
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
    color: "#4c4b4b",
    textAlign: 'center',
    letterSpacing: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
},
input: {

    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  
},
  checkboxMark: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: '#FFF',
  },
  btnSignup: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 17,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#F7D946",
    alignItems: 'center',
    width: '100%',
  },
  btnSignupText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#FFF',
  },
  btnLogin: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 17,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#FF3231",
    alignItems: 'center',
    width: '100%',
  },
  btnLoginText: {
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    color: '#FFF',
  },
  navButton: {
    marginTop: height * 0.015, 
    alignItems: 'center',
    marginBottom: height * 0.015, 
  },
  navButtonText: {
    color: '#505151',
    fontSize: width * 0.03,
  },
});

export default Inscription;


