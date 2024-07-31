import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

const QuestionPage = () => {
  const [data, setData] = useState([
    { titre: '1. Quels sont les modes de paiement acceptés sur votre site ?', description: "Nous acceptons les paiements par carte de crédit/débit (Visa, MasterCard,), Mobile Money (Airtel, Orange, Moov)." },
    { titre: '2. Quelle est la politique de livraison et combien de temps cela prendra-t-il ?', description: "Nous proposons une livraison standard et express. Le délai de livraison dépend de votre emplacement, mais en général, cela prend entre 3 à 7 jours ouvrables pour la livraison standard et 1 à 3 jours ouvrables pour la livraison express." },
    { titre: '3. Puis-je suivre ma commande en ligne ?', description: "Oui, une fois que votre commande a été expédiée, vous recevrez un numéro de suivi par e-mail, qui vous permettra de suivre l'état de votre commande en ligne." },
    { titre: '4. Proposez-vous des remises pour les achats en gros ?', description: "Oui, nous offrons des remises pour les achats en gros. Veuillez nous contacter pour plus de détails sur nos offres spéciales pour les grossistes." },
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Questions fréquemment posées :</Text>
      {
        data.map((item, index) => (
          <View style={styles.cardNotice} key={index}>
            <Text style={styles.introductionText}>{item.titre}</Text>
            <Text style={styles.para}>{item.description}</Text>
          </View>
        ))
      }
    </ScrollView>
  );
}

export default QuestionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#515C70",
    marginTop: 10,
    marginLeft: 10,
  },
  cardNotice: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FCB4A3",
    backgroundColor: "#FFF",
  },
  introductionText: {
    color: "#000",
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: "#FCB4A3",
    marginBottom: 5,
    padding: 5,
    borderRadius: 10,
  },
  para: {
    color: "#000",
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
