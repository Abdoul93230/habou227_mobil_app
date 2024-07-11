import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Ordi from '../../image/ordinateur14.jpg'

const Produits = ({titre}) => {
  return (
    <View style={styles.container}>
        <View style={styles.product__page}>
            <View style={styles.navProduct}>
                <Text style={styles.title__product}>{titre}</Text>
            </View>
            </View>
            <View style={styles.box__menu}>
                <View style={styles.box__card}>
                <Image source={Ordi} style={styles.image}/>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Footer 1</Text>
                    </View>
                </View>
                <View style={styles.box__card}>
                <Image source={Ordi} style={styles.image}/>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Footer 2</Text>
                    </View>
                </View>
                <View style={styles.box__card}>
                <Image source={Ordi} style={styles.image}/>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Footer 3</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box__menu}>
                <View style={styles.box__card}>
                <Image source={Ordi} style={styles.image}/>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Footer 1</Text>
                    </View>
                </View>
                <View style={styles.box__card}>
                <Image source={Ordi} style={styles.image}/>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Footer 2</Text>
                    </View>
                </View>
                <View style={styles.box__card}>
                <Image source={Ordi} style={styles.image}/>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Footer 3</Text>
                    </View>
                </View>
            </View>
    </View>
  )
}

export default Produits
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 7,
        marginHorizontal: 10,
        backgroundColor: "#f0f0f099",
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20

    },
    product__page: {
        flex: 1,
        // marginHorizontal: 10,
    },
    navProduct: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E1FAFA"
    },
    title__product: {
        fontSize: 18,
        letterSpacing: 1,
        color: '#000',
        marginVertical: 10,
    },
    box__menu: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    box__card: {
        width: "28%",
        height: 115,
        borderRadius: 12,
        backgroundColor: "#DDD",
        marginVertical: 10,
        justifyContent: "flex-end", // Align footer to the bottom
    },
    image: {
        position: "absolute",
        width: "100%",
        height: 115, 
        objectFit: "cover",
        borderRadius: 12,
       
    },
    footer: {
        position: "relative",
        height: 35,
        backgroundColor: "#676767b0",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 5,
    },
    footerText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 12, 
    },
})