import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ProductsSli = ({ products, name }) => {

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

        <TouchableOpacity onPress={() => navigation.navigate('Category', { name })} style={styles.link}>
          <Text style={styles.more}>View More</Text>
          <Icon name="chevrons-right" size={20} />
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
                  <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { id: param._id })} style={styles.midel}>
                    <Image source={{uri:param.image1}} style={styles.image} />
                  </TouchableOpacity>
                  <View style={styles.bottomContent}>
                    <Text style={styles.name}>{param.name.slice(0, 9)}...</Text>
                    {param.prixPromo > 0 ? (
                      <>
                        <Text style={styles.oldPrice}>f {param.prix}</Text>
                        <Text style={styles.newPrice}>f {param.prixPromo}</Text>
                      </>
                    ) : (
                      <Text style={styles.newPrice}>f {param.prix}</Text>
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
    textTransform: 'capitalize',
  },
  more: {
    textTransform: 'capitalize',
  },
  before: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF6969',
    width: '90%',
    height: 2,
  },
  after: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6969',
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
  },
  slide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carde: {
    height: 170,
    shadowColor: '#000',
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
    backgroundColor: 'rgba(255, 145, 0, 0.815)',
    borderRadius: 5,
    padding: 2,
    zIndex:1
  },
  proText: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 12,
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
  },
  newPrice: {
    color: '#5c6c86',
    marginVertical: 1,
    fontSize: 12,
  },
});

export default ProductsSli;
