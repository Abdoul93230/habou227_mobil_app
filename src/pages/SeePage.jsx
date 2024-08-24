import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SeeAll from '../compoments/SeeAllPage/SeeAll'


const SeePage = () => {
  return (
    <View style={styles.container}>
      <SeeAll />
    </View>
  )
}

export default SeePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 90,
  }
})