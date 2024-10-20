import { Image, StyleSheet, View,Text } from "react-native"
import LogoPhashScreen from "./src/image/PlashScreen.png"


export default function PlashScreenConnexion() {
  return (
    <View style={styles.container}>
      <Image source={LogoPhashScreen} style={styles.image} />
      <Text style={styles.text}>Pas de connexion internet</Text>
      <Text style={styles.subtext}>Vérifiez votre connexion réseau</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    width: "100%",
    height: "100%",
    zIndex: 1000,
    position:"relative",
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: "cover",
  },
  text:{
    color:"#B2905F"
  },
  subtext:{
    color:"#30A08B"
  },
})
