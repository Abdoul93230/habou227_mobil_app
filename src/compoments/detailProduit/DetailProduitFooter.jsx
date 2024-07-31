import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, Ionicons, Entypo, Feather } from '@expo/vector-icons';

const DetailProduitFooter = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.containerFooter}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Entypo name="share" size={20} color="#FF6A69" />
        <Text style={styles.buttonText}>Partagez ceci</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAddWhatsp}>
        <Ionicons name="logo-whatsapp" size={20} color="#27AA19" />
        <Text style={styles.buttonTextAddWhatsp}>Discuter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAddWhatsp}>
        <FontAwesome name="shopping-cart" size={20} color="#F0F0F0" />
        <Text style={styles.buttonTextAddWhatsp}>Ajouter au panier</Text>
      </TouchableOpacity>

      <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={toggleModal}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.cartTitle}>
                  <Text style={styles.modalTitle}>Partagez ce lien</Text>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.optionRow}>
                    <Feather name='copy' size={20} />
                    <Text style={styles.optionText}>Copier</Text>
                  </View>
                  <TextInput 
                    value='https://chatgpt.com/c/5d656f1d-b488-4705-9fa8-e415ffef9719' 
                    style={styles.textInput} 
                    placeholder="Votre texte ici" 
                  />

                  <View style={styles.optionRow2}>
                    <Text style={styles.optionText}>Via Whatsapp</Text>
                    <FontAwesome name='whatsapp' size={20} />
                  </View>
                </View>
                
                <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default DetailProduitFooter;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  cartTitle: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FF6A69',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalBody: {
    marginVertical: 10,
    width: '100%',
    padding: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  optionRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#FF6A69',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  containerFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderTopWidth: 1,
    elevation: 5,
    backgroundColor: "#c1c1c1ad",
  },
  button: {
    backgroundColor: "#FFFFFF", 
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 7, 
    borderRadius: 30,
  },
  buttonAddWhatsp: {
    backgroundColor: "#FF6A69", 
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 7, 
    borderRadius: 30,
  },
  buttonText: {
    textTransform: "uppercase",
    color: '#000000c2',
    fontSize: 12,
    marginLeft: 5,
  },
  buttonTextAddWhatsp: {
    textTransform: "uppercase",
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
});
