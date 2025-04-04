import { StyleSheet, Text, View, Animated, Dimensions, Image, FlatList, Platform } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "@env";

const Bienvennue__page = ({ categories }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const { width } = Dimensions.get('window');
    const [allPub, setAllPub] = useState([]);

    const [carousel, setCarousel] = useState([
        { id: '1', image: require('../../image/ordinateur14.jpg')},
        { id: '2', image: require('../../image/ordinateur14.jpg')},
        { id: '3', image: require('../../image/ordinateur14.jpg')},
        { id: '4', image: require('../../image/ordinateur14.jpg') },
        { id: '5', image: require('../../image/ordinateur14.jpg')},
    ]);

    useEffect(() => {
        axios
          .get(`${API_URL}/productPubget`)
          .then((pub) => {
            // console.log(pub.data.length)
            // if (pub.data.length > 0) {
              setAllPub(pub.data);
            // } else {
            //   setAllPub([]);
            // }
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);

    useEffect(() => {
        const marqueeWidth = width * 1;

        Animated.loop(
            Animated.sequence([
                Animated.timing(scrollX, {
                    toValue: -marqueeWidth,
                    duration: 11000,
                    useNativeDriver: true,
                }),
                Animated.timing(scrollX, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scrollX, width]);

    useEffect(() => {
        let currentIndex = 0;

        const scrollInterval = setInterval(() => {
            if (flatListRef.current && allPub.length > 0) {
                currentIndex = (currentIndex + 1) % allPub.length;
                flatListRef.current.scrollToIndex({
                    index: currentIndex,
                    animated: true,
                    viewPosition: 0.5,
                });
            }
        }, 3000);

        return () => clearInterval(scrollInterval);
    }, [allPub]);

    return (
        <View style={styles.container}>
            <View style={styles.box__marque}>
                <Animated.View style={[styles.marquee, { transform: [{ translateX: scrollX }] }]}>
                    <Text style={styles.text__marque__text}>
                        Bienvenue sur notre plateforme de commerce électronique locale! Achetez des produits locaux de qualité. {'   '}
                        Bienvenue sur notre plateforme de commerce électronique locale! Achetez des produits locaux de qualité.
                    </Text>
                </Animated.View>
            </View>
            <View style={styles.latestContainer}>
                <Text style={styles.latestText}>Latest</Text>
            </View>
            <View style={styles.card__menu}>
                <FlatList
                    ref={flatListRef}
                    data={allPub}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.carouselItem}>
                            <Image source={{uri:item.image}} style={styles.carouselImage} />
                        </View>
                    )}
                />
            </View>

             <View style={styles.box__marque__deux}>
                <Animated.View style={[styles.marquee, { transform: [{ translateX: scrollX }] }]}>
                    <Text style={styles.text__marque__text}>
                        Bienvenue sur notre platforme de commerce électronique locale! Achetez des produits locaux de qualité. {'   '}
                        Bienvenue sur notre platforme de commerce électronique locale! Achetez des produits locaux de qualité.
                    </Text>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box__marque: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        maxWidth: '100%',
        height: 35,
        backgroundColor: "#30A08B", // Couleur saumon plus vive
        overflow: "hidden",
    },
    box__marque__deux: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        maxWidth: '100%',
        height: 35,
        backgroundColor: "#30A08B", // Assortir avec le premier marquee
        overflow: "hidden",
    },
    marquee: {
        flexDirection: 'row',
        width: '300%',
    },
    text__marque__text: {
        color: "#fff", // Marron plus foncé pour un meilleur contraste
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    latestContainer: {
        top: 15,
        alignItems: 'start',
        marginHorizontal: 15,
        position: "relative",
    },
    latestText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#B17236', // Bleu royal pour plus d'éclat
    },
    card__menu: {
        top: 20,
        height: 230,
        marginHorizontal: 15,
        borderRadius: 15,
        position: "relative",
        overflow: 'hidden',
        // ...Platform.select({
        //     ios: {
        //         shadowColor: "#B2905F",
        //         shadowOffset: { width: 0, height: 1},
        //         shadowOpacity: 0.25,
        //         shadowRadius: 3.84,
        //         elevation: 5,
        //     },
        //     android: {
        //         shadowColor: "#B2905F",
        //         shadowOffset: {width: 0, height: 0.30},
        //         shadowOpacity: 0.10,
        //         shadowRadius: 5,
        //         elevation: 1,
        //     }

        // })
    },
    carouselItem: {
        width: Dimensions.get('window').width - 30, // Ajuster la largeur
        height: '100%',
        marginRight: 10,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
    },
});

export default Bienvennue__page;
