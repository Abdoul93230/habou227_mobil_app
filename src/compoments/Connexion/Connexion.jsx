import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import LogoForm from '../Connexion/Logo.png';
import { useNavigation } from '@react-navigation/native';
import {EvilIcons, Ionicons, MaterialIcons, Fontisto} from '@expo/vector-icons';


const Connexion = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.formulaire}>
          <Image source={LogoForm} style={styles.logo} />
        <Text style={styles.title}>Connexion</Text>
        </View>
        
        <View style={styles.formInput}>
            <Ionicons name="call-outline" size={24} color="black" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder='Entrer votre email'
              placeholderTextColor='#999'
              keyboardType='email-address'
              autoCapitalize='none'
              style={styles.textInput}
            />
          </View>

        <View style={styles.formInput}>
            <MaterialIcons name="password" size={24} color="black" />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder='Confirmer votre mot de passe'
              secureTextEntry
              placeholderTextColor='#999'
              style={styles.textInput}
            />
          </View>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              onPress={() => setRememberMe(!rememberMe)}
              accessibilityLabel="Rester connecté"
            >
              {rememberMe && <Text style={styles.checkboxMark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Rester connecté</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Vérifier votre numéro de téléphone')}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.formButton} onPress={() => navigation.navigate('Liste des Commandes')}>
          <Text style={styles.btnSignupText}>Confirmer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Vous n’ avez pas un compte?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.formButtonConnecter}  onPress={() => navigation.navigate('Inscription')}>
          <Text style={styles.btnLoginText}>S'inscrire</Text>
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
  innerContainer: {
    alignItems: 'center',
    width: '100%',
  },

  formulaire: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#505151'
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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
    width: '100%',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: width * 0.05,
    height: width * 0.05,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.015,
    backgroundColor: '#FFF',
  },
  checkboxChecked: {
    backgroundColor: '#FF3231',
  },
  checkboxMark: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: '#FFF',
  },
  checkboxLabel: {
    fontSize: width * 0.03,
    color: '#505151',
  },
  forgotPasswordText: {
    fontSize: width * 0.03,
    color: '#FF3231',
  },
  formButton: {
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
  formButtonConnecter: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 17,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#FF3232",
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

export default Connexion;