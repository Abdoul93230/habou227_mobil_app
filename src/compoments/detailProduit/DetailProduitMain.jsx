import { StyleSheet, Image,
   View, Dimensions, FlatList, Text,
    TouchableOpacity, Modal,
    PanResponder, Animated, Pressable
   } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useRef, useEffect, useState } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Macbook  from "../../image/macbook cote.png"
const { width } = Dimensions.get('window'); // Largeur de l'écran pour le carrousel


const DetailProduitMain = () => {
  const flatListRef = useRef(null);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [selectedImageURL, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current; 

  const [tailleImageB, setTailleImageB] = useState(null);
  const [tailleImage, setTailleImage] = useState(null);
  const [tailleNumber, setTailleNumber] = useState(null);

  const handlePress = (index) => {
    setTailleImageB(index);
  };
  const contColor = (nbr)=>{
    setTailleImage(nbr)
  }
  
  const handlePressTaillle = (size) => {
    setTailleNumber(size);
  };
  const [carousel] = useState([
    { id: '1', image: require('../../image/ordinateur14.jpg') },
    { id: '2', image: require('../../image/ordinateur14.jpg') },
    { id: '3', image: require('../../image/ordinateur14.jpg') },
    { id: '4', image: require('../../image/ordinateur14.jpg') },
    { id: '5', image: require('../../image/ordinateur14.jpg') },
    { id: '6', image: require('../../image/ordinateur14.jpg') },
  ]);
  const [activeButton, setActiveButton] = useState('details');

  useEffect(() => {
    let currentIndex = 0;

    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        currentIndex = (currentIndex + 1) % carousel.length;
        flatListRef.current.scrollToIndex({
          index: currentIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }, 3000); // Défilement toutes les 3 secondes

    return () => clearInterval(scrollInterval); // Nettoyage de l'intervalle à la désactivation du composant
  }, [carousel]);

  const handleDetailsPress = () => {
    setActiveButton('details'); // Met à jour l'état du bouton actif
    // Alert.alert('Details', 'Afficher les détails du produit.');
    // Ajoutez ici le code pour naviguer ou afficher les détails du produit
  };
  const rating = [3,4,5,2,5];

  const handleReviewsPress = () => {
    setActiveButton('reviews'); // Met à jour l'état du bouton actif
    // Alert.alert('Reviews', 'Afficher les avis du produit.');
    // Ajoutez ici le code pour naviguer ou afficher les avis du produit
  };
  const handleImageClick = (id, image) => {
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
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      // Optionally handle the release event if needed
    }
  });
  return (
    <View style={styles.container} >
      <View style={styles.box}>
        <FlatList
          ref={flatListRef}
          data={carousel}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item.image} style={styles.image} />
            </View>
          )}
        />
      </View>
      <View style={styles.detail}>
        <TouchableOpacity
          style={[styles.buttonDetail, activeButton === 'details' && styles.activeButton]}
          onPress={handleDetailsPress}>
          <Text style={styles.text}>Details</Text>
          <MaterialCommunityIcons name="arrow-bottom-right" size={18} color="#515C70" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonDetail, activeButton === 'reviews' && styles.activeButton]}
          onPress={handleReviewsPress}>
          <Text style={styles.text}>Reviews</Text>
          <MaterialCommunityIcons name="arrow-bottom-right" size={18} color="#515C70" />
        </TouchableOpacity>
      </View>

      <View style={styles.additionalDetails}>
        {activeButton === 'details' ? (
          <View style={styles.detailsContentPara}>
            <View style={styles.detailsContent}>
              <View style={styles.brand}>
                <Text style={styles.title}>Brand</Text>
                <Text style={styles.para}>Inconnu</Text>
                <Text style={styles.title}>Livraison</Text>
                <Text style={styles.para}>Offerte (Niamey)</Text>
              </View>

              <View style={styles.category}>
                <Text style={styles.title2}>Category</Text>
                <Text style={styles.para2}>Électroniques</Text>
                <Text style={styles.title2}>Fitting</Text>
                <Text style={styles.para2}>True to size</Text>
              </View>
            </View>

   
          
        <Text>
          Selectionner la color: {tailleImage !== null && <Text>Color: {tailleImage}</Text>}
        </Text>
      <View style={styles.cardTaille}>
        {[1, 2, 3, 4, 5].map((param, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.boxCard,
              tailleImageB === index && { borderColor: '#FF6A69', borderWidth: 2 }
            ]}
            onPress={() => {
              handlePress(index);
              contColor(param);
            }}>
            <Image source={Macbook} style={styles.boxTaille} />
          </TouchableOpacity>
        ))}
      </View>

      <Text>Selectionner la taille: {tailleNumber !== null && <Text>Taille: {tailleNumber}</Text>}</Text>

        <View style={styles.cardTaille}>
      <View style={styles.cardTaille}>
        {[38, 40, 42, 43, 44].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.boxNumber,
              tailleNumber === size && { borderColor: '#FF6A69', borderWidth: 2 }
            ]}
            onPress={() => handlePressTaillle(size)}
          >
            <Text>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
       
       

        </View>

            <View>
              <Text style={styles.theiere}>Théière à profil élégant turc marocain arabe avec filtre intégré - GSC038</Text>
              <Text style={styles.title}>Attributs clés:</Text>
              <Text style={styles.para}>• Dispositif: Cette théière est équipée d'un couvercle, assurant ainsi une durabilité accrue. Le couvercle permet également de conserver la chaleur du liquide à l'intérieur, préservant ainsi la saveur de votre boisson préférée.</Text>
              <Text style={styles.para}>• Type: Un accessoire essentiel pour les amateurs de café et de thé. Cette théière combine une esthétique turque marocaine avec une fonctionnalité moderne.</Text>
              <Text style={styles.para}>• Matériel: Fabriquée en métal de haute qualité, cette théière offre une durabilité exceptionnelle et résiste à l'usure quotidienne.</Text>
              <Text style={styles.para}>• Style de conception: Son design moderne ajoute une touche élégante à n'importe quelle cuisine ou espace de dégustation.</Text>
              <Text style={styles.para}>• Point d'origine: Fabriquée en Chine, dans la région de Guangdong.</Text>
              <Text style={styles.para}>• Marque nom: Aucune marque spécifique associée, mettant en avant la qualité du produit.</Text>
              <Text style={styles.para}>• Numéro de Type: GSC038 - un identifiant unique pour cette théière.</Text>
              <Text style={styles.para}>• Type en plastique: Aucun composant en plastique, soulignant la construction en métal de qualité.</Text>
              <Text style={styles.para}>• Type d'outils de café et de thé: Cette théière appartient à la catégorie des percolateurs, offrant une méthode traditionnelle pour préparer le café et le thé.</Text>
              <Text style={styles.para}>• Type des Outils de Boisson: Conçue spécialement pour préparer des lots de café & thé.</Text>
              <Text style={styles.para}>• Type en métal: Fabriquée en acier inoxydable, un matériau durable et facile à entretenir.</Text>
              <Text style={styles.para}>• Personnes applicables: Idéale pour les amateurs de café et de thé, cette théière s'adresse à ceux qui apprécient la préparation traditionnelle des boissons.</Text>
              <Text style={styles.para}>• Performance d'isolation thermique: Peut maintenir la chaleur de la boisson pendant 0 à 6 heures, garantissant une expérience de dégustation agréable.</Text>
              <Text style={styles.para}>• Type de bouteille: Conception de bouteille normale pour faciliter le versement.</Text>
              <Text style={styles.para}>• Forme: Avec une forme ronde, cette théière combine élégance et praticité.</Text>
              <Text style={styles.para}>• Production: Un pot à café bien conçu adapté à la fabrication de café.</Text>
              <Text style={styles.para}>• Nom du produit: Dallah Arabic Turkish - Un nom évoquant les influences arabes et turques dans le design.</Text>
              <Text style={styles.para}>• Fonction: Parfait pour préparer du café, cette théière est un incontournable pour les amateurs de caféine.</Text>
              <Text style={styles.para}>• Usage: Convient pour un usage domestique, dans les hôtels, les restaurants et les bureaux. Polyvalente et adaptable à divers environnements.</Text>
              <Text style={styles.para}>• Couleur: Personnalisable selon les préférences individuelles ou le thème de la cuisine.</Text>
              <Text style={styles.para}>• OEM&ODM: La personnalisation est hautement accueillie, offrant la possibilité d'ajouter une touche personnelle.</Text>
              <Text style={styles.para}>• Utilisé pour: Principalement utilisée comme une Stainless Steel Tea Pot, soulignant la polyvalence du produit.</Text>
              <Text style={styles.para}>• Matériel type: Fabriquée en acier inoxydable de type 201 - garantissant qualité et durabilité.</Text>
            </View>
            
            <Text style={styles.galerie__title}>Galeries</Text>
             
                <View style={styles.galerie__box}>
                  {carousel.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.galerie__box__img}
                      onPress={() => handleImageClick(item.image)}>
                      <Image source={item.image} style={styles.image} />
                    </TouchableOpacity>
                  ))}
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}>
               <SafeAreaView style={styles.containerModal}>
                <View style={styles.modelContainer}>
                  <View style={styles.card}>
                    <View style={styles.imageContainer}>
                      <Image source={Macbook} style={styles.macBook} />
                    </View>
                  </View>
                </View>

      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Nom du produit</Text>
          <Text style={styles.textPrice}>Prix du produit</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            mattis maximus eros, eu ullamcorper ante ullamcorper a. Phasellus
            turpis tellus, tempus at feugiat at, facilisis ac sem.
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
              // navigation.goBack();
            }}
          >
            <Text style={styles.textButton}>Acheter maintenant</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  </Modal>
          </View>
        ) : (
          <View>
          {
            [1,2,3,4,5].map((param,index)=>{
              return(
                <View key={index} style={styles.reviewsContent}>
            <View style={styles.cardProfil}>
              <View style={styles.profilName}>
                <Text style={styles.textName}>A</Text>
                <Text style={styles.textName}>S</Text>
              </View>
              <View style={styles.messageContainer}>
                <View style={styles.starIcon}>
                {[1, 2, 3, 4, 5].map((star) => (
                <AntDesign
                  key={star}
                  name='star'
                  size={18}
                  color={star <= rating[index] ? '#FF6A69' : 'black'} // Couleur des étoiles
                />
              ))}
                </View>
                <View>
                  <Text style={styles.name}>Abassa Soumana</Text>
                </View>
              </View>
              <View style={styles.date}>
                <Text>12/01/2024</Text>
              </View>
            </View>
        <View style={styles.commantaire}>
          <Text style={styles.textCommantaire}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae sequi architecto excepturi nihil illum reiciendis et, vitae amet assumenda distinctio.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>
          </View>
              )
            })
          }
          </View>
        )}
      </View>
    </View>
  );
};

