import {Platform, StyleSheet, View, ScrollView, ActivityIndicator, Text, TouchableOpacity, Modal, TextInput, Button  } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import DetailProduit from "../compoments/detailProduit/DetailProduit";
import DetailProduitFooter from '../compoments/detailProduit/DetailProduitFooter';
import DetailProduitMain from '../compoments/detailProduit/DetailProduitMain';
import LoadingIndicator from './LoadingIndicator';
import { API_URL } from "@env";
import axios from 'axios';
import {AntDesign} from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProductDet = () => {
  const route = useRoute();
  const { id } = route.params;
  const [send, setsSend] = useState(false);
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [VP, setVp] = useState(null);
  const [color, setColor] = useState(null);
  const [taille, setTaille] = useState(null);
  const [nbrCol, setNbrCol] = useState(null);
  const [commente, setCommente] = useState("");
  const [Allcommente, setAllCommente] = useState([]);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Commentes = useSelector((state) => state.products.products_Commentes);
  const scrollViewRef = useRef(null);
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleCommentBoxToggle = () => {
    setIsCommentBoxVisible(!isCommentBoxVisible);
  };
  const chgColor = (couleur)=>{
    setColor(couleur)

  }
  const chgTail = (tail)=>{
    setTaille(tail)

  }
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userEcomme');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        if(userData){
          setUser(userData);
        }
        // const res = await axios.get(`${API_URL}/Product/${id}`);
        // setVp(res.data.data);
        setVp(DATA_Products.find((item)=>item._id===id));

        setLoading(false);
        // Défilement vers le haut lorsque les données sont chargées
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }





          axios
            .get(`${API_URL}/getAllCommenteProduitById/${id}`)
            .then((coments) => {
              setAllCommente(coments.data);
              // setAllCommente(DATA_Commentes?.filter(item=>item.clefProduct===id)?DATA_Commentes?.filter(item=>item.clefProduct===id):[]);

              console.log()
            })
            .catch((error) => {
              console.log(error);
            });





      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [id]);


  const handleAlert = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  const handleAlertwar = (message) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };


  const envoyer = () => {
    const regexNumber = /^[0-5]$/;
    setsSend(true)
   if(user){
    if (commente.trim().length < 3) {
      handleAlertwar("votre commentaire doit contenire au moin 3 carracteres.");
      setsSend(false)
      return;
    }
    if (!rating) {
      handleAlertwar("veuiller noter ce produit s'il vous plait.");
      setsSend(false)
      return;
    }
    if (!regexNumber.test(rating.toString())) {
      handleAlertwar("forma non valid de 1 a 5 s'il vous plait!");
      setsSend(false)
      return;
    }
    axios
      .post(`${API_URL}/createCommenteProduit`, {
        description: commente,
        clefProduct: VP?._id,
        clefType: VP?.ClefType,
        etoil: rating,
        userName: user.name,
      })
      .then((resp) => {
        handleAlert(resp.data.message);
        setIsCommentBoxVisible(false);
        setRating(null);
        setCommente("");

        axios
          .get(`${API_URL}/getAllCommenteProduitById/${id}`)
          .then((coments) => {
            setAllCommente(coments.data);
            setsSend(false)
          })
          .catch((error) => {
            handleAlertwar(error.response.data);
            setsSend(false)
            console.log(error);
          });
      })
      .catch((error) => {
        handleAlertwar(error.response.data);
        setsSend(false)
        console.log(error);
      });
   }else{
    handleAlertwar("veuiller vous connecter ou creer un compte.")
    return;
   }
  };



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6A69" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DetailProduit produit = {VP} />
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <DetailProduitMain chgColor={chgColor} chgTail={chgTail} produit = {VP} id={id} Allcommente={Allcommente} />
      </ScrollView>
      <DetailProduitFooter produit = {VP} color={color} taille={taille} id={id} />


      <TouchableOpacity style={styles.commenteBox} onPress={handleCommentBoxToggle}>
        <View style={styles.commente}>
          <Text style={{fontSize: 12}}>Commenter?</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={isCommentBoxVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.commentCard}>
          <Text style={styles.cardTitle}>Ajouter un commentaire</Text>
          <TextInput
            style={styles.textInput}
            multiline
            value={commente}
            onChangeText={e=>setCommente(e)}
            placeholder="Écrire un commentaire..."
          />
          <View style={styles.note}>
            <Text style={styles.noteProduit}>Notez ce produit</Text>

            <View style={styles.satrIcon}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <AntDesign name='staro' size={18} color={star <= rating ? '#FF6A69' : 'black'} />
            </TouchableOpacity>
          ))}
        </View>
          </View>
          {
            send?
              <><View style={styles.loadingContainer2}>
              <ActivityIndicator size="large" color="#FF6A69" />
              <Text style={styles.loadingText}>Chargement...</Text>
            </View></>
           :<><View style={styles.btn}>
           <Button title="Envoyer" onPress={ envoyer} />
           <Button title="Fermer" onPress={handleCommentBoxToggle} />
         </View></>
          }


        </View>
      </View>
</Modal>
    </View>

  );
};

export default ProductDet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
  },
  commenteBox: {
    position: 'absolute',
    transform: [{ translateY: 330 }], // Adjust this value to center the box vertically
  },
  commente: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {  width: 2, height: Platform.OS ===  'ios' ? 2 : 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Platform.OS === 'android' ?  5 : 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  commentCard: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
  fontSize: 18,
  marginBottom: 10,
},
  textInput: {
  width: '100%',
  height: 100,
  borderColor: '#CCCCCC',
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  textAlignVertical: 'top', // Ensures the text starts at the top for multiline input
},
note: {
  fontSize: 14,
  color: '#999999',
  marginBottom: 10,
},
satrIcon: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "40%",
  marginLeft:8,
  marginTop:6
},
noteProduit: {
  fontSize: 18,
  textAlign: "center",
},
btn: {
  width: "90%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5', // Fond de la page de chargement
},
loadingContainer2: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5', // Fond de la page de chargement
},
});







