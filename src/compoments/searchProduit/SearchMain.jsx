import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView,Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Ordi from '../../image/Vnike2.jpg';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../../pages/LoadingIndicator';
import axios from 'axios';

const SearchMain = ( allCategories,allProducts) => {

  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Types = useSelector((state) => state.products.types);




  const [searchName, setSearchName] = useState("");
  const divRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [show, setShow] = useState(null);
  const [sh, setSh] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [products, setProduct] = useState([]);




  const navigation = useNavigation()

  const Table__Galerie = [
    { id: 1, image: Ordi},
    { id: 2, image: Ordi},
    { id: 3, image: Ordi},
    { id: 4, image: Ordi},
    { id: 5, image: Ordi},
    { id: 6, image: Ordi},
    { id: 7, image: Ordi},
    { id: 8, image: Ordi},
    { id: 9, image: Ordi},
    { id: 10, image: Ordi },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton lorsque l'utilisateur a fait défiler plus de 50 pixels
      const { current } = divRef;
      if (current) {
        if (current.scrollTop > 40) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };

    // Ajouter un écouteur d'événement de défilement à la div si elle existe
    const { current } = divRef;
    if (current) {
      current.addEventListener("scroll", handleScroll);
    }

    // Nettoyage de l'écouteur d'événement lorsque le composant est démonté
    return () => {
      if (current) {
        current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  useEffect(() => {
    if (!show) {
      setShow(DATA_Categories[0]);
    }
  }, [show]);




  const searchProductByName = () => {
    if (searchName.length <= 1) {
      // alert("le produit à rechercher doit avoir au moins 2 caractères");
      return;
    }
    setLoading1(true);
    axios
      .get(`https://chagona.onrender.com/searchProductByName/${searchName}`)
      .then((res) => {
        setProduct(res.data.products);
        setSh(false);
        setErreur(null);
        setLoading1(false);
      })
      .catch((error) => {
        setProduct(null);
        setSh(true);
        setErreur(error.response.data.message);
        setLoading1(false);
      });
  };
  // const scrollToTop2 = () => {
  //   const { current } = divRef;
  //   if (current) {
  //     current.scrollTop = 0;
  //   }
  // };

  const scrollToTop2 = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };


  const shuffledProducts = DATA_Products?.filter((item) =>
    DATA_Types.some(
      (type) => type.clefCategories === show?._id && item.ClefType === type._id
    )
  ).sort(() => Math.random() - 0.5); // Mélange les produits du tableau

  function generateRandomNumber() {
    const min = 3;
    const max = 5;
    const random = Math.random() * (max - min) + min;
    const rounded = random.toFixed(1);
    return parseFloat(rounded);
  }


  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 500) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };


  const handleIconPress = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };



  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={styles.contenu}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FF6A69" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            defaultValue={searchName}
            onChangeText={(e) => {
              setSearchName(e);
            }}
            // onSubmitEditing={onSearch}
          />
          <TouchableOpacity style={styles.searchButton}
          onPress={() => {
            searchProductByName();
            scrollToTop2();
          }}
          >
            <Ionicons name="search" size={24} color="#FFF" />
            <Text style={{ color: "#FFF", marginLeft: 5 }}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categories}>


        {
          DATA_Categories?.map((param,index)=>{
            if (index > 6 || param.name === "all") {
              return null;
            }
            return         <TouchableOpacity key={index}
            onPress={() => {
              setShow(param);
              setSh(true);
              setErreur(null);
              scrollToTop2();
            }}
            style={styles.categoryButton}>
            <Text style={styles.categoryText}>{param.name}</Text>
          </TouchableOpacity>
          })
        }
      </View>
    </View>
    <Text style={styles.galerie__title}>Galeries</Text>
    {erreur && !products ? (
              <Text style={{ fontSize: 10, width: "100%", marginTop: 10 }}>
                {erreur} : {searchName}
              </Text>
            ) : (
              ""
            )}
    <ScrollView
  showsVerticalScrollIndicator={false}
  ref={scrollViewRef}
  onScroll={handleScroll} // Ajoutez ceci pour déclencher le défilement
