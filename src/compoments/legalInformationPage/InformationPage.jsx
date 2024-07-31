import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const InformationPage = () => {
  const [data, setData] = useState([
    { titre: '1. Introduction :', description: "Bienvenue sur notre page de confidentialité. Chez [VotreEntreprise], nous sommes attachés à protéger la confidentialité de vos données personnelles. Cette politique explique comment nous collectons, utilisons, stockons et partageons vos informations. En utilisant notre site, vous acceptez les pratiques décrites dans cette politique de confidentialité." },
    { titre: '2. Conditions générales d\'utilisation (CGU) :', description: "Bienvenue sur Chagona-ne.onrender.com. En utilisant ce site, vous acceptez nos CGU et notre politique de confidentialité. Assurez-vous de lire attentivement ces conditions avant d'utiliser le site." },
    { titre: '3. Politique de confidentialité :', description: "Chez Chagona-ne, nous respectons la confidentialité de nos utilisateurs. Nous collectons uniquement les données personnelles nécessaires pour traiter les commandes et améliorer l'expérience utilisateur. Pour plus d'informations, veuillez consulter notre politique de confidentialité complète." },
    { titre: '4. Politique de cookies :', description: "Notre site utilise des cookies pour améliorer votre expérience de navigation. En continuant à utiliser notre site, vous acceptez notre utilisation des cookies conformément à notre politique de cookies." },
    { titre: '5. Conditions de vente :', description: "En passant commande sur Chagona-ne.onrender.com, vous acceptez nos conditions de vente. Les prix des produits incluent la TVA et excluent les frais d'expédition. Les paiements peuvent être effectués par carte de crédit/débit ou via les Mobiles Money." },
    { titre: '6. Politique de retour et de remboursement :', description: "Si vous n'êtes pas satisfait de votre achat, vous pouvez retourner le produit dans les 30 jours suivant la réception pour un remboursement complet ou un échange. Veuillez consulter notre politique de retour pour les conditions détaillées." },
    { titre: '7. Droits d\'auteur et propriété intellectuelle :', description: "Le contenu et les images présents sur chagona-ne.onrender.com sont protégés par des droits d'auteur et appartiennent à chagona-ne SARL. Toute utilisation non autorisée du contenu est strictement interdite." },
    { titre: '8. Responsabilité :', description: "Nous nous efforçons de fournir des informations précises sur notre site, mais nous ne pouvons garantir leur exhaustivité et leur exactitude. Votre utilisation de ce site est à vos propres risques." },
    { titre: '9. Clause de non-responsabilité :', description: "Les informations fournies sur ce site sont à titre informatif uniquement et ne constituent pas un avis professionnel. Consultez toujours un professionnel qualifié pour des conseils spécifiques." },
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Informations légales :</Text>
      <View style={styles.cardNotice}>
        <Text style={styles.introductionText}>1 Mentions légales :</Text>
        <Text style={styles.para}>HabouCom SARL</Text>
        <Text style={styles.para}>Niamey/Niger/Bobiel</Text>
        <Text style={styles.para}>Chagona-ne@gmail.com</Text>
        <Text style={styles.para}>+227 87727501</Text>
      </View>
      {data.map((item, index) => (
        <View style={styles.cardNotice} key={index}>
          <Text style={styles.introductionText}>{item.titre}</Text>
          <Text style={styles.para}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default InformationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginBottom: 12,
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
  introductionText: {
    color: "#000",
    fontSize: 18,
    fontWeight: 'bold',
  },
  para: {
    color: "#000",
    marginTop: 5,
  },
});
