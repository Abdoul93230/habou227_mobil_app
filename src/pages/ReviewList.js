import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const ReviewList = ({ randomComments, DATA_Products }) => {
  // console.log(DATA_Products)
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {randomComments.length > 0 ? (
        randomComments.map((param, index) => {
          const etoiles = param.etoil;
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
                        color={star <= etoiles ? "#30A08B" : "#B2905F"}
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
                <Text style={styles.textCommantaire}>{param.description}</Text>
                {DATA_Products?.find((item) => item._id === param.clefProduct)
                  ?.pictures.length >= 2 ? (
                  <View style={styles.cardeimg}>
                    {DATA_Products?.find(
                      (item) => item._id === param.clefProduct
                    )?.pictures.length >= 2 ? (
                      DATA_Products?.find(
                        (item) => item._id === param.clefProduct
                      )?.pictures?.map((image, imgIndex) => (
                        <Image
                          key={imgIndex}
                          style={styles.image}
                          source={{ uri: image }}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          );
        })
      ) : (
        <Text>
          Aucun commentaire disponible pour ce produit pour le moment.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
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
    color: "#B2905F",
    fontWeight: "bold",
    top: 4,
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
  cardeimg: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 50,
    borderRadius: 10,
    marginRight: 5,
  },
});

export default ReviewList;
