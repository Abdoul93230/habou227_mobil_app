import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Footer from '../compoments/footer/Footer'
import Header__page from '../compoments/header/Header__page'
import ProfilePage from '../compoments/profilePage/ProfilePage'

const Profile = () => {
  return (
    <View style={styles.container}>
        <Header__page />
          <ProfilePage />
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