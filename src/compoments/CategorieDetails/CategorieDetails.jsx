import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ChevronRight } from "react-native-feather";
import { useRoute } from '@react-navigation/native';
import { shuffle } from "lodash";
import Produits from '../produits/Produit';
import ReviewList from '../../pages/ReviewList';

const { width } = Dimensions.get('window'); // Pour gérer les dimensions de l'image

const CategorieDetails = () => {
  const navigation = useNavigation()
  const [showSearch, setShowSearch] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  const [Ptp, setPtp] = useState([]);
  const [pt2, setPt2] = useState([]);
  const [ptAll, setPtAll] = useState([]);
  const [activeSection, setActiveSection] = useState('Homme'); // État pour suivre la section active
  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Products_pubs = useSelector(
    (state) => state.products.products_Pubs
  );
  const DATA_Commentes = useSelector(
    (state) => state.products.products_Commentes
  );
  const route = useRoute();
  const { categoryId } = route.params;




  let Pub =
  DATA_Products_pubs?.filter(
    (item) =>
      item.clefCategorie ===
    categoryId
  ) || [];
  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  function getRandomElementsSix(array, nbr) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, nbr);
  }

  const Home1 = getRandomElementsSix(
    DATA_Products.filter((item) =>
      DATA_Types.some(
        (type) =>
          type.clefCategories === categoryId && item.ClefType === type._id
      )
    ),
    9
  );

  const Home2 = getRandomElementsSix(
    DATA_Products.filter((item) =>
      DATA_Types.some(
        (type) =>
          type.clefCategories === categoryId && item.ClefType === type._id
      )
    ),
    6
  );
  const filteredProductsPromo = DATA_Products.filter((item) =>
    DATA_Types.some(
      (type) =>
        type.clefCategories === categoryId &&
        item.ClefType === type._id &&
        item.prixPromo > 0
    )
  );

  const filteredProductsTop30 = DATA_Products.slice(0, 30).filter((item) =>
    DATA_Types.some(
      (type) =>
        type.clefCategories === categoryId && item.ClefType === type._id
    )
  );
  const typesInCategory = DATA_Types.filter(type => type.clefCategories === categoryId);

  const filteredComments = DATA_Commentes.filter(comment =>
    typesInCategory.some(type => type._id === comment.clefType)
  );



  // setPtAll(
  //   DATA_Products.filter((item) =>
  //     DATA_Types.some(
  //       (type) =>
  //         type.clefCategories === categoryId &&
  //         item.ClefType === type._id
  //     )
  //   )
  // );
  // setPtp(getRandomElementsSix(filteredProductsPromo, 6));
  // setPt2(getRandomElementsSix(filteredProductsTop30, 6));




  const renderContent = () => {
    switch (activeSection) {
      case 'Homme':
        return (
          <ScrollView>


            <View>
      <Text style={styles.heading}>Trending</Text>

      {Pub?.length > 0 ? (
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {Pub?.map((param, index) => (
              <View key={index} style={styles.slide}>
                {param.pub ? (
                  <View style={styles.sup}>
                    <Text style={styles.collectionText}>Collection</Text>
                    <TouchableOpacity>
                      <ChevronRight color="#000" />
                    </TouchableOpacity>
                  </View>
                ) : null}
                <Image source={{ uri: param.image }} style={styles.image} resizeMode="cover" />
              </View>
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {Pub?.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>
      ) : null}
    </View>



            <Text style={styles.titleHomme}>Tendance</Text>
            <View style={styles.containerHommeCard}>
              {Home1?.map((param, index) => (
                <TouchableOpacity onPress={() => navigation.navigate("Détail-Produit",{ id: param._id })} style={styles.cardBox} key={index}>
                  <Image
                    source={{uri:param.image1}}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardTitle}>{param.name.slice(0, 10)}...</Text>
                    <Text style={styles.cardPrice}>F {param.prixPromo ? param.prixPromo : param.prix}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
              <Produits products={Home2}  name={DATA_Categories.find(item=>item._id===categoryId).name}/>
          </ScrollView>
        );
      case 'Products':
        return(
          <ScrollView>
            <View style={styles.productFilter}>

            {
              DATA_Types?.filter(
                (para) => para.clefCategories === categoryId
              ).map((param, index)=>{
                if (index > 4) {
                  return null;
                }
                return <TouchableOpacity>
                <Text>{param.name}</Text>
                <View style={styles.ligneBas} />
              </TouchableOpacity>
              })
            }



              {/* <TouchableOpacity>
                <Text>Baskette</Text>
                <View style={styles.ligneBas} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Text>Chaussures</Text>
                <View style={styles.ligneBas} />
              </TouchableOpacity> */}
            </View>

            {/* <Produits products={Home2}  name={DATA_Categories.find(item=>item._id===categoryId).name}/> */}
                {
                  filteredProductsTop30?.length>2?<>
                  <Text style={styles.titleHomme}>{DATA_Categories.find(item=>item._id===categoryId).name}</Text>
                  {getRandomElementsSix(filteredProductsTop30, 6)?.length > 0 ? (
              <Produits products={getRandomElementsSix(filteredProductsTop30, 6)}  name={DATA_Categories.find(item=>item._id===categoryId).name}/>

          ) : (
            <></>
          )}
                  </>:<></>
                }




            {
              getRandomElementsSix(filteredProductsPromo, 6)?.length>4?<>

            <Text style={styles.titleHomme}>Promo</Text>
            <View style={styles.containerHommeCard}>
              {getRandomElementsSix(filteredProductsPromo, 6).map((param, index) => (
                <TouchableOpacity onPress={() => navigation.navigate("Détail-Produit",{ id: param._id })} style={styles.cardBox} key={index}>
                  <View style={styles.valeurPromo}>
                    <Text style={styles.promoText}>-{Math.round(
                        ((param.prix - param.prixPromo) / param.prix) * 100
                      )}%</Text>
                  </View>
                  <Image
                    source={{uri:param.image2}}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardTitle}>{param.name.slice(0, 10)}...</Text>
                    <View style={styles.cardPriceContainer}>
                      <Text style={styles.cardPriceDefaullt}>F {param.prix}</Text>
                      <Text style={styles.cardPrice}>F {param.prixPromo}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
              </>:<></>
            }
            <Text style={styles.titleHomme}>Tous</Text>
            <View style={styles.containerHommeCard}>
              { DATA_Products.filter((item) =>
          DATA_Types.some(
            (type) =>
              type.clefCategories === categoryId &&
              item.ClefType === type._id
          )
        )?.map((param, index) => (
                <TouchableOpacity onPress={() => navigation.navigate("Détail-Produit",{ id: param._id })} style={styles.cardBoxAll} key={index}>
                  <Image
                    source={{uri:param.image1}}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardTitleAll}>{param.name.slice(0, 10)}...</Text>
                    <Text style={styles.cardPriceAll}>F {param.prixPromo && param.prixPromo< param.prix? param.prixPromo : param.prix}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )
      case 'Reviews':
        return <>
        <ReviewList randomComments={filteredComments} DATA_Products={DATA_Products} />
        {/* <Text style={{fontSize: 20 , textAlign: 'center'}}>Aucun commentaires pour le moment </Text> */}
        </>

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          // source={require("../../image/IHFt.jpg")}
          source={{uri:DATA_Categories?.find(item=>item._id===categoryId).image}}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.headerContent}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000, position: 'relative', paddingHorizontal: 10, top: 20}}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <AntDesign name="left" size={24} color="#FF6A69" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
                <Feather name="search" size={24} color="#FF6A69" />
              </TouchableOpacity>
            </View>
            {showSearch && (
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            autoFocus
          />
        </View>
      )}
          <View style={styles.headerIcons}>

          </View>
          <View style={styles.textBox}>
            <Text style={styles.titleHead}>{DATA_Categories.find(item=>item._id===categoryId).name}</Text>
            <Text style={styles.fashion}>All your fashion needs under one roof</Text>
          </View>
        </View>
      </View>
      <View style={styles.ContainerButton}>
        <TouchableOpacity
          style={activeSection === 'Homme' ? styles.activeButton : styles.button}
          onPress={() => setActiveSection('Homme')}
        >
          <Text style={activeSection === 'Homme' ? styles.activeButtonText : styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeSection === 'Products' ? styles.activeButton : styles.button}
          onPress={() => setActiveSection('Products')}
        >
          <Text style={activeSection === 'Products' ? styles.activeButtonText : styles.buttonText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeSection === 'Reviews' ? styles.activeButton : styles.button}
          onPress={() => setActiveSection('Reviews')}
        >
          <Text style={activeSection === 'Reviews' ? styles.activeButtonText : styles.buttonText}>Reviews</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default CategorieDetails;

const styles = StyleSheet.create({
  ligneBas: {
    height: 2,
    backgroundColor: '#FF6A69',
    width: '100%', // Ajuster la largeur pour être responsive
    alignSelf: 'flex-start',
  },
  titleHomme: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#515C70',
    marginBottom: 20, // Augmenter l'espace sous le titre
  },
  containerHommeCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  searchBox: {
    marginVertical: 13,
    top: 0,
    position: 'absolute',
    width: "90%",
    left: 35
  },
  searchInput: {
    height: 40,
    borderColor: '#FF6A69',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  cardBox: {
    backgroundColor: '#F7F7F7',
    padding: 0, // Padding intérieur constant
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 1 : 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: Platform.OS === 'ios' ? 8 : 1,
    marginBottom: 10,
    width: (width - 40) / 3,
    height: 150,
  },
  cardBoxAll: {
    backgroundColor: '#F7F7F7',
    padding: 0, // Padding intérieur constant
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 1 : 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: Platform.OS === 'ios' ? 8 : 1,
    marginBottom: 10,
    width: (width - 40) / 3,
    height: 125,
  },
  valeurPromo: {
    fontSize: 18,
    backgroundColor: '#FF6A69',
    position: 'absolute',
    top: 5,
    end: 5,
    zIndex: 1000,
    padding: 1,
    borderRadius: 16,
    width: 50,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoText: {
    color: '#FFF',
  },
  cardImage: {
    width: '100%',
    height: '75%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardFooter: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '30%',
  },
  cardTitle: {
    fontSize: 13,
    color: '#333',
    paddingHorizontal: 5,
  },
  cardTitleAll: {
    fontSize: 12,
    color: '#333',
    paddingHorizontal: 5,
  },
  cardPriceDefaullt: {
    fontSize: 11,
    color: '#515C70',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    paddingHorizontal: 5,
  },
  cardPrice: {
    fontSize: 11,
    color: '#FF6A69',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  cardPriceAll: {
    fontSize: 8,
    color: '#FF6A69',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Espace sous les icônes
    paddingHorizontal: 12,
    top: 10,
    width: "100%",
  },
  textBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  titleHead: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  fashion: {
    fontSize: 16,
    color: '#FFF', // Couleur de texte gris pour une meilleure lisibilité
    textAlign: 'center', // Centre le texte
    marginTop: 10,
  },
  ContainerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: '#fff', // Fond blanc pour la barre de boutons
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#FF6A69', // Couleur de fond du bouton sélectionné
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#333', // Couleur du texte des boutons non sélectionnés
    fontSize: 16,
  },
  activeButtonText: {
    color: '#FFF', // Couleur du texte du bouton sélectionné
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  productFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  ////////////////////////////////////////////////////////////

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carouselContainer: {
    overflow: "hidden",
  },
  slide: {
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  sup: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  collectionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
