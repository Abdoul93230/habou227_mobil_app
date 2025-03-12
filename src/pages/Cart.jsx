import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import Footer from "../compoments/footer/Footer";
import Header__page from "../compoments/header/Header__page";
import Paniermain from "../compoments/panier/Paniermain";
import PanierFooter from "../compoments/panier/PanierFooter";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [livraison, setLivraison] = useState(0);
  const [region, setRegion] = useState(null);
  const chgTotal = (t) => {
    setTotal(t);
  };
  return (
    <View style={styles.container}>
      <Header__page />
      <ScrollView
        style={{ marginBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <Paniermain
          chgTotal={chgTotal}
          setLivraison={setLivraison}
          setRegion={setRegion}
        />
      </ScrollView>
      {total > 0 ? (
        <PanierFooter total={total} livraison={livraison} region={region} />
      ) : (
        <></>
      )}
      <Footer />
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