>
      <LoadingIndicator loading={loading1}>


      <View style={styles.galerie__box}>



          {
            sh?(shuffledProducts.map((param,indes)=>{
              return  <TouchableOpacity
              key={param._id}
              style={styles.galerie__box__img}
              onPress={() => navigation.navigate('Détail-Produit', { id: param._id })}
            >
              <Image source={{uri:param.image1}} style={styles.image} />
              {/* {selectedImageIds.includes(item.id) && (
                <View style={styles.overlay}>
                  <Text style={styles.imageText}>{item.text}</Text>
                </View>
              )} */}
            <View style={styles.cartFooter}>
              <View>
                  <Text style={styles.ProduitName}>{param.name.slice(0, 10)}...</Text>
                  <Text style={styles.prix}>{param.prixPromo ? param.prixPromo : param.prix} F</Text>
              </View>
              <View style={styles.staro}>
                <AntDesign name="staro" size={18} color="#FFF" />
                <Text style={{color: "#FFF"}}>{generateRandomNumber()}</Text>
              </View>


          </View>
            </TouchableOpacity>
            })
              ):(products?.map((param,indes)=>{
                return  <TouchableOpacity
                key={param._id}
                style={styles.galerie__box__img}
                onPress={() => navigation.navigate('Détail-Produit', { id: param._id })}
              >
                <Image source={{uri:param.image1}} style={styles.image} />
                {/* {selectedImageIds.includes(item.id) && (
                  <View style={styles.overlay}>
                    <Text style={styles.imageText}>{item.text}</Text>
                  </View>
                )} */}
              <View style={styles.cartFooter}>
                <View>
                    <Text style={styles.ProduitName}>{param.name.slice(0, 10)}...</Text>
                    <Text style={styles.prix}>{param.prixPromo ? param.prixPromo : param.prix} F</Text>
                </View>
                <View style={styles.staro}>
                  <AntDesign name="staro" size={18} color="#FFF" />
                  <Text style={{color: "#FFF"}}>{generateRandomNumber()}</Text>
                </View>


            </View>
              </TouchableOpacity>
              }))
          }
          </View>




      </LoadingIndicator>

    </ScrollView>
    {showButton && (
  <TouchableOpacity style={styles.icon} onPress={scrollToTop2}>
    <AntDesign name="up" size={24} color="white" style={styles.iconCircle} />
  </TouchableOpacity>
)}


    </View>
  );
};

export default SearchMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Platform.OS === 'ios' ?  6 : 3,
  },
  galerie__title: {
    fontSize: 20,
    letterSpacing: 1,
    color: '#000',
    textAlign:"left",
    marginVertical: 10,
  },
  galerie__box: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#F0F0F0',
    marginBottom: 100
  },
  galerie__box__img: {
    width: '45%',
    aspectRatio: 1,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  },
  cartFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
    padding: 3,
    backgroundColor: "#ffffff56",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    },
    ProduitName: {
      fontSize: 12,
    },
    prix: {
      fontSize: 12,
      fontWeight: "bold"
    },
    staro: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ff6A69",
      width: 50,
      borderRadius: 30,
      bottom: 4,
      right: 4

    },

    ///////
    headerContainer: {
      paddingHorizontal: 10,
      backgroundColor: '#DDD',
      width: "100%",
      height: 180,
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: { height: 3, width: 0,},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 2,
    },
    contenu: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: 10,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FF6A69',
      borderRadius: 30,
      paddingHorizontal: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
    },
    searchButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF6A69',
      padding: 8,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      end: 0,
      position: "absolute"
    },
    categories: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 1,
    },
    categoryButton: {
      backgroundColor: '#FF6A69',
      borderRadius: 20,
      marginBottom: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    categoryText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
    icon: {
      position: "absolute",
      bottom: 90,
      right: 20,
      padding: 10,
      backgroundColor: "#FF6A69",
      borderRadius: 50,
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconCircle: {
      color: 'white',
    }

});







