import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Feather, EvilIcons, Ionicons } from '@expo/vector-icons';
import Items from "../../image/macbook cote.png";

const CheckoutMain = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const handleButtonPress = () => {
    Alert.alert("Voir les données", "Étudiant\n+227 85822480\nCodeloccol\ndelomodibo@gmail.com\n+227 85822480");
  };

  const handleApplyPromoCode = () => {
    // Logic to apply the promo code
    Alert.alert("Code promotionnel", `Le code ${promoCode} a été appliqué!`);
    setModalVisible(false);
  };

  return (
    <View style={styles.CheckoutMain}>
      <Text style={styles.title}>Vérification</Text>
      <Text style={styles.paraMain}>Adresse de livraison</Text>
      <View style={styles.card}>
        <View style={styles.donner}>
          <Text style={styles.para}>Name : Étudiant</Text>
        </View>
        <View style={styles.donner}>
          <Text style={styles.para}>Region : Niamey</Text>
        </View>
        <View style={styles.donner}>
          <Text style={styles.para}>Quartier : Codeloccol</Text>
        </View>
        <View style={styles.donner}>
          <Text style={styles.para}>Email : delomodibo@gmail.com</Text>
        </View>
        <View style={styles.donner}>
          <Text style={styles.para}>Tel : +227 85822480</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Voir les données</Text>
      </TouchableOpacity>
      
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>Mode de paiement</Text>
        <TouchableOpacity>
          <View style={styles.cardMoney}>
            <Feather name="credit-card" size={24} color="#FF6A69" />
            <Text style={styles.paraMoney}>Mobile Money<Text> +227 85822480</Text></Text>
            <View style={styles.IconCircle}>
              <EvilIcons name="arrow-right" size={30} color="#FFF" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {[1, 2, 3, 4].map((item, index) => (
        <View key={index} style={styles.cardItem}>
          <View style={styles.cardItemContainer}>
            <View style={styles.circleItem}>
              <Image source={Items} style={styles.image} />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.nike}>Nike air</Text>
              <Text style={styles.CFAPrix}>CFA 11000</Text>
            </View>
       
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.IconCircle}>
                  <EvilIcons name="plus" size={30} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>1</Text>
                <TouchableOpacity style={styles.IconCircle}>
                  <EvilIcons name="minus" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
          
           
          </View>
        </View>
      ))}
      
      <TouchableOpacity style={styles.proMo} onPress={() => setModalVisible(true)}>
        <View style={styles.cardMoney}>
          <Feather name="credit-card" size={24} color="#FF6A69" />
          <Text style={styles.paraMoney}>Ajouter un code promotionnel</Text>
          <View style={styles.IconCircle}>
            <EvilIcons name="arrow-right" size={30} color="#FFF" />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
       <TouchableWithoutFeedback onPress={handleApplyPromoCode}>
            <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter un code promotionnel</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrer le code"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleApplyPromoCode}>
              <Text style={styles.modalButtonText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback> 
    
      </Modal>
    </View>
  );
}

export default CheckoutMain;

const styles = StyleSheet.create({
  CheckoutMain: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 7,
    justifyContent: 'flex-start',
  },
  title: {
    marginHorizontal: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: "#515C70",
  },
  paraMain: {
    marginHorizontal: 1,
    fontSize: 16,
    textTransform: "uppercase",
    color: "#515C70",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  donner: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  para: {
    color: "#000",
  },
  button: {
    backgroundColor: '#FF6A69',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentContainer: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  paymentText: {
    fontSize: 16,
    color: "#515C70",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardMoney: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 2,
  },
  paraMoney: {
    fontSize: 16,
    color: "#515C70",
    flex: 1,
    marginHorizontal: 10,
  },
  IconCircle: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6A69",
    borderRadius: 15,
  },
  cardItem: {
    backgroundColor: '#FFFF',
    padding: 15,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 2,
  },
  cardItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  circleItem: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6A69',
    borderRadius: 50,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  itemInfo: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 20
  },
  nike: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#515C70"
  },
  CFAPrix: {
    fontSize: 16,
    color: '#FF6A69',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: "#515C70"
  },
  proMo: {
    marginTop: 20
  },
  trash: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    width: 150,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#515C70"
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#515C70"
  },
  modalButton: {
    backgroundColor: '#FF6A69',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
