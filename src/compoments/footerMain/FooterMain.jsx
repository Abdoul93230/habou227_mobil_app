import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

const FooterMain = () => {
  // Fonction de gestion des clics sur les textes
  const handlePress = (text) => {
    console.log(`${text} pressed`);
    // Ici vous pouvez ajouter la logique pour chaque texte
  };

  return (
    <View style={styles.container}>
      {/* First Footer */}
      <View style={styles.footerMain}>
        <TouchableOpacity style={styles.footerButton}>
          <AntDesign name="up" size={24} color="#FFF" />
          <Text style={styles.footerText}>BACK TO TOP</Text>
        </TouchableOpacity>
      </View>

      {/* Second Footer */}
      <View style={styles.footerSecondary}>
        <View style={{borderBottomWidth: 1, borderColor: '#F0F0F0',}}>
        <View style={styles.footerRow}>
          <TouchableOpacity onPress={() => handlePress('HELP CENTER')}>
            <Text style={styles.footerSecondaryText}>HELP CENTER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('CONTACT US')}>
            <Text style={styles.footerSecondaryText}>CONTACT US</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('TERMS & CONDITIONS')}>
            <Text style={styles.footerSecondaryText}>TERMS & CONDITIONS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerRow}>
          <TouchableOpacity onPress={() => handlePress('PRIVACY NOTICE')}>
            <Text style={styles.footerSecondaryText}>PRIVACY NOTICE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('COOKIE NOTICE')}>
            <Text style={styles.footerSecondaryText}>COOKIE NOTICE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('BECOME A SELLER')}>
            <Text style={styles.footerSecondaryText}>BECOME A SELLER</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerRow}>
          <TouchableOpacity onPress={() => handlePress('REPORT A PRODUCT')}>
            <Text style={styles.footerSecondaryText}>REPORT A PRODUCT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('SHIP YOUR PACKAGE')}>
            <Text style={styles.footerSecondaryText}>SHIP YOUR PACKAGE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('ANYWHERE IN NIGER')}>
            <Text style={styles.footerSecondaryText}>ANYWHERE IN NIGER</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerRow}>
          <TouchableOpacity onPress={() => handlePress('HABOU ANNIVERSARY 2023')}>
            <Text style={styles.footerSecondaryText}>HABOU ANNIVERSARY 2023</Text>
          </TouchableOpacity>
        </View>
        </View>

        
      </View>
      <View style={styles.footerRight}>
            <Text style={styles.footerSecondaryTexte}>All Rights Reserved</Text>
        </View>
    </View>
  );
};

export default FooterMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#2F2F30',
    paddingVertical: 8,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: '#FFF',
    fontSize: 13,
  },
  footerSecondary: {
    width: '100%',
    backgroundColor: '#131313',
    paddingVertical: 15,
    paddingHorizontal: 10,
    
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Utilisez space-around pour une meilleure répartition des éléments
    marginBottom: 15,
  },
  footerSecondaryText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  footerRight: {
    width: '100%',
    padding: 5,
    backgroundColor: "#2F2F30"
  },
  footerSecondaryTexte: {
    color: "#808080",
    fontSize: 12,
    textAlign: 'center',
  }
});