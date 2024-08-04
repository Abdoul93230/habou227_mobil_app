import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { shuffle } from "lodash";
import Ordi from '../image/Vnike2.jpg';

const Galerie__page = ({ products }) => {
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  function getRandomElements(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 6);
  }

  const prod1 = ["one", "two", "three", "four", "five", "six"];

  const produits = getRandomElements(products);


  const Table__Galerie = [
    { id: 1, image: Ordi, text: 'Text for image 1' },
    { id: 2, image: Ordi, text: 'Text for image 2' },
    { id: 3, image: Ordi, text: 'Text for image 3' },
    { id: 4, image: Ordi, text: 'Text for image 4' },
    { id: 5, image: Ordi, text: 'Text for image 5' },
    { id: 6, image: Ordi, text: 'Text for image 6' },
  ];

  const handleImageClick = (id) => {
    setSelectedImageIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.galerie__title}>Galeries</Text>
      <View style={styles.galerie__box}>
        {produits.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.galerie__box__img}
            onPress={() => handleImageClick(item._id)}
          >
            <Image source={{uri:item.image1}} style={styles.image} />
            {selectedImageIds.includes(item._id) && (
              <View style={styles.overlay}>
                <Text style={styles.imageText}>{item?.name.substring(0, 20)}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Galerie__page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
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
    backgroundColor: '#F0F0F0',
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
});
