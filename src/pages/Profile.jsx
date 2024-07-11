import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Footer from '../compoments/footer/Footer'
import Header__page from '../compoments/header/Header__page'

const Profile = () => {
  return (
    <View style={styles.container}>
        <Header__page />
      <Text>Profile</Text>

      <Footer />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    contenu: {
      marginBottom: 90,
    },
  });