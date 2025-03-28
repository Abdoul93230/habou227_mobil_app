import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  PanResponder,
  Animated,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Macbook from "../../image/macbook cote.png";
import { useSelector } from "react-redux";
import { shuffle } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
const { width } = Dimensions.get("window"); // Largeur de l'écran pour le carrousel

// Fonction de mélange (shuffle) des éléments
function shufflee(array) {
  let shuffled = array.slice(); // Crée une copie du tableau original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
const DetailProduitMain = ({
  produit,
  chgColor,
  chgTail,
  id,
  Allcommente,
  chgNbr,
  selectedVariant,
  setSelectedVariant,
  selectedSize,
  setSelectedSize,
  handleVariantChange,
}) => {
  const flatListRef = useRef(null);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [selectedImageURL, setSelectedImage] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allTypes, setAllTypes] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [idClicked, setIdClicked] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tailleImageB, setTailleImageB] = useState(null);
  const [tailleImage, setTailleImage] = useState(null);
  const [tailleNumber, setTailleNumber] = useState(null);
  const [products, setProducts] = useState([]);
  const [produitsL, setProduitsL] = useState(0);
  const [color, setColor] = useState(null);
  const [taille, setTaille] = useState(null);
  const [nbrCol, setNbrCol] = useState(null);
  const [commente, setCommente] = useState("");

  // const [Allcommente, setAllCommente] = useState([]);
  const pan = useRef(new Animated.ValueXY()).current;
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Products = useSelector((state) => state.products.data);
  const contentWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  const CVCate = DATA_Types
    ? DATA_Types?.find((item) => item?._id === produit?.ClefType)
        ?.clefCategories
    : null;
  const Categorie = DATA_Categories
    ? DATA_Categories?.find((item) => item?._id === CVCate)?.name
    : null;
  const handlePress = (index) => {
    setTailleImageB(index);
  };
  const contColor = (nbr) => {
    setTailleImage(nbr);
  };

  useEffect(() => {
    // Filtrer les produits basés sur la condition donnée
    const filteredProducts = DATA_Products.filter(
      (item) => item.ClefType === produit?.ClefType
    );

    // Obtenir les éléments aléatoires à partir du tableau filtré
    const getRandomElements = (array, nbr) => {
      const shuffledArray = shuffle(array);
      return shuffledArray.slice(0, nbr);
    };

    // Définir les produits aléatoires dans l'état
    setProducts(getRandomElements(filteredProducts, 6));
  }, [DATA_Products, produit]);

  const handlePressTaillle = (size) => {
    setTailleNumber(size);
  };
  const [carousel] = useState([
    { id: "1", image: require("../../image/ordinateur14.jpg") },
    { id: "2", image: require("../../image/ordinateur14.jpg") },
    { id: "3", image: require("../../image/ordinateur14.jpg") },
    { id: "4", image: require("../../image/ordinateur14.jpg") },
    { id: "5", image: require("../../image/ordinateur14.jpg") },
    { id: "6", image: require("../../image/ordinateur14.jpg") },
  ]);
  const productImages = produit?.image1
    ? [produit.image1, produit.image2, produit.image3]
    : [];
  const [activeButton, setActiveButton] = useState("details");

  useEffect(() => {
    let currentIndex = 0;
    // const totalItems = productImages.length; // Assurez-vous que la longueur est correcte
    const totalItems = 3; // Assurez-vous que la longueur est correcte

    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        currentIndex = (currentIndex + 1) % totalItems;
        flatListRef.current.scrollToIndex({
          index: currentIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }, 3000); // Défilement toutes les 3 secondes

    return () => clearInterval(scrollInterval); // Nettoyage de l'intervalle à la désactivation du composant
    setAllTypes(DATA_Types);
    setAllCategories(DATA_Categories);
    setAllProducts(DATA_Products);
  }, [produit]);

  const selectRandomComments = (comments, maxCount) => {
    if (comments) {
      // Vérifie si le nombre de commentaires disponibles est inférieur ou égal à maxCount
      if ([comments].length <= maxCount) {
        return comments; // Retourne tous les commentaires disponibles
      }

      if ([comments].length > 0) {
        const shuffled = [comments].sort(() => 0.5 - Math.random()); // Mélange les commentaires de manière aléatoire
        return shuffled.slice(0, maxCount); // Sélectionne les premiers maxCount commentaires
      }
    } else {
      return [];
    }
  };

  // Utilise la fonction selectRandomComments pour obtenir une liste de commentaires aléatoires
  const randomComments = selectRandomComments(Allcommente, 10);
  const handleDetailsPress = () => {
    setActiveButton("details"); // Met à jour l'état du bouton actif
    // Alert.alert('Details', 'Afficher les détails du produit.');
    // Ajoutez ici le code pour naviguer ou afficher les détails du produit
  };
  const rating = [3, 4, 5, 2, 5];

  const handleReviewsPress = () => {
    setActiveButton("reviews"); // Met à jour l'état du bouton actif
    // Alert.alert('Reviews', 'Afficher les avis du produit.');
    // Ajoutez ici le code pour naviguer ou afficher les avis du produit
  };
  const handleImageClick = (id) => {
    setIdClicked(id);
    setSelectedImageIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
    setSelectedImage(id);
    setModalVisible(true);
    pan.setValue({ x: 0, y: 0 });
  };
  // PanResponder for handling image movement
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      // Optionally handle the release event if needed
    },
  });
  const customRenderers = {
    img: () => <Text style={styles.alternateText}>[Image non affichée]</Text>, // Texte alternatif pour les images
    video: () => <Text style={styles.alternateText}>[Vidéo non affichée]</Text>, // Texte alternatif pour les vidéos
    iframe: () => (
      <Text style={styles.alternateText}>[Vidéo non affichée]</Text>
    ), // Texte alternatif pour les iframes
  };

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

  // const AddProduct = async () => {
  //   try {
  //     const existingProductsJson = await AsyncStorage.getItem('panier');
  //     const existingProducts = existingProductsJson ? JSON.parse(existingProductsJson) : [];

  //     const isProductInCart = existingProducts.some((p) => p.id === params.id);

  //     if (isProductInCart) {
  //       const updatedProducts = existingProducts.map((p) => {
  //         if (p.id === params.id) {
  //           const updatedColors = [...p.colors, color]; // Ajouter la nouvelle couleur
  //           const updatedSizes = [...p.sizes, taille]; // Ajouter la nouvelle taille

  //           return {
  //             ...p,
  //             colors: updatedColors,
  //             sizes: updatedSizes,
  //             quantity: p.quantity + 1,
  //             id: params.id,
  //           };
  //         }
  //         return p;
  //       });

  //       await AsyncStorage.setItem('panier', JSON.stringify(updatedProducts));
  //       handleAlert("La quantité du produit a été incrémentée dans le panier !");
  //       chgNbr()
  //       const local = await AsyncStorage.getItem('panier');
  //       setProduitsL(local ? JSON.parse(local) : []);
  //       return;
  //     }

  //     if (produit?.couleur[0].split(",").length >= 2 && !color) {
  //       if (produit.pictures.length >= 2) {
  //         handleAlertwar(
  //           `Veuillez choisir un modèle parmi les ${produit?.pictures.length}`
  //         );
  //       } else {
  //         handleAlertwar(
  //           `Veuillez choisir une couleur parmi les ${produit?.couleur[0].split(",").length}`
  //         );
  //       }
  //       // chgOption("Details", 0);
  //       return;
  //     }

  //     if (produit?.taille[0].split(",").length >= 2 && !taille) {
  //       handleAlertwar(
  //         `Veuillez choisir une taille parmi les ${produit?.taille[0].split(",").length}`
  //       );
  //       // chgOption("Details", 0);
  //       return;
  //     }

  //     const updatedProducts = [
  //       ...existingProducts,
  //       {
  //         ...produit,
  //         colors: [color], // Ajouter la couleur sélectionnée comme tableau
  //         sizes: [taille], // Ajouter la taille sélectionnée comme tableau
  //         quantity: 1,
  //         id: params.id,
  //       },
  //     ];

  //     await AsyncStorage.setItem('panier', JSON.stringify(updatedProducts));
  //     chgNbr()
  //     handleAlert("Produit ajouté au panier !");
  //     const local = await AsyncStorage.getItem('panier');
  //     setProduitsL(local ? JSON.parse(local) : []);
  //   } catch (error) {
  //     console.error('Erreur lors de l\'ajout du produit au panier', error);
  //     // Vous pouvez également afficher une alerte ou un message d'erreur ici si nécessaire
  //   }
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <FlatList
          ref={flatListRef}
          data={[produit?.image1, produit?.image2, produit?.image3]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          )}
        />
      </View>
      <View style={styles.detail}>
        <TouchableOpacity
          style={[
            styles.buttonDetail,
            activeButton === "details" && styles.activeButton,
          ]}
          onPress={handleDetailsPress}
        >
          <Text style={styles.text}>Détails</Text>
          <MaterialCommunityIcons
            name="arrow-bottom-right"
            size={18}
            color="#30A08B"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonDetail,
            activeButton === "reviews" && styles.activeButton,
          ]}
          onPress={handleReviewsPress}
        >
          <Text style={styles.text}>Commantaires</Text>
          <MaterialCommunityIcons
            name="arrow-bottom-right"
            size={18}
            color="#30A08B"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.additionalDetails}>
        {activeButton === "details" ? (
          <View style={styles.detailsContentPara}>
            <View style={styles.detailsContent}>
              <View style={styles.brand}>
                <Text style={styles.title}>Brand</Text>
                <Text style={styles.para}>{produit?.marque}</Text>
                <Text style={styles.title}>Livraison</Text>
                <Text style={styles.para}>Offerte (Niamey)</Text>
              </View>

              <View style={styles.category}>
                <Text style={styles.title2}>Category</Text>
                <Text style={styles.para2}>{Categorie}</Text>
                <Text style={styles.title2}>Fitting</Text>
                <Text style={styles.para2}>True to size</Text>
              </View>
            </View>

            {/* {produit?.couleur[0].split(",").length >= 2 ? (
              <>
                {produit?.pictures.length !== 0 ? (
                  <>
                    <Text
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      Selectionner la color:{" "}
                      {tailleImage !== null && (
                        <Text style={{ color: "#30A08B" }}>
                          Color: {tailleImage}
                        </Text>
                      )}
                    </Text>
                    <View style={styles.cardTaille}>
                      {produit?.pictures.map((param, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.boxCard,
                            tailleImageB === index && {
                              borderColor: "#FF9800",
                              borderWidth: 2,
                            },
                          ]}
                          onPress={() => {
                            handlePress(index);
                            contColor(+index + 1);
                            chgColor(param);
                          }}
                        >
                          <Image
                            source={{ uri: param }}
                            style={styles.boxTaille}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      Selectionner la color:{" "}
                      {tailleImage !== null && (
                        <Text>Color: {tailleImage}</Text>
                      )}
                    </Text>
                    <View style={styles.cardTaille}>
                      {produit?.pictures.map((param, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.boxCard,
                            tailleImageB === index && {
                              borderColor: "#FF9800",
                              borderWidth: 2,
                            },
                          ]}
                          onPress={() => {
                            handlePress(index);
                            contColor(+index + 1);
                            chgColor(param);
                          }}
                        >
                          <View
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 50,
                              backgroundColor: param,
                            }}
                          ></View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
              </>
            ) : (
              <></>
            )} */}

            {/* {produit?.taille[0].split(",").length >= 2 ? (
              <>
                <Text
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  Selectionner la taille:{" "}
                  {tailleNumber !== null && (
                    <Text style={{ color: "#30A08B" }}>
                      Taille: {tailleNumber}
                    </Text>
                  )}
                </Text>
                <View style={styles.cardTaille}>
                  {produit?.taille[0].split(",").map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.boxNumber,
                        tailleNumber === size && {
                          borderColor: "#FF9800",
                          borderWidth: 2,
                        },
                      ]}
                      onPress={() => {
                        handlePressTaillle(size);
                        chgTail(size);
                      }}
                    >
                      <Text style={{ color: "#30A08B" }}>{size}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <></>
            )} */}

            {produit?.variants.length > 0 && (
              <View style={styles.colorContainer}>
                <View style={styles.colorSection}>
                  <Text style={styles.labelText}>
                    Couleur:
                    <Text style={styles.selectedText}>
                      {selectedVariant?.color}
                    </Text>
                  </Text>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.variantImageContainer}
                  >
                    {produit?.variants.map((variant, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.variantImageWrapper,
                          selectedVariant?.color === variant?.color &&
                            styles.selectedVariantBorder,
                        ]}
                        onPress={() => handleVariantChange(variant)}
                      >
                        <Image
                          source={{ uri: variant.imageUrl }}
                          style={styles.variantImage}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.sizeSection}>
                  <Text style={styles.labelText}>
                    Taille du Produit:
                    <Text style={styles.selectedText}>
                      {selectedSize || "Sélectionnez une taille"}
                    </Text>
                  </Text>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.sizeBtnContainer}
                  >
                    {selectedVariant?.sizes.map((size, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.sizeBtn,
                          selectedSize === size && styles.selectedSizeBorder,
                        ]}
                        onPress={() => setSelectedSize(size)}
                      >
                        <Text style={styles.sizeBtnText}>{size}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}

            <View>
              <RenderHtml
                source={{ html: produit?.description }}
                contentWidth={width}
                renderers={customRenderers}
                ignoredDomTags={["iframe"]} // Ignore les iframes si non géré par customRenderers
                containerStyle={styles.htmlContainer}
              />
            </View>

            <Text style={styles.galerie__title}>Produits</Text>

            <View style={styles.galerie__box}>
              {products?.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.galerie__box__img}
                  onPress={() => handleImageClick(item._id)}
                >
                  <Image source={{ uri: item.image1 }} style={styles.image} />
                </TouchableOpacity>
              ))}
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <SafeAreaView style={styles.containerModal}>
                <View style={styles.modelContainer}>
                  <View style={styles.card}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: products?.find((item) => item._id === idClicked)
                            ?.image1,
                        }}
                        style={styles.macBook}
                      />
                      {/* {console.log(products?.find(item=>item._id===idClicked)?.image1)} */}
                    </View>
                  </View>
                </View>

                <View style={styles.bottomContainer}>
                  <ScrollView
                    style={{ paddingBottom: 5 }}
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.textTitle}>
                        {products
                          ?.find((item) => item._id === idClicked)
                          ?.name.slice(0, 25)}{" "}
                        ...
                      </Text>
                      {/* <Text style={styles}>Prix du produit</Text> */}
                      {/* {
              products?.find(item=>item._id===idClicked)?.prixPromo <= 0 ?<Text style={styles.CFAText}>CFA {products?.find(item=>item._id===idClicked)?.prix}</Text>:<Text style={styles.CFAText}>CFA {products?.find(item=>item._id===idClicked)?.prixPromo}</Text>
            } */}
                      {products?.find((item) => item._id === idClicked)
                        ?.prixPromo <= 0 ? (
                        <Text style={styles.CFAText}>
                          CFA{" "}
                          {
                            products?.find((item) => item._id === idClicked)
                              ?.prix
                          }
                        </Text>
                      ) : (
                        <View>
                          <Text style={styles.CFAText2}>
                            CFA{" "}
                            {
                              products?.find((item) => item._id === idClicked)
                                ?.prix
                            }
                          </Text>
                          <Text style={styles.CFAText}>
                            CFA{" "}
                            {
                              products?.find((item) => item._id === idClicked)
                                ?.prixPromo
                            }
                          </Text>
                        </View>
                      )}
                      <Text style={styles.text}>
                        Découvrez un produit alliant qualité et élégance. Conçu
                        avec soin, il offre une expérience exceptionnelle, que
                        ce soit pour enrichir votre quotidien ou comme cadeau
                        parfait.
                      </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <Pressable
                        style={styles.button}
                        onPress={() => {
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.textButton}>Retour</Text>
                      </Pressable>
                      <Pressable
                        style={styles.button}
                        onPress={() => {
                          setModalVisible(false);
                          navigation.navigate("Détail-Produit", {
                            id: products?.find((item) => item._id === idClicked)
                              ?._id,
                          });
                        }}
                      >
                        <Text style={styles.textButton}>Plus De Details</Text>
                      </Pressable>
                    </View>
                  </ScrollView>
                </View>
              </SafeAreaView>
            </Modal>
          </View>
        ) : (
          <View>
            {randomComments.length > 0 ? (
              randomComments.map((param, index) => {
                return (
                  <View key={index} style={styles.reviewsContent}>
                    <View style={styles.cardProfil}>
                      <View style={styles.profilName}>
                        <Text style={styles.textName}>
                          {param.userName
                            ?.split(" ")
                            .map((word) => word.charAt(0))
                            .join("")}
                        </Text>
                      </View>
                      <View style={styles.messageContainer}>
                        <View style={styles.starIcon}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <AntDesign
                              key={star}
                              name="star"
                              size={18}
                              color={
                                star <= param.etoil ? "#30A08B" : "#B2905F"
                              } // Couleur des étoiles
                            />
                          ))}
                        </View>
                        <View>
                          <Text style={styles.name}>{param.userName}</Text>
                        </View>
                      </View>
                      <View style={styles.date}>
                        <Text style={{ color: "#30A08B" }}>
                          {formatDate(param.date)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.commantaire}>
                      <Text style={styles.textCommantaire}>
                        {" "}
                        {param.description}
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text>
                Aucun commentaire disponible pour ce produit pour le moment.
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default DetailProduitMain;

const styles = StyleSheet.create({
  htmlContainer: {
    padding: 5,
    width: "100%",
  },
  alternateText: {
    color: "red",
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    marginTop: 10,
    paddingBottom: 100,
  },
  CFAText2: {
    color: "#30A08B",
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  CFAText: {
    color: "#30A08B",
    fontWeight: "bold",
    fontSize: 28,
  },
  box: {
    width: "100%",
    height: 270,
    borderRadius: 10,
    overflow: "hidden",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 5,
  },
  carouselItem: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ajuste l'image pour couvrir le conteneur
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "100%",
    height: "auto",
  },
  buttonDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    top: 5,
  },
  activeButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#B17236",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.21,
    shadowRadius: 5,
    elevation: 5,
  },
  additionalDetails: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    marginTop: 20,
  },
  detailsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  reviewsContent: {
    width: "100%",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    padding: 5,
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  brand: {
    flex: 1,
  },
  category: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    color: "#B2905F",
  },
  para: {
    fontSize: 14,
    color: "#525252db",
    marginBottom: 10,
  },
  title2: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    color: "#B2905F",
    textAlign: "right",
  },
  para2: {
    fontSize: 14,
    color: "#525252db",
    textAlign: "right",
    marginBottom: 10,
  },
  cardTaille: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 100, // Adjusted to a reasonable height
  },
  boxCard: {
    width: 60,
    height: 60,
    borderRadius: 50,
    shadowColor: Platform.OS === "ios" ? "#B2905F" : "#B2905F",
    shadowOffset: { width: 0, height: Platform.OS === "ios" ? 2 : 2 },
    shadowOpacity: 0.8,
    elevation: Platform.OS === "android" ? 5 : 5,
  },
  boxTaille: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image scales correctly
    borderRadius: 50,
  },
  boxNumber: {
    width: 60,
    height: 60,
    backgroundColor: Platform.OS === "ios" ? "#fff" : "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: Platform.OS === "ios" ? "#B2905F" : "#B2905F",
    shadowOffset: { width: 0, height: Platform.OS === "ios" ? 2 : 2 },
    shadowOpacity: 0.8,
    elevation: Platform.OS === "android" ? 5 : 0,
  },

  theiere: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#000",
    marginBottom: 10,
  },
  detailsContentPara: {
    borderColor: "red",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  galerie__title: {
    width: "100%",
    letterSpacing: 1,
    marginVertical: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: "#B17236",
  },
  galerie__box: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
  },
  galerie__box__img: {
    width: "45%",
    aspectRatio: 1,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#FF9800",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    color: "#fff",
    textAlign: "center",
    padding: 10,
  },
  cardProfil: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
  },
  profilName: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  textName: {
    fontSize: 26,
    color: "#30A08B",
  },
  messageContainer: {
    flex: 1,
    flexDirection: "column",
  },
  starIcon: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    textAlign: "left",
  },
  date: {
    justifyContent: "center",
    marginLeft: 10,
  },
  commantaire: {
    marginTop: 10,
  },
  textCommantaire: {
    fontSize: 14,
    color: "#333",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "#30A08B",
  },
  modelContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 300, // Adjusted to a reasonable height
    justifyContent: "center",
    alignItems: "center",
  },
  macBook: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 28,
    color: "#B17236",
    fontWeight: "bold",
  },

  text: {
    color: "black",
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: Platform.OS === "android" ? -10 : 0,
  },
  button: {
    backgroundColor: "#B2905F",
    padding: 10,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  textButton: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  colorContainer: {
    width: "100%",
  },
  colorSection: {
    paddingHorizontal: 2,
    marginTop: 10,
  },
  sizeSection: {
    paddingHorizontal: 2,
    marginTop: 10,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  selectedText: {
    color: "#30A08B",
  },
  variantImageContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  variantImageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  selectedVariantBorder: {
    borderWidth: 2,
    borderColor: "#30A08B",
  },
  variantImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  sizeBtnContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  sizeBtn: {
    width: 96,
    height: 46,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedSizeBorder: {
    borderWidth: 2,
    borderColor: "#30A08B",
  },
  sizeBtnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
