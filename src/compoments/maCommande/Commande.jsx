import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

const Commande = () => {
  const [selectedButton, setSelectedButton] = useState(null); // Initial state as null

  return (
    <View style={styles.container}>
      <Text style={styles.commande}>Ma commande</Text>
      <View style={styles.toucheCommande}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              selectedButton === 'En cours' && styles.btnSelected,
            ]}
            onPress={() => setSelectedButton('En cours')}
          >
            <Text style={styles.btnText}>
              En cours <Text style={styles.countText}>(100)</Text>
            </Text>
          </TouchableOpacity>
          {selectedButton === 'En cours' && (
            <View style={styles.notifi}>
              <Text style={styles.btnNoti}>99 +</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              selectedButton === 'Récus' && styles.btnSelected,
            ]}
            onPress={() => setSelectedButton('Récus')}
          >
            <Text style={styles.btnText}>
              Récus <Text style={styles.countText}>(100)</Text>
            </Text>
          </TouchableOpacity>
          {selectedButton === 'Récus' && (
            <View style={styles.notifi}>
              <Text style={styles.btnNoti}>99 +</Text>
            </View>
          )}
        </View>
      </View>

      {/* Page content */}
      {selectedButton === 'En cours' && (
        <View style={styles.pageContent}>
          <View style={styles.cardNoti}>
            <View>
            <Text>Lundi</Text>
            <Text>NBRS Produit</Text>
            <Text>1</Text>
            </View>
            <View></View>
            <View></View>
          </View>
          
        </View>
      )}

      {selectedButton === 'Récus' && (
        <View style={styles.pageContent}>
          <Text style={styles.pageText}>Contenu pour "Récus"</Text>
          {/* Ajoutez des cartes ou d'autres éléments ici */}
        </View>
      )}
    </View>
  );
};

export default Commande;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    padding: width * 0.03, // Responsive padding
  },
  commande: {
    fontSize: width * 0.065, // Responsive font size
    fontWeight: 'bold',
    color: '#515C70',
    marginBottom: width * 0.03, // Responsive margin
  },
  toucheCommande: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: height * 0.02, // Responsive margin
  },
  buttonContainer: {
    position: 'relative',
    flex: 1,
    marginHorizontal: width * 0.02, // Responsive margin
  },
  btn: {
    paddingVertical: height * 0.015, // Responsive padding
    paddingHorizontal: width * 0.04, // Responsive padding
    borderRadius: 30,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSelected: {
    backgroundColor: '#FF6A69',
  },
  btnText: {
    fontSize: width * 0.04, // Responsive font size
    color: '#FFF',
    fontWeight: 'bold',
  },
  countText: {
    fontSize: width * 0.035, // Responsive font size
    color: '#FFF',
  },
  btnNoti: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  notifi: {
    position: 'absolute',
    right: width * -0.02, // Responsive positioning
    top: height * -0.025, // Responsive positioning
    backgroundColor: '#FF6A69',
    borderRadius: 10,
    paddingHorizontal: width * 0.015, // Responsive padding
    paddingVertical: height * 0.005, // Responsive padding
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContent: {
    position: 'absolute',
    bottom: height * 0.05, // Responsive positioning
    left: width * 0.03, // Responsive positioning
    width: '100%',
    height: height * 0.70, // Responsive height
    padding: width * 0.03, // Responsive padding
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,

  },
  pageText: {
    fontSize: width * 0.045, // Responsive font size
    color: '#515C70',
  },
  cardNoti: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 120, 
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  }
});
