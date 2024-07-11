import { StyleSheet, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const IconFooter = () => {
  return (
    <View style={styles.icon}>
        <AntDesign name="up" size={24} color="white" style={styles.iconCircle} />
    </View>
  );
};

export default IconFooter;

const styles = StyleSheet.create({
    icon: {
        position: 'relative',
       
    },
    iconCircle: {
        position: "absolute",
        top: 0,
        start: 0
    }
});
