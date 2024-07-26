import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from '../../image/macbook profil.png';
import Invite from '../invitéAmi/Invite';
import { useNavigation } from '@react-navigation/native';
const ProfilePage = () => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [scaleValue] = useState(new Animated.Value(0));

  const handleProfile = () => {
    setModalVisible(true);
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  }
  const changeImg = () => {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.imgProfile}>
          <Image source={Profile} style={styles.image} />
        </View>
        <View style={styles.textProfile}>
          <Text style={styles.name}>Rizky</Text>
          <Text style={styles.email}>rizky@gmail.com</Text>
          <TouchableOpacity style={styles.BtnEdit} onPress={handleProfile}>
            <Text style={styles.editText}>Editer le profil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.cardRow} onPress={() => navigation.navigate("Inviter les amis")}>
          <AntDesign name="addusergroup" size={24} color="black" />
          <Text style={styles.title}>Invite Friends</Text>
          <AntDesign name='right' size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardRow} onPress={() => navigation.navigate('Service Page')}>
          <AntDesign name="questioncircleo" size={24} color="black" />
          <Text style={styles.title}>Service client</Text>
          <AntDesign name='right' size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardRow} onPress={() => navigation.navigate('Commande Page')}>
          <MaterialCommunityIcons name="shopping-outline" size={24} color="black" />
          <Text style={styles.title}>Ma commande</Text>
          <AntDesign name='right' size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardRow} onPress={() => navigation.navigate('Suggestion Page')}>
          <AntDesign name="plussquareo" size={24} color="black" />
          <Text style={styles.title}>Faire une suggestion</Text>
          <AntDesign name='right' size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="none"
        transparent={false} visible={modalVisible} onRequestClose={closeModal} >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
              <View style={styles.imgProfile} onPress={changeImg}>
                <Image source={Profile} style={styles.image} />
              </View>
              <Text style={styles.modalInstruction}>Click me to select image (max 4MB)</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nom:</Text>
                <TextInput style={styles.input} placeholder='Name' />
                <Text style={styles.inputLabel}>Email:</Text>
                <TextInput style={styles.input} placeholder='Email' />
                <Text style={styles.inputLabel}>Téléphone:</Text>
                <TextInput style={styles.input} placeholder='Téléphone' />
                <TouchableOpacity>
                  <Text style={styles.inputLabel}>Changer le mot de passe ?</Text>

                </TouchableOpacity>
              </View>
              
              <View style={styles.submit}>
                <TouchableOpacity onPress={closeModal} style={[styles.button, styles.buttonCancel]}>
                  <Text style={styles.buttonText}>Retour</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonSubmit]}>
                  <Text style={styles.buttonText}>Soumettre</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
       
      </Modal>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  profile: {
    width: '100%',
    height: 120,
    // backgroundColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  imgProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,


  },
  image: {
    width: '100%',
    height: '100%',
  },
  textProfile: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#515C70",
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  BtnEdit: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#C9CDD4',
    borderRadius: 30,
    alignItems: 'center',
    width: 170,
    borderWidth: 1,
    borderColor: '#515C70',
  },
  editText: {
    color: '#515C70',
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },




  ///////////modal change Image /////
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    alignItems: 'center',
  },
  modalInstruction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0,  height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  submit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: '#C9CDD4',
  },
  buttonSubmit: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
    ///////////modal change Image /////

});