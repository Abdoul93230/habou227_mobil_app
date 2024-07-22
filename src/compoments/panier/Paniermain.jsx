import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Macbook from "../../image/macbook cote.png";
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import PanierFooter from './PanierFooter';

const Paniermain = () => {

  return (
    <View style={styles.container}>
         {[1, 2, 3, 4, 5, 6, 7].map((card, index) => (
            
               <View key={index} style={styles.panierCart}>
               <View style={styles.panierImg}>
                 <Image source={Macbook} style={styles.image} />
               </View>
               <View style={styles.panierText}>
                 <Text style={styles.panierText1}>MacBook Pro 13</Text>
                 <Text style={styles.panierText3}>CFA 5000</Text>
                 <View style={styles.countNumber}>
                   <TouchableOpacity>
                     <EvilIcons name="plus" size={24} color="black" />
                   </TouchableOpacity>
                   <Text style={styles.countNumberText}>1</Text>
                   <TouchableOpacity>
                     <EvilIcons name="minus" size={24} color="black" />
                   </TouchableOpacity>
                 </View>
                 <View style={styles.result}>
                   <Text style={styles.prix}>TT 15000</Text>
                 </View>
               </View>
               <TouchableOpacity style={styles.IconCircle}>
                <Ionicons name="trash" size={20} color="#FFF" />
              </TouchableOpacity>
             </View>
         ))}
    </View>
  );
};

export default Paniermain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 12,   
    marginBottom: 190
  },
  panierCart: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  panierImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  panierText: {
    flex: 1,
    marginLeft: 20,
  },
  panierText1: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  panierText3: {
    fontSize: 16,
    color: '#FF6A69',
  },
  countNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  countNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 10,
    
  },
  prix: {
    color: '#FF6A69',
    fontSize: 16,
    fontWeight: 'bold',
  },
  IconCircle: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6A69",
    borderRadius: 15,
    marginRight: 12
  },
});
