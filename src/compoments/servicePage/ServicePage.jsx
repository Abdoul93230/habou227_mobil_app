import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header__page from '../header/Header__page'

const ServicePage = () => {
  return (
    <View style={styles.container}>
      <Header__page />
      <View style={styles.conatinerMain}>
            <Text style={{fontSize: 25}}>La page seras bientôt disponible !</Text>
      </View>
    </View>
  )
}

export default ServicePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    conatinerMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})