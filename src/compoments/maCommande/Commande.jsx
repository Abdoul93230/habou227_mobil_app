import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from "@env";
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const Commande = () => {
  const navigation = useNavigation()
  const [myAllComande, setMyAllCommandes] = useState(null);
  const [rond, setRond] = useState(false);
  const [selectedButton, setSelectedButton] = useState('En cours'); // État initial





  useEffect(() => {
    const fetchData = async()=>{
      const jsonValue = await AsyncStorage.getItem('userEcomme');
        const user = JSON.parse(jsonValue);
    setRond(true)
    axios
      .get(`${API_URL}/getCommandesByClefUser/${user.id}`)
      .then((res) => {
        setRond(false)
        setMyAllCommandes(res.data.commandes);
      })
      .catch((error) => {console.log(error)
        setRond(false)
      });
    }
    fetchData()
  }, []);


  const nbrCommandesEnCours = myAllComande?.filter(
    (param) => param.statusLivraison === "en cours"
  )?.length;
  const nbrCommandesRecues = myAllComande?.filter(
    (param) => param.statusLivraison === "recu"
  )?.length;

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  function getFormattedDay(date) {
    const options = { weekday: "long" };
    const formattedDay = new Intl.DateTimeFormat("fr-FR", options).format(date);
    return formattedDay;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.commande}>Ma commande</Text>
      <View style={styles.toucheCommande}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              selectedButton === 'En cours' && styles.btnSelected,
            ]}
            onPress={() => setSelectedButton('En cours')}
          >
            <Text style={styles.btnText}>
              En cours <Text style={styles.countText}>{nbrCommandesEnCours}</Text>
            </Text>
          </TouchableOpacity>
          {selectedButton === 'En cours' && (
            <View style={styles.notifi}>
              <Text style={styles.btnNoti}>{nbrCommandesEnCours} </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              selectedButton === 'Récus' && styles.btnSelected,
            ]}
            onPress={() => setSelectedButton('Récus')}
          >
            <Text style={styles.btnText}>
              Récus <Text style={styles.countText}>{nbrCommandesRecues}</Text>
            </Text>
          </TouchableOpacity>
          {selectedButton === 'Récus' && (
            <View style={styles.notifi}>
              <Text style={styles.btnNoti}>{nbrCommandesRecues}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Contenu de la page */}
      <ScrollView style={styles.pageContent} showsVerticalScrollIndicator={false}>
        {selectedButton === 'En cours' && (
          <>
            { myAllComande
                ?.filter((param) => param.statusLivraison === "en cours")
                .reverse()?.map((param, index) => (
              <TouchableOpacity key={index} style={styles.cardNoti} onPress={() => navigation.navigate('Suivre la commande')}>
                <View style={styles.gaucheCard}>
                  <Text style={styles.jourText}>{getFormattedDay(new Date(param.date))}</Text>
                  <View style={styles.produitContent}>
                    <Text style={styles.ProduitName}>NBRS Produit</Text>
                    <Text style={styles.ProduitNumber}>{param.nbrProduits.length} Produit</Text>
                  </View>
                </View>
                <View style={styles.separator}></View>
                <View style={styles.droiteCard}>
                  <Text style={styles.dateText}>{formatDate(new Date(param.date))}</Text>
                  <View style={styles.produitDroite}>
                    <Text style={styles.ProduitName}>Prix Total</Text>
                    <Text style={styles.ProduitNumber}>{param.prix} F CFA</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {selectedButton === 'Récus' && (
          <>
            {myAllComande
                ?.filter((param) => param.statusLivraison === "recu")
                .reverse()?.map((param, index) => (
              <View key={index} style={styles.cardNoti}>
                <View style={styles.gaucheCard}>
                  <Text style={styles.jourText}>{getFormattedDay(new Date(param.date))}</Text>
                  <View style={styles.produitContent}>
                    <Text style={styles.ProduitName}>NBRS Produit</Text>
                    <Text style={styles.ProduitNumber}>{param.nbrProduits.length} Produit</Text>
                  </View>
                </View>
                <View style={styles.separator}></View>
                <View style={styles.droiteCard}>
                  <Text style={styles.dateText}>{formatDate(new Date(param.date))}</Text>
                  <View style={styles.produitDroite}>
                    <Text style={styles.ProduitName}>Prix Total</Text>
                    <Text style={styles.ProduitNumber}>{param.prix} F CFA</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Commande;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    padding: width * 0.03, // Padding responsive
  },
  commande: {
    fontSize: width * 0.065, // Taille de police responsive
    fontWeight: 'bold',
    color: '#515C70',
    marginBottom: width * 0.03, // Marge responsive
  },
  toucheCommande: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Centre les éléments verticalement
    marginVertical: height * 0.02, // Marge responsive
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: width * 0.02, // Marge responsive
  },
  btn: {
    paddingVertical: height * 0.015, // Padding responsive
    paddingHorizontal: width * 0.04, // Padding responsive
    borderRadius: 30,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSelected: {
    backgroundColor: '#FF6A69',
  },
  btnText: {
    fontSize: width * 0.04, // Taille de police responsive
    color: '#FFF',
    fontWeight: 'bold',
  },
  countText: {
    fontSize: width * 0.035, // Taille de police responsive
    color: '#FFF',
  },
  btnNoti: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  notifi: {
    position: 'absolute',
    right: width * -0.02, // Positionnement responsive
    top: height * -0.025, // Positionnement responsive
    backgroundColor: '#FF6A69',
    borderRadius: 10,
    paddingHorizontal: width * 0.015, // Padding responsive
    paddingVertical: height * 0.005, // Padding responsive
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContent: {
    flex: 1,
    padding: width * 0.02, // Padding responsive
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15
  },
  cardNoti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    padding: width * 0.02,
    marginVertical: 5,
    alignItems: 'center', // Centre les éléments verticalement
  },
  gaucheCard: {
    flex: 1,
    justifyContent: 'center',
  },
  produitContent: {
    marginTop: 10, // Ajuste l'espacement
    marginHorizontal: 20,
  },
  droiteCard: {
    flex: 1, // Prend l'autre moitié de la largeur de la carte
    alignItems: 'flex-end',
    justifyContent: 'center', // Centre le contenu verticalement
    padding: width * 0.02,
  },
  produitDroite: {
    marginTop: 20,
    width: '100%',
  },
  jourText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#515C70',
    bottom: 20
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#515C70',
    bottom: 20

  },
  ProduitName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#515C70',
  },
  ProduitNumber: {
    fontSize: 12,
    color: '#515C70',
  },
  separator: {
    width: 1,
    backgroundColor: '#555',
    height: '100%', // Ajuste la hauteur pour bien s'adapter à la carte
    marginHorizontal: width * 0.02,
  },
});
