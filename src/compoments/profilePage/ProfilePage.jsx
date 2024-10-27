import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Modal,ScrollView, TouchableWithoutFeedback, Animated, Platform,Alert, ActivityIndicator } from 'react-native';
import React, { useState, useRef,useEffect } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Ionicons } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../../image/Profile.jpg';
import Invite from '../invitéAmi/Invite';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { API_URL } from "@env";
import Toast from 'react-native-toast-message';
// import { ScrollView } from 'native-base';

// const API_URL = "https://secoure.onrender.com"



const ProfilePage = () => {
  const navigation = useNavigation()
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [imageP, setImageP] = useState(null);
  const [scaleValue] = useState(new Animated.Value(0));
  const [phone, setPhone] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [onsubmit, setOnsubmit] = useState(false);

  const handleAlert = (message) => {
    Toast.show({
      type: 'success',
      text1: 'success',
      text2: message,
      position: 'top',
      visibilityTime: 5000,
      autoHide: true,
      bottomOffset: 40,

    });
  };

  const handleAlertwar = (message) => {
    Toast.show({
      type: 'error',
      text1: 'error',
      text2: message,
      position: 'top',
      visibilityTime: 5000,
      autoHide: true,
      bottomOffset: 40,

    });
  };

  const onSub = async(e) => {
    e.preventDefault();
    if (nom.trim().length < 3) {
      return handleAlertwar(
        "Votre nom doit etre superieur ou inferieur a 3 caracteres"
      );
    } else if (!regexMail.test(email)) {
      return handleAlertwar("forma du mail non valid!");
    } else if (!regexPhone.test(phone.toString())) {
      return handleAlertwar("forma du numero non valid!");
    }


      const formData = new FormData();
      formData.append("name", nom);
      formData.append("email", email);
      formData.append("phone", Number(phone));
      if (imageP) {
        // Obtenez les informations du fichier, y compris la taille
    const fileInfo = await FileSystem.getInfoAsync(imageP);

    if (fileInfo.size > 5 * 1024 * 1024) { // Limite de 4 Mo

      return Alert.alert("L'image ne doit pas dépasser 5 Mo.");
    }
        // Extraire l'extension du fichier pour déterminer le type MIME
        const extension = imageP.split('.').pop().toLowerCase();
        let mimeType = '';

        // Définir le type MIME en fonction de l'extension
        switch (extension) {
          case 'jpg':
          case 'jpeg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          case 'gif':
            mimeType = 'image/gif';
            break;
          default:
            handleAlertwar('Format de fichier non pris en charge');
            return;
        }

        // Ajouter l'image au formData
        formData.append("image", {
          uri: imageP,
          type: mimeType, // Utiliser le type MIME dynamique
          name: `photo.${extension}`, // Nom dynamique basé sur l'extension
        });
      }

      formData.append("id", user.id);



      setLoading(true);
      axios
        .post(`${API_URL}/createProfile`, formData)
        .then((Profile) => {
          console.log(formData)
          if (Profile.status === 200) {
            handleAlert(Profile.data.message);

            axios
              .get(`${API_URL}/getUserProfile`, {
                params: {
                  id: user.id,
                },
              })
              .then((Profiler) => {
                // console.log(Profiler);
                setLoading(false);
                closeModal()
                if (Profiler.data.data.numero) {
                  if (phone.length <= 0) {
                    setPhone(Profiler.data.data.numero);
                  }
                }
                console.log(Profile.data)
              })
              .catch((erro) => {
                setLoading(false);
                if (erro.response.status === 404)
                  setMessageEr(erro.response.data.message);
                console.log(erro.response);
              });
          } else {
            console.log({ err: Profile.data });
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 402) {
            handleAlertwar(error.response.data.message);

          }
          if (error.response.data.data?.keyPattern?.email) {
            handleAlertwar("Un utilisateur avec le même email existe déjà ");
            setEmail('')
          }
          if (error.response.data.data?.keyPattern?.phoneNumber) {
            handleAlertwar("Un utilisateur avec le même Numero existe déjà ");
            setPhone('')
          }
          console.log(error.response);
          closeModal()
        });


  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      const audioStatus = await Audio.requestPermissionsAsync();
      if (audioStatus.status !== 'granted') {
        alert('Sorry, we need audio permissions to make this work!');
      }
    }
  };





  useEffect(() => {
    getPermissionAsync();
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userEcomme');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(userData);
        if (userData) {
          axios
            .get(`${API_URL}/user`, {
              params: {
                id: userData.id,
              },
            })
            .then((response) => {
              const data = response.data.user;
              setNom(data.name);
              setEmail(data.email);
              setPhone(data?.phoneNumber ? data?.phoneNumber : "");
            })
            .catch((error) => {
              console.log(error.response.data.message);
            });

          axios
            .get(`${API_URL}/getUserProfile`, {
              params: {
                id: userData.id,
              },
            })
            .then((Profiler) => {
              setLoading(false);
              // console.log(Profiler.data);
              if (
                Profiler.data.data.image &&
                Profiler.data.data.image !==
                  `https://chagona.onrender.com/images/image-1688253105925-0.jpeg`
              ) {
                setImageP(Profiler.data.data.image);
                // console.log(Profiler.data.data);
              }
              // if (Profiler.data.data.numero) {
              //   if (phone.length <= 0) {
              //     setPhone(Profiler.data.data.numero);
              //   }
              // }
            })
            .catch((erro) => {
              setLoading(false);
              // if (erro.response.status === 404)
              //   console.log(erro.response.data.message);
              // console.log(erro.response);
            });
        }
      } catch (e) {
        console.error('Failed to load user data:', e);
      }
    };

    fetchUserData();
  }, []);

  const handleProfile = () => {
    setModalVisible(true);
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  }
  const changeImg = () => {
    setModalVisible(false);
  }


  const selectImage = async () => {
    Alert.alert(
      'Choisir une option',
      'Voulez-vous prendre une photo ou choisir dans la galerie ?',
      [
        {
          text: 'Prendre une photo',
          onPress: openCamera,
        },
        {
          text: 'Choisir une image',
          onPress: openImagePicker,
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };




  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.assets[0])

    if (!result.canceled) {
      setImageP(result.assets[0].uri);
    }
  };

  const openCamera = async () => {

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)

    if (!result.canceled) {
      setImageP(result.assets[0].uri);
    }
  };






  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.imgProfile}>
          <Image source={imageP?{uri:imageP} : Profile} style={styles.image} />
        </View>
        <View style={styles.textProfile}>
          <Text style={styles.name}>{nom}</Text>
          <Text style={styles.email}>{email}</Text>
          <TouchableOpacity style={styles.BtnEdit} onPress={handleProfile}>
            <Text style={styles.editText}>Editer le profil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Inviter les amis")}>
        <View style={styles.iconContainer}>
          <AntDesign name="addusergroup" size={24} color="#FFF" />
        </View>
        <Text style={styles.title}>Inviter des amis</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Service Page')}>
        <View style={styles.iconContainer}>
          <AntDesign name="questioncircleo" size={24} color="#FFF" />
        </View>
        <Text style={styles.title}>Service client</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Commande Page')}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="shopping-outline" size={24} color="#FFF" />
        </View>
        <Text style={styles.title}>Mes commandes</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Suggestion Page')}>
        <View style={styles.iconContainer}>
          <AntDesign name="plussquareo" size={24} color="#FFF" />
        </View>
        <Text style={styles.title}>Faire une suggestion</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name='right' size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
    </View>

      <Modal
        animationType="none"
        transparent={false} visible={modalVisible} onRequestClose={closeModal} >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
              <View style={styles.imgProfile} onPress={changeImg}>
              <Image source={imageP?{uri:imageP} : Profile} style={styles.image} />
              </View>
              <Ionicons onPress={selectImage} style={{marginTop:-30,marginLeft:38}} name="camera-outline" size={30} color="#30A08B" />
              <Text style={styles.modalInstruction}>(max 4MB)</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nom:</Text>
                <TextInput style={Platform.OS === 'ios' ? styles.input : styles.inputAndroid} placeholder='Name' onChangeText={(text=>setNom(text))} value={nom} />
                <Text style={styles.inputLabel}>Email:</Text>
                <TextInput style={Platform.OS === 'ios' ? styles.input : styles.inputAndroid} placeholder='Email' onChangeText={(text=>setEmail(text))} value={email} />
                <Text style={styles.inputLabel}>Téléphone:</Text>
                <TextInput style={Platform.OS === 'ios' ? styles.input : styles.inputAndroid} keyboardType="numeric" placeholder='Téléphone' onChangeText={(text=>setPhone(text))} value={phone.toString()} />
                <TouchableOpacity>
                  <Text style={styles.inputLabel}>Changer le mot de passe ?</Text>

                </TouchableOpacity>
              </View>

              <View style={styles.submit}>
                <TouchableOpacity onPress={closeModal} style={[styles.button, styles.buttonCancel]}>
                  <Text style={styles.buttonText}>Retour</Text>
                </TouchableOpacity>
                {
                  loading?<ActivityIndicator size="large" color="#30A08B" />:

                <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={onSub}>
                  <Text style={styles.buttonText}>Soumettre</Text>
                </TouchableOpacity>
                }
              </View>
            </Animated.View>
          </View>

      </Modal>
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: '100%',
    padding: 7,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: "#B2905F",
    marginVertical: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconContainer: {
    backgroundColor: '#B17236',
    borderRadius: 50,
    padding: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#FFF',
  },
  arrowContainer: {
    backgroundColor: '#30A08B',  // Couleur de fond des flèches
    borderRadius: 50,
    padding: 5,
  },




  profile: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: '#F8F9FA', // Couleur de fond légère pour la carte
  },
  imgProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#B2905F', // Couleur de l'ombre en accord avec la palette
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textProfile: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#B17236', // Couleur du nom
  },
  email: {
    fontSize: 14,
    color: '#B2905F', // Couleur de l'email
    marginBottom: 10,
  },
  BtnEdit: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#30A08B',
    borderRadius: 30,
    alignItems: 'center',
    width: 170,
    borderWidth: 1,
    borderColor: '#B2905F',
  },
  editText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },






  ///////////modal change Image /////
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    alignItems: 'center',
  },
  modalInstruction: {
    fontSize: 16,
    color: '#B2905F',
    // marginBottom: 20,
    // marginTop:-20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#B17236',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B2905F',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#B2905F',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
  },
  imgProfile: {
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePasswordText: {
    fontSize: 16,
    color: '#30A08B',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  submit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: '#B2905F',
  },
  buttonSubmit: {
    backgroundColor: '#30A08B',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
    ///////////modal change Image /////

});
