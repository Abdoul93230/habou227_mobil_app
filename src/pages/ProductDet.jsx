import { StyleSheet, View, ScrollView, SafeAreaView, Text, TouchableOpacity, Modal, TextInput, Button  } from 'react-native';
import React, { useState } from 'react';
import DetailProduit from "../compoments/detailProduit/DetailProduit";
import DetailProduitFooter from '../compoments/detailProduit/DetailProduitFooter';
import DetailProduitMain from '../compoments/detailProduit/DetailProduitMain';
import {AntDesign} from '@expo/vector-icons';
const ProductDet = () => {
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleCommentBoxToggle = () => {
    setIsCommentBoxVisible(!isCommentBoxVisible);
  };
  return (
    <View style={styles.container}>
      <DetailProduit />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DetailProduitMain />
      </ScrollView>
      <DetailProduitFooter />


      <TouchableOpacity style={styles.commenteBox} onPress={handleCommentBoxToggle}>
        <View style={styles.commente}>
          <Text style={{fontSize: 12}}>Commenter?</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={isCommentBoxVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.commentCard}>
          <Text style={styles.cardTitle}>Ajouter un commentaire</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Écrire un commentaire..."
          />
          <View style={styles.note}>
            <Text style={styles.noteProduit}>Notez ce produit</Text>
            
            <View style={styles.satrIcon}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <AntDesign name='staro' size={18} color={star <= rating ? '#FF6A69' : 'black'} />
            </TouchableOpacity>
          ))}
        </View>
          </View>
          <View style={styles.btn}>
            <Button title="Envoyer" onPress={() => { /* Ajoutez votre logique d'envoi de commentaire ici */ }} />
            <Button title="Fermer" onPress={handleCommentBoxToggle} />
          </View>
          
        </View>
      </View>
</Modal>
    </View>
    
  );
};

export default ProductDet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
  },
  commenteBox: {
    position: 'absolute',
    transform: [{ translateY: 330 }], // Adjust this value to center the box vertically
  },
  commente: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {  width: 2, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  commentCard: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
  fontSize: 18,
  marginBottom: 10,
},
  textInput: {
  width: '100%',
  height: 100,
  borderColor: '#CCCCCC',
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  textAlignVertical: 'top', // Ensures the text starts at the top for multiline input
},
note: {
  fontSize: 14,
  color: '#999999',
  marginBottom: 10,
},
satrIcon: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "40%",
  marginLeft:8,
  marginTop:6
},
noteProduit: {
  fontSize: 18,
  textAlign: "center",
},
btn: {
  width: "90%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}
});







