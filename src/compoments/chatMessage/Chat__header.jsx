import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Profil from "../../image/ordinateur14.jpg";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Chat__header = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          style={styles.backIcon}
        >
          <AntDesign name="left" size={24} color="#FF6A69"/>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        <View style={styles.centerContainer}>
          <Image source={Profil} style={styles.ChatImage} />
        </View>
      </View>
    </View>
  );
};

export default Chat__header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  header: {
    width: '100%',
    height: 120, // Reduced height to better fit typical header sizes
    borderBottomWidth: 1,
    borderColor: '#ccc', // Lighter border color for a subtle effect
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 25
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#FF6A69',
    
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    top: 25,
  },
});
