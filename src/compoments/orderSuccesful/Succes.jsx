import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const Succes = () => {
  return (
    <View style={styles.container}>
      <View style={styles.succes}>
        <AntDesign name="check" size={40} color="#FF6A69" />
      </View> 
      <Text style={styles.text}>Commande passée !</Text>
      <Text style={styles.paragraphe}>
        Votre commande a été passée avec succès. Pour
        plus de détails, consultez la page de toutes 
        mes commandes sous l'onglet Profil.
      </Text>
      <TouchableOpacity style={styles.btnOrder}>
        <Text style={styles.commandes}>Mes commandes</Text>
        <View style={styles.right}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Succes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  succes: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6A69',
    marginTop: 20,
    textAlign: 'center',
  },
  paragraphe: {
    fontSize: 16,
    color: '#333333',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  btnOrder: {
    width: 210,
    height: 50,
    backgroundColor: '#FF6A69',
    borderRadius: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',

  },
  commandes: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  right: {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
