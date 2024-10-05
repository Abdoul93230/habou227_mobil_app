import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Footer from '../compoments/footer/Footer'
import Header__page from '../compoments/header/Header__page'
import MorePage from '../compoments/morePage/MorePage'

const More = () => {
  return (
    <View style={styles.container}>
        <Header__page />
        {/* <ScrollView> */}
          <MorePage />
        {/* </ScrollView> */}


      <Footer />
    </View>
  )
}

export default More

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    contenu: {
      marginBottom: 90,
    },
  });
