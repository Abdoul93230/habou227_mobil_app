import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons, Entypo, Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const DetailProduitFooter = ({
  produit,
  color,
  taille,
  id,
  chgNbr,
  selectedVariant,
  selectedSize,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [produitsL, setProduitsL] = useState(0);
  const [nbrCol, setNbrCol] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAlert = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  const handleAlertwar = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  // Calculer le prix et la remise
  const originalPrice = produit?.prix;
  const discountedPrice = produit?.prixPromo;
  const discountPercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  const AddProduct = async () => {
    try {
      const existingProductsJson = await AsyncStorage.getItem("panier");
      const existingProducts = existingProductsJson
        ? JSON.parse(existingProductsJson)
        : [];

      // Vérification des variantes de couleur
      if (
        produit?.variants &&
        produit.variants.length >= 2 &&
        !selectedVariant
      ) {
        handleAlertwar(
          `Veuillez choisir un modèle parmi les ${produit.variants.length}`
        );
        return;
      }

      // Vérification des tailles
      const hasMultipleSizes = produit?.variants?.some(
        (variant) => variant.sizes && variant.sizes.length >= 2
      );

      if (hasMultipleSizes && !selectedSize) {
        handleAlertwar(`Veuillez choisir une taille parmi les disponibles`);
        return;
      }
      /////////////////////////////////////////////////////////////////////
      // Vérifier si le produit existe déjà dans le panier
      const existingProductIndex = existingProducts.findIndex((p) => {
        // Si le produit n'a pas de variantes, on compare simplement l'ID
        if (!produit.variants || produit.variants.length === 0) {
          return p?._id === produit?._id;
        }

        // Si le produit a des variantes, on compare l'ID, la couleur et la taille
        return (
          p?._id === produit?._id &&
          p.colors[0] === selectedVariant?.color &&
          p.sizes[0] === selectedSize
        );
      });

      if (existingProductIndex !== -1) {
        // Produit existant : incrémenter la quantité
        const updatedProducts = existingProducts.map((p, index) =>
          index === existingProductIndex
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );

        AsyncStorage.setItem("panier", JSON.stringify(updatedProducts));
        handleAlert(
          "La quantité du produit a été incrémentée dans le panier !"
        );
      } else {
        // Nouveau produit à ajouter
        const newProduct = {
          ...produit,
          colors: selectedVariant ? [selectedVariant.color] : [],
          sizes: selectedSize ? [selectedSize] : [],
          quantity: quantity,
          _id: produit?._id,
          imageUrl: selectedVariant
            ? selectedVariant.imageUrl
            : produit?.image1,
          price:
            discountedPrice && discountedPrice > 0
              ? discountedPrice
              : originalPrice,
          prixPromo: discountedPrice,
        };

        const updatedProducts = [...existingProducts, newProduct];
        AsyncStorage.setItem("panier", JSON.stringify(updatedProducts));
        handleAlert("Produit ajouté au panier !");
      }
      /////////////////////////////////////////////////////////////////////

      // const isProductInCart = existingProducts.some((p) => p.id === id);

      // if (isProductInCart) {
      //   const updatedProducts = existingProducts.map((p) => {
      //     if (p.id === id) {
      //       const updatedColors = [...p.colors, color]; // Ajouter la nouvelle couleur
      //       const updatedSizes = [...p.sizes, taille]; // Ajouter la nouvelle taille

      //       return {
      //         ...p,
      //         colors: updatedColors,
      //         sizes: updatedSizes,
      //         quantity: p.quantity + 1,
      //         id: id,
      //       };
      //     }
      //     return p;
      //   });

      //   await AsyncStorage.setItem("panier", JSON.stringify(updatedProducts));
      //   chgNbr();
      //   handleAlert(
      //     "La quantité du produit a été incrémentée dans le panier !"
      //   );
      //   const local = await AsyncStorage.getItem("panier");
      //   setProduitsL(local ? JSON.parse(local) : []);
      //   return;
      // }

      // const updatedProducts = [
      //   ...existingProducts,
      //   {
      //     ...produit,
      //     colors: [color], // Ajouter la couleur sélectionnée comme tableau
      //     sizes: [taille], // Ajouter la taille sélectionnée comme tableau
      //     quantity: 1,
      //     id: id,
      //   },
      // ];

      // await AsyncStorage.setItem("panier", JSON.stringify(updatedProducts));
      chgNbr();
      // handleAlert("Produit ajouté au panier !");
      const local = await AsyncStorage.getItem("panier");
      setProduitsL(local ? JSON.parse(local) : []);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit au panier", error);
      // Vous pouvez également afficher une alerte ou un message d'erreur ici si nécessaire
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Fonction pour gérer le clic sur le bouton de discussion
  const handleChatButtonClick = (
    productName,
    productLink,
    phoneNumber,
    productImageURL
  ) => {
    // Vérification des données du produit et du numéro de téléphone
    if (!productName || !phoneNumber) {
      console.error(
        "Les informations du produit et le numéro de téléphone sont requis."
      );
      return;
    }

    // Création du message pré-rempli avec les informations du produit
    let message = `Bonjour, je suis intéressé(e) par le produit ${productName}.\n`;

    // Si une URL d'image est fournie, l'ajouter au message
    if (productImageURL) {
      message += `Voici le lien vers l'image : \n\n ${productImageURL} \n`;
    }
    // if (productLink) {
    //   message += `et le lien vers les détails du produit\n\n${productLink}`;
    // }

    // Encodage du message pour l'URL
    const encodedMessage = encodeURIComponent(message);

    // Création de l'URL WhatsApp avec le numéro de téléphone et le message pré-rempli
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Utiliser Linking pour ouvrir WhatsApp
    Linking.openURL(whatsappURL).catch((err) =>
      console.error(
        "Une erreur s'est produite lors de l'ouverture de WhatsApp:",
        err
      )
    );
  };

  // Exemple d'utilisation dans un composant
  const Discuite = () => {
    const currentURL = "lien_a_remplacer_avec_la_valeur_appropriee"; // Remplacez ceci par l'URL actuelle si nécessaire

    // Appel de la fonction de chat avec les données du produit
    handleChatButtonClick(
      produit?.name ?? "nom",
      currentURL,
      "22787727501",
      produit?.image1
    );
  };

  return (
    <View
      style={
        Platform.OS === "ios" ? styles.containerFooter : styles.containerFooter2
      }
    >
      {/* <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Entypo name="share" size={20} color="#FF6A69" />
        <Text style={styles.buttonText}>Partagez ceci</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.buttonAddWhatsp} onPress={Discuite}>
        <Ionicons name="logo-whatsapp" size={20} color="#30A08B" />
        <Text style={styles.buttonTextAddWhatsp}>Discuter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAddWhatsp} onPress={AddProduct}>
        <FontAwesome name="shopping-cart" size={20} color="#30A08B" />
        <Text style={styles.buttonTextAddWhatsp}>Ajouter au panier</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.cartTitle}>
                  <Text style={styles.modalTitle}>Partagez ce lien</Text>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.optionRow}>
                    <Feather name="copy" size={20} />
                    <Text style={styles.optionText}>Copier</Text>
                  </View>
                  <TextInput
                    value="https://chatgpt.com/c/5d656f1d-b488-4705-9fa8-e415ffef9719"
                    style={styles.textInput}
                    placeholder="Votre texte ici"
                  />

                  <View style={styles.optionRow2}>
                    <Text style={styles.optionText}>Via Whatsapp</Text>
                    <FontAwesome name="whatsapp" size={20} />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default DetailProduitFooter;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  cartTitle: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FF6A69",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  modalBody: {
    marginVertical: 10,
    width: "100%",
    padding: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  optionRow2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#FF6A69",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    width: 100,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  containerFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 78,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    elevation: 5,
    backgroundColor: "#F5F6F8",
  },
  containerFooter2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderTopWidth: 1,
    elevation: 5,
    backgroundColor: "#F5F6F8",
  },
  button: {
    backgroundColor: "#B2905F",
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderRadius: 30,
  },
  buttonAddWhatsp: {
    backgroundColor: "rgba(255, 152, 0, 0.2)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    borderRadius: 30,
    width: "43%",
  },
  buttonText: {
    textTransform: "uppercase",
    color: "#30A08B",
    fontSize: 12,
    marginLeft: 5,
  },
  buttonTextAddWhatsp: {
    textTransform: "uppercase",
    color: "#30A08B",
    fontWeight: "bold",
    fontSize: 11,
    marginLeft: 5,
  },
});
