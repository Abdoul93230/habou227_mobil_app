import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const PanierFooter = ({ total, livraison, region }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerDetails}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>
            CFA {livraison ? total - livraison : total}
          </Text>
          <Text style={styles.shippingInfo}>
            {livraison && region
              ? `Livraison : ${livraison} ${region}`
              : livraison
              ? `Livraison : ${livraison}`
              : "Livraison : vous seriez contacter pour le prix"}
          </Text>
        </View>
      </View>
      <View style={styles.footerAction}>
        <TouchableOpacity
          style={styles.buttonCheck}
          onPress={() =>
            navigation.navigate("Checkout", {
              total: total,
              livraison: livraison,
              region: region,
            })
          }
        >
          <MaterialIcons
            name="shopping-cart-checkout"
            size={22}
            color="white"
          />
          <Text style={styles.buttonText}>Vérification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PanierFooter;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 80,
    width: "100%",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  footerDetails: {
    flex: 2,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B2905F",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#30A08B",
    marginVertical: 4,
  },
  shippingInfo: {
    fontSize: 14,
    color: "#B2905F",
  },
  footerAction: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCheck: {
    flexDirection: "row",
    backgroundColor: "#30A08B",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