export default DetailProduitMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginTop: 10,
    paddingBottom: 100,
  },
  box: {
    width: '100%',
    height: 270,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  carouselItem: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajuste l'image pour couvrir le conteneur
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '100%',
    height: 'auto',
  },
  buttonDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
  },
  activeButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: '#515C70',
  },
  additionalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  detailsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  reviewsContent: {
    width: '100%',
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    padding: 5,
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom:15
  },
  brand: {
    flex: 1,
  },
  category: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#515C70',
  },
  para: {
    fontSize: 14,
    color: '#525252db',
    marginBottom: 10,
  },
  title2: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#515C70',
    textAlign: 'right',
  },
  para2: {
    fontSize: 14,
    color: '#525252db',
    textAlign: 'right',
    marginBottom: 10,
  },
  cardTaille: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 100, // Adjusted to a reasonable height
  },
  boxCard: {
    width: 60,
    height: 60, 
    borderRadius: 50
  },
  boxTaille: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image scales correctly
    borderRadius: 50,
  },
  boxNumber: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: "#FF6A69",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.8,
  },
  

  theiere: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#000',
    marginBottom: 10,
  },
  detailsContentPara: {
    
  },

  galerie__title: {
    fontSize: 20,
    letterSpacing: 1,
    color: '#000',
    marginVertical: 10,
  },
  galerie__box: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#FFF',
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
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  starIcon: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    textAlign: 'left',
  },
  date: {
    justifyContent: 'center',
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
    backgroundColor: '#b9b9bb',
  },
  modelContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    
  },
  imageContainer: {
    width: '100%',
    height: 300, // Adjusted to a reasonable height
    justifyContent: 'center',
    alignItems: 'center',
  },
  macBook: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 28,
    color: '#051E47',
    fontWeight: 'bold',
  },
  textPrice: {
    fontSize: 28,
    color: '#FF6A69',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'justify',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6A69',
    padding: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
