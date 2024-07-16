import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';

const DetailProduitFooter = () => {
  return (
    <View style={styles.containerFooter}>
      <TouchableOpacity style={styles.button}>
        <Entypo name="share" size={20} color="#FF6A69" />
        <Text style={styles.buttonText}>Share this</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAddWhatsp}>
        <Ionicons name="logo-whatsapp" size={20} color="#27AA19" />
        <Text style={styles.buttonTextAddWhatsp}>Discuss</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAddWhatsp}>
        <FontAwesome name="shopping-cart" size={20} color="#F0F0F0" />
        <Text style={styles.buttonTextAddWhatsp}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailProduitFooter;

const styles = StyleSheet.create({
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
    backgroundColor: "#c1c1c1ad"
  },
  button: {
    backgroundColor: "#FFFFFF", 
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 7, 
    borderRadius: 30
  },
  buttonAddWhatsp: {
    backgroundColor: "#FF6A69", 
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 7, 
    borderRadius: 30
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
