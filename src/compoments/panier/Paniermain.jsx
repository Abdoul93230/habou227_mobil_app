import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  EvilIcons,
  Ionicons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";

const PanierMain = ({ chgTotal, setLivraison, setRegion }) => {
  const navigation = useNavigation();
  const [expandedGroups, setExpandedGroups] = useState({});
  const [cart, setCart] = useState({
    items: [],
    groupedItems: {},
    customerRegion: "Niamey",
    country: "Niger",
    isLoading: true,
  });

  const products = useSelector((state) => state.products.data);

  // Fonction pour grouper les articles par produit
  const groupCartItems = (items) => {
    return items.reduce((groups, item) => {
      const productData = products?.find((prod) => prod._id === item._id);
      if (!productData) return groups;

      const productId = item._id;
      if (!groups[productId]) {
        groups[productId] = {
          productId,
          name: productData.name,
          image: productData.image1,
          shipping: productData.shipping,
          variants: [],
          totalQuantity: 0,
        };
      }

      groups[productId].variants.push({
        ...item,
        productId: item._id,
        colors: item.colors || [],
        sizes: item.sizes || [],
        price:
          productData.prixPromo > 0 ? productData.prixPromo : productData.prix,
        originalPrice: productData.prix,
        hasPromo: productData.prixPromo > 0,
      });

      groups[productId].totalQuantity += item.quantity;

      // Calculer les frais d'expédition
      const shippingFees = calculateShipping(
        groups[productId],
        cart.customerRegion
      );
      groups[productId] = {
        ...groups[productId],
        ...shippingFees,
      };

      return groups;
    }, {});
  };

  // Calcul des frais d'expédition pour un groupe
  const calculateShipping = (group, region) => {
    if (!group.shipping?.zones?.length) {
      return { baseShippingFee: 1000, weightShippingFee: 0 };
    }

    const customerZone =
      group.shipping.zones.find(
        (zone) => zone.name.toLowerCase() === region.toLowerCase()
      ) || group.shipping.zones[0];

    if (customerZone) {
      const baseShippingFee = customerZone.baseFee || 0;
      const totalWeightFee = group.variants.reduce((total, variant) => {
        return (
          total +
          (group.shipping.weight || 0) *
            (customerZone.weightFee || 0) *
            variant.quantity
        );
      }, 0);

      return { baseShippingFee, weightShippingFee: totalWeightFee };
    }

    return { baseShippingFee: 1000, weightShippingFee: 0 };
  };

  // Calculer le total du panier
  const calculateTotal = (groupedItems) => {
    let total = 0;
    let liv = 0;
    Object.values(groupedItems).forEach((group) => {
      // Ajouter le prix des articles
      group.variants.forEach((variant) => {
        total += variant.price * variant.quantity;
      });
      // Ajouter les frais d'expédition
      total += group.baseShippingFee + group.weightShippingFee;
      liv += group.baseShippingFee + group.weightShippingFee;
    });
    chgTotal(total);
    setLivraison(liv);
    return total;
  };

  // Mettre à jour le stockage local
  const updateStorage = async (groupedItems) => {
    const flattenedItems = Object.values(groupedItems).flatMap((group) =>
      group.variants.map((variant) => ({
        _id: variant.productId,
        quantity: variant.quantity,
        colors: variant.colors,
        sizes: variant.sizes,
      }))
    );

    await AsyncStorage.setItem("panier", JSON.stringify(flattenedItems));
    return flattenedItems;
  };

  // Fonction auxiliaire pour vérifier si deux variantes sont identiques
  const areVariantsEqual = (variant1, variant2) => {
    return (
      variant1.productId === variant2.productId &&
      JSON.stringify(variant1.colors) === JSON.stringify(variant2.colors) &&
      JSON.stringify(variant1.sizes) === JSON.stringify(variant2.sizes)
    );
  };

  // Modifier la quantité d'un article
  const updateQuantity = async (productId, variantIndex, delta) => {
    setCart((prevCart) => {
      const updatedGroups = { ...prevCart.groupedItems };
      const group = updatedGroups[productId];
      const variant = group.variants[variantIndex];
      const newQuantity = Math.max(1, variant.quantity + delta);

      if (newQuantity === 0) {
        // Supprimer la variante
        group.variants.splice(variantIndex, 1);
        if (group.variants.length === 0) {
          delete updatedGroups[productId];
        }
      } else {
        variant.quantity = newQuantity;
        group.totalQuantity = group.variants.reduce(
          (total, v) => total + v.quantity,
          0
        );

        // Recalculer les frais d'expédition
        const shippingFees = calculateShipping(group, prevCart.customerRegion);
        updatedGroups[productId] = { ...group, ...shippingFees };
      }

      // Mettre à jour le stockage
      updateStorage(updatedGroups).then((flattenedItems) => {
        calculateTotal(updatedGroups);
      });

      return {
        ...prevCart,
        groupedItems: updatedGroups,
      };
    });
  };

  // Supprimer un article
  const removeItem = async (productId, variantIndex) => {
    setCart((prevCart) => {
      const updatedGroups = { ...prevCart.groupedItems };
      const group = updatedGroups[productId];

      if (!group) return prevCart;

      // Supprimer uniquement la variante spécifique
      const updatedVariants = [...group.variants];
      updatedVariants.splice(variantIndex, 1);

      if (updatedVariants.length === 0) {
        // Si c'était la dernière variante, supprimer tout le groupe
        delete updatedGroups[productId];
      } else {
        // Mettre à jour le groupe avec les variantes restantes
        const updatedGroup = {
          ...group,
          variants: updatedVariants,
          totalQuantity: updatedVariants.reduce(
            (total, v) => total + v.quantity,
            0
          ),
        };

        // Recalculer les frais d'expédition pour le groupe mis à jour
        const shippingFees = calculateShipping(
          updatedGroup,
          prevCart.customerRegion
        );
        updatedGroups[productId] = {
          ...updatedGroup,
          ...shippingFees,
        };
      }

      // Mettre à jour le stockage
      updateStorage(updatedGroups).then(() => {
        calculateTotal(updatedGroups);
      });

      showToast("success", "Produit supprimé du panier");

      return {
        ...prevCart,
        groupedItems: updatedGroups,
      };
    });
  };

  const showToast = (type, message) => {
    Toast.show({
      type,
      text1: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  // Charger le panier initial
  // useEffect(() => {
  //   const loadCart = async () => {
  //     try {
  //       const cartData = await AsyncStorage.getItem("panier");
  //       const parsedCart = cartData ? JSON.parse(cartData) : [];
  //       const groupedItems = groupCartItems(parsedCart);

  //       setCart((prev) => ({
  //         ...prev,
  //         items: parsedCart,
  //         groupedItems,
  //         isLoading: false,
  //       }));

  //       calculateTotal(groupedItems);
  //     } catch (error) {
  //       console.error("Error loading cart:", error);
  //       showToast("error", "Erreur lors du chargement du panier");
  //       setCart((prev) => ({ ...prev, isLoading: false }));
  //     }
  //   };

  //   loadCart();
  // }, [products]);

  // Initialisation avec détection de la localisation
  useEffect(() => {
    const initCart = async () => {
      try {
        await detectUserLocation();
        const cartData = await AsyncStorage.getItem("panier");
        const parsedCart = cartData ? JSON.parse(cartData) : [];
        const groupedItems = groupCartItems(parsedCart);

        setCart((prev) => ({
          ...prev,
          items: parsedCart,
          groupedItems,
          isLoading: false,
        }));

        calculateTotal(groupedItems);
      } catch (error) {
        console.error("Error initializing cart:", error);
        showToast("error", "Erreur lors du chargement du panier");
        setCart((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initCart();
  }, [products]);

  // Nouvelle fonction pour détecter la localisation
  const detectUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        // Fallback sur l'API IP si la permission est refusée
        return await getLocationFromIP();
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Utiliser la
      //
      //  API pour obtenir l'adresse
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (response[0]) {
        setCart((prev) => ({
          ...prev,
          customerRegion: response[0].city || response[0].subregion || "Niamey",
          country: response[0].country || "Niger",
        }));
        setRegion(response[0].city || response[0].subregion || "Niamey");
      } else {
        // Fallback sur l'API IP
        await getLocationFromIP();
      }
    } catch (error) {
      console.error("Error getting location:", error);
      // Fallback sur l'API IP
      await getLocationFromIP();
    }
  };

  // Fonction fallback pour obtenir la localisation via IP
  const getLocationFromIP = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      setCart((prev) => ({
        ...prev,
        customerRegion: response.data.city || "Niamey",
        country: response.data.country_name || "Niger",
      }));
      setRegion(response.data.city || "Niamey");
    } catch (error) {
      console.error("Error getting location from IP:", error);
      // Valeurs par défaut si tout échoue
      setCart((prev) => ({
        ...prev,
        customerRegion: "Niamey",
        country: "Niger",
      }));
      setRegion("Niamey");
    }
  };

  if (cart.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#30A08B" />
      </View>
    );
  }

  const toggleGroupExpansion = (productId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const renderShippingInfo = (group) => {
    const zones = group.shipping?.zones || [];
    if (zones.length === 0) return null;

    // Trouver la zone correspondant à la région du client
    const customerZone =
      zones.find(
        (zone) => zone.name.toLowerCase() === cart.customerRegion.toLowerCase()
      ) || zones[0]; // Fallback sur la première zone si aucune correspondance

    return (
      <View style={styles.shippingDetails}>
        <Text style={styles.shippingTitle}>Information de livraison:</Text>
        <View style={styles.zoneInfo}>
          <Text style={styles.zoneName}>{customerZone.name}</Text>
          <View style={styles.zoneDetails}>
            <Text style={styles.zoneText}>
              Base: {customerZone.baseFee} FCFA
            </Text>
            <Text style={styles.zoneText}>
              Prix/kg: {customerZone.weightFee} FCFA
            </Text>
            <Text style={styles.zoneText}>
              Transporteur: {customerZone.transporteurName || "IhamBaobab"}
            </Text>
            {customerZone.transporteurContact && (
              <Text style={styles.zoneText}>
                Contact: {customerZone.transporteurContact}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  // Mise à jour du rendu des articles avec l'image de la variante
  const renderCartItem = (group, variant, index) => (
    <View key={index} style={styles.cartItem}>
      <Image
        source={{
          uri: variant.imageUrl || group.image,
        }}
        style={styles.productImage}
      />
      <View style={styles.itemDetails}>
        <View style={styles.variantInfo}>
          {variant.colors?.[0] && (
            <Text style={styles.variantText}>Couleur: {variant.colors[0]}</Text>
          )}
          {variant.sizes?.[0] && (
            <Text style={styles.variantText}>Taille: {variant.sizes[0]}</Text>
          )}
        </View>

        <View style={styles.priceContainer}>
          {variant.hasPromo ? (
            <>
              <Text style={styles.originalPrice}>
                {variant.originalPrice} FCFA
              </Text>
              <Text style={styles.promoPrice}>{variant.price} FCFA</Text>
            </>
          ) : (
            <Text style={styles.price}>{variant.price} FCFA</Text>
          )}
        </View>

        <View style={styles.controlsContainer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() => updateQuantity(group.productId, index, -1)}
              style={styles.quantityButton}
            >
              <EvilIcons name="minus" size={24} color="#30A08B" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{variant.quantity}</Text>
            <TouchableOpacity
              onPress={() => updateQuantity(group.productId, index, 1)}
              style={styles.quantityButton}
            >
              <EvilIcons name="plus" size={24} color="#30A08B" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => removeItem(group.productId, index)}
            style={styles.removeButton}
          >
            <Ionicons name="trash-outline" size={20} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {Object.keys(cart.groupedItems).length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="shopping-cart" size={50} color="#30A08B" />
          <Text style={styles.emptyText}>Votre panier est vide</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate("Commande Page")}
          >
            <Text style={styles.shopButtonText}>Continuer mes achats</Text>
          </TouchableOpacity>
        </View>
      ) : (
        Object.values(cart.groupedItems).map((group) => (
          <View key={group.productId} style={styles.cartGroup}>
            <TouchableOpacity
              style={styles.groupHeader}
              onPress={() => toggleGroupExpansion(group.productId)}
            >
              <View style={styles.groupHeaderContent}>
                <Text style={styles.groupName}>{group.name}</Text>
                <MaterialIcons
                  name={
                    expandedGroups[group.productId]
                      ? "expand-less"
                      : "expand-more"
                  }
                  size={24}
                  color="#30A08B"
                />
              </View>
              <Text style={styles.shippingInfo}>
                Livraison: {group.baseShippingFee + group.weightShippingFee}{" "}
                FCFA
              </Text>
              {group.shipping?.weight && (
                <Text style={styles.weightInfo}>
                  Poids: {group.shipping.weight} kg
                </Text>
              )}
            </TouchableOpacity>

            {group.variants.map((variant, index) =>
              renderCartItem(group, variant, index)
            )}

            {expandedGroups[group.productId] && renderShippingInfo(group)}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    bottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  cartGroup: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 12,
  },
  groupHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 8,
    marginBottom: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#30A08B",
  },
  shippingInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  promoPrice: {
    fontSize: 16,
    color: "#30A08B",
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    color: "#30A08B",
    fontWeight: "600",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 4,
    width: 120,
  },
  quantityButton: {
    padding: 8,
  },
  quantity: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 16,
    textAlign: "center",
  },
  shopButton: {
    backgroundColor: "#30A08B",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  groupHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weightInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  variantInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  variantText: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  shippingDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  shippingTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#30A08B",
    marginBottom: 8,
  },
  zoneInfo: {
    marginBottom: 12,
  },
  zoneName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  zoneDetails: {
    marginLeft: 12,
  },
  zoneText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },

  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  removeButton: {
    padding: 8,
    marginLeft: "auto",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 4,
    width: 120,
  },
});

export default PanierMain;
