import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const ProductsSli = ({ products, name,id }) => {
  // console.log(id)

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.productsSli}>
      <View style={styles.top}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.link}>
          <View style={styles.before} />
          <Text style={styles.title}>{name}</Text>
          <View style={styles.after} />
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => {
          navigation.navigate('CategoriDetailPage', { categoryId: id });
        }}
        style={styles.link}>
          <Text style={styles.more}>View More</Text>
          <Icon name="chevrons-right" size={20} color="#30A08B" />
          <View style={styles.before} />
          <View style={styles.after} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          paginationStyle={styles.pagination}
          loop={true}
          showsPagination={true}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          style={styles.swiper}
        >
          {Array(Math.ceil(products.length / 3)).fill().map((_, i) => (
            <View style={styles.slide} key={i}>
              {products.slice(i * 3, i * 3 + 3).map((param, index) => (
                <View style={[styles.carde, { width: screenWidth / 3 - 20 }]} key={index}>
                  {param.prixPromo > 0 && (
                    <View style={styles.pro}>
                      <Icon name="minus" size={12} color="white" />
                      <Text style={styles.proText}>
                        {Math.round(((param.prix - param.prixPromo) / param.prix) * 100)} %
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity onPress={() => navigation.navigate('Détail-Produit', { id: param._id })} style={styles.midel}>
                    <Image source={{uri:param.image1}} style={styles.image} />
                  </TouchableOpacity>
                  <View style={styles.bottomContent}>
                    <Text style={styles.name}>{param.name.slice(0, 9)}...</Text>
                    {param.prixPromo > 0 ? (
                      <>
                        <Text style={styles.oldPrice}>F {param.prix}</Text>
                        <Text style={styles.newPrice}>F {param.prixPromo}</Text>
                      </>
                    ) : (
                      <Text style={styles.newPrice}>F {param.prix}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productsSli: {
    width: '100%',
    height: 'auto',
    padding: 5,
    marginBottom: 10,
  },
  top: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    padding: 5,
    textAlign: 'center',
    color: '#515C6F',
    fontSize: 18,
    fontFamily: 'serif',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    textTransform: 'uppercase',
     fontSize: width * 0.03,
      color: "#30A08B"

  },
  more: {
    textTransform: "uppercase",
    color: "#30A08B"
  },
  before: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF9800',
    width: '90%',
    height: 2,
  },
  after: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF9800',
    width: '90%',
    height: 2,
  },
  bottom: {
    width: '100%',
    height: 200,
    paddingHorizontal: 3,
    marginTop: 10,
  },
  swiper: {
    height: '100%',
  },
  pagination: {
    bottom: -8,
    color: "#B17236"
  },
  slide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carde: {
    height: 170,
    shadowColor: '#B2905F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 5, // Add some space between the cards
  },
  pro: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#30a08ba7',
    borderRadius: 5,
    padding: 2,
    zIndex:1
  },
  proText: {
    marginLeft: 5,
    color: '#fff',
    fontSize: width * 0.025,
    fontWeight: 'bold',
  },
  midel: {
    width: '100%',
    height: '65%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bottomContent: {
    width: '100%',
    textAlign: 'left',
    paddingLeft: 4,
    marginBottom: 3,
  },
  name: {
    color: '#515C6F',
    marginVertical: 3,
  },
  oldPrice: {
    color: '#5c6c86',
    marginVertical: 1,
    textDecorationLine: 'line-through',
    fontSize: width * 0.025,
  },
  newPrice: {
    color: '#30A08B',
    marginVertical: 1,
    fontSize: width * 0.029,
    fontWeight: '500'
  },
  dot: {
    backgroundColor: '#B2905F', // Couleur des points non sélectionnés
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#30A08B', // Couleur du point sélectionné
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default ProductsSli;
