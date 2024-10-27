import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import Profil from "../../image/ordinateur14.jpg";
import Profil1 from "../../image/PlashScreen.png";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Chat__header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.contenu}>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={25} color="#30A08B"/>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
          <Text style={styles.Chat}>Messagerie</Text>

        <View style={styles.centerContainer}>
          <Image source={Profil1} style={styles.ChatImage} />
        </View>
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
    height: Platform.OS==="ios"? 110 : 75,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F1F1F1',
  },
  contenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    bottom: 0,
    position: "absolute"
  },
  backIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 5,
    fontSize: 17,
    color: '#30A08B',
  },
  Chat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#30A08B',
    marginLeft: 10,
    },
  centerContainer: {
   marginHorizontal: 12,
   backgroundColor:"#0000"
  },
  ChatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#30A08B',
    backgroundColor:"#0000"
  },
});
