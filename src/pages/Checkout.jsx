import { StyleSheet, View, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import CheckoutHeader from "../compoments/checkoutPage/CheckoutHeader";
import CheckoutMain from "../compoments/checkoutPage/CheckoutMain";
import CheckoutFooter from "../compoments/checkoutPage/CheckoutFooter";
import { useNavigation } from "@react-navigation/native";

const Checkout = ({ route }) => {
  const { total, livraison, region } = route.params;
  const checkoutMainRef = useRef(null);
  const [total2, setTotal] = useState(0);
  const [methode, setMethode] = useState(null);
  // const [liv, setLiv] = useState(0);
  const [reduction, setReduction] = useState(0);
  const navigation = useNavigation();

  // Fonction appelée dans CheckoutFooter qui déclenche la fonction de CheckoutMain
  const handleFooterClick = () => {
    // if (checkoutMainRef.current) {
    //   checkoutMainRef.current.Plasser(); // Appelle la fonction dans CheckoutMain
    // }
  };

  const onPaymentSuccess = () => {
    navigation.navigate("Succes");
  };
  const onPaymentFailure = () => {
    navigation.navigate("Home");
  };

  const chgTotal = (t) => {
    setTotal(t);
  };
  const chgReduction = (t) => {
    setReduction(t);
  };

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    email: "",
    numero: "",
    region: "",
    quartier: "",
    description: "",
  });

  return (
    <View style={styles.CheckoutContainer}>
      <CheckoutHeader />
      <ScrollView style={styles.contenu} showsVerticalScrollIndicator={false}>
        <CheckoutMain
          ref={checkoutMainRef}
          chgTotal={chgTotal}
          chgReduction={chgReduction}
          setMethode={setMethode}
          setDeliveryInfo={setDeliveryInfo}
        />
      </ScrollView>
      {total > 0 ? (
        <CheckoutFooter
          apiKey={"pk_f83a240bd0df4393b35a819925863e16"}
          transactionId={"testdetransaction14"}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentFailure={onPaymentFailure}
          onFooterClick={handleFooterClick}
          total={total}
          livraison={livraison}
          region={region}
          reduction={reduction}
          methode={methode}
          deliveryInfo={deliveryInfo}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  CheckoutContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  contenu: {
    marginBottom: 100,
  },
});
