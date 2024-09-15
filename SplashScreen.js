import { Image, StyleSheet, View } from "react-native"
import LogoPhashScreen from "./src/image/PlashScreen.png"


export default function PlashScreen() {
  return (
    <View style={styles.container}>
      <Image source={LogoPhashScreen} style={styles.image} />

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
  }
})