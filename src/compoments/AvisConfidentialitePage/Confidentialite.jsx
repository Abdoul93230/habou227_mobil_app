import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Confidentialite = () => {
  const [data,setData] = useState([
    {titre:'1 Introduction :',description:"Bienvenue sur notre page de confidentialité. Chez [VotreEntreprise], nous sommes attachés à protéger la confidentialité de vos données personnelles. Cette politique explique comment nous collectons, utilisons,  stockons et partageons vos informations. En utilisant  notre site, vous acceptez les pratiques décrites dans  cette politique de confidentialité.",},
    {titre:'2 Données personnelles collectées :',description:"Nous pouvons collecter les types suivants de données personnelles lorsque vous utilisez notre site : votre nom, adresse e-mail, adresse postale, numéro  de téléphone, informations de paiement, et toute autre  information que vous choisissez de nous fournir  volontairement.",},
    {titre:'3 Buts de la collecte des données :',description:" Nous collectons vos données personnelles dans le but de traiter vos commandes, d'expédier des produits, de  communiquer avec vous concernant votre commande, de personnaliser votre expérience sur notre site, et de vous envoyer des communications  marketing si vous y avez consenti.",},
    {titre:'4 Base légale de la collecte des données :',description:"Nous collectons et traitons vos données personnelles  sur la base de votre consentement, de l'exécution d'un  contrat avec vous, de notre intérêt légitime à exploiter  notre site et à vous fournir nos services, ainsi que pour  respecter nos obligations légales.",},
    {titre:'5 Durée de conservation des données :',description:"Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les fins pour lesquelles elles ont été collectées, à moins que la loi ne l'exige autrement.",},
    {titre:'6 Droits des utilisateurs :',description:"Sous avez le droit d'accéder, de rectifier, de supprimer ou de restreindre l'utilisation de vos données personnelles. Vous pouvez également vous opposer au traitement de vos données à des fins de marketing. Pour exercer ces droits, veuillez nous contacter à l'adresse [adresse e-mail ou postale du responsable de la protection des données].",},
    {titre:'7 Sécurité des données :',description:"Nous prenons des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, altération, divulgation ou destruction.",},
    {titre:'8 Mises à jour de la politique de confidentialité :',description:"Cette politique de confidentialité peut être mise à jour périodiquement pour refléter les changements dans nos pratiques de gestion des données. La date de la dernière mise à jour sera indiquée en haut de la page.",},
    {titre:'9 Consentement :',description:"En utilisant notre site, vous consentez à la collecte, à l'utilisation et au partage de vos données personnelles conformément à cette politique de confidentialité.",},
    
  ])
  return (

    <ScrollView style={styles.conatiner} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Mention légale</Text>
      {
        data.map((item,index)=>{
          return <View style={styles.cardNotice} key={index}>
          <Text style={styles.introductionText}>{item.titre}</Text>
          <Text style={styles.para}>
          {item.description}
          </Text>
        </View>
        })
      }
    </ScrollView>
  )
}

export default Confidentialite

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#515C70",
    marginTop: 10,
    marginLeft: 10,
  },
  cardNotice: {
    backgroundColor: "#FcFcFc",
    padding: 10,
    height: 160,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  introductionText : {
    color: "#515C70",
    fontSize: 20,
    fontWeight: 'bold',
  },
  para: {
    color: "#000"
  }
})