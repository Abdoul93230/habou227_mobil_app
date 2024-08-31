import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import LogoForm from '../Connexion/Logo.png';
import { useNavigation } from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';

const ChangePage = () => {
  const navigation = useNavigation()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={LogoForm} style={styles.logo} />
        <Text style={styles.title}>Changez votre mot {'\n'} de passe</Text>
       

        <View style={styles.formInput}>
            <MaterialIcons name="password" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder='Entrer votre mot de passe'
                secureTextEntry
                placeholderTextColor='#999'
                style={styles.textInput}
              />
            </View>
        <View style={styles.formInput}>
            <MaterialIcons name="password" size={24} color="black" />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder='Entrer encore votre mot de passe'
                secureTextEntry
                placeholderTextColor='#999'
                style={styles.textInput}
                accessibilityLabel='Entrer encore votre mot de passe'
                
              />
            </View>
        
        <TouchableOpacity style={styles.btnSignup} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.btnSignupText}>Confirmer</Text>
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
  forgotPasswordText: {
    fontSize: width * 0.03,
    color: '#FF3231',
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
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: '#FFF',
  },

});

export default ChangePage;









