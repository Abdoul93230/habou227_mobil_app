import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const Categories = ({ categories }) => {
  const navigation = useNavigation();
  const titre = "Categories";

  return (
    <View style={styles.container}>
      <Text style={styles.titre__img}>{titre}</Text>
      <ScrollView
        style={styles.menu}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => {
          if (index < 6 && category.name !== "all") {
            return (
              <TouchableOpacity
                key={index}
                style={styles.box__img}
                onPress={() => {
                  navigation.navigate("CategoriDetailPage", {
                    categoryId: category._id,
                  });
                }}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        })}
        <TouchableOpacity
          style={styles.seeAll}
          onPress={() => navigation.navigate("Voir tous")}
        >
          <View style={styles.seeAll__icon}>
            <AntDesign name="right" size={24} color="#B2905F" />
          </View>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  titre__img: {
    fontSize: 26,
    fontWeight: "bold",
    paddingHorizontal: 4,
    paddingVertical: 2,
    color: "#B17236",
  },
  menu: {
    flex: 1,
    padding: 6,
    borderWidth: 0,
  },
  box__img: {
    width: width * 0.2,
    height: width * 0.2,
    alignItems: "center",
    marginRight: 10,
    borderRadius: 50,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "#B17236",
    //     shadowOffset: { width: 0, height: 0.43 },
    //     shadowOpacity: 0.43,
    //     shadowRadius: 5,
    //     elevation: 5
    //   },
    //   android: {
    //     elevation: 5,
    //     shadowColor: "#B17236",
    //     shadowOffset: { width: 0, height: 3 },
    //     shadowOpacity: 0.63,
    //     elevation: 20,
    //     borderWidth: 1,
    //     borderColor: "#B17236",
    //   },
    // }),

    // shadow
    shadowColor: "#B17236",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Match border radius of box__img
    resizeMode: "cover",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: width * 0.026, // Consistent font size
    fontWeight: "400", // Normal weight text
    textTransform: "capitalize",
  },
  seeAll: {
    width: 100,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  seeAll__icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3, // Consistent elevation for Android
      },
    }),
  },
  seeAllText: {
    fontSize: 13, // Consistent font size
    fontWeight: "400", // Normal weight text
  },
});
