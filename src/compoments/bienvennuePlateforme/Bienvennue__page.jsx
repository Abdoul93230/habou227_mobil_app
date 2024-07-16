import { StyleSheet, Text, View, Animated, Dimensions, Image, FlatList } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';

const Bienvennue__page = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const { width } = Dimensions.get('window');
    
    const [carousel, setCarousel] = useState([
        { id: '1', image: require('../../image/ordinateur14.jpg')},
        { id: '2', image: require('../../image/ordinateur14.jpg')},
        { id: '3', image: require('../../image/ordinateur14.jpg')},
        { id: '4', image: require('../../image/ordinateur14.jpg') },
        { id: '5', image: require('../../image/ordinateur14.jpg')},
    ]);

    useEffect(() => {
        // Handle marquee animation
        const marqueeWidth = width * 1; // Adjust width as needed to ensure the text scrolls seamlessly
        
        Animated.loop(
            Animated.sequence([
                Animated.timing(scrollX, {
                    toValue: -marqueeWidth,
                    duration: 11000, // Adjust duration for smoother scrolling
                    useNativeDriver: true,
                }),
                Animated.timing(scrollX, {
                    toValue: 0,
                    duration: 0, // Instant jump to start
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scrollX, width]);

    useEffect(() => {
        // Automatic carousel scrolling
        let currentIndex = 0;

        const scrollInterval = setInterval(() => {
            if (flatListRef.current) {
                currentIndex = (currentIndex + 1) % carousel.length;
                flatListRef.current.scrollToIndex({
                    index: currentIndex,
                    animated: true,
                    viewPosition: 0.5,
                });
            }
        }, 3000); // Scroll every 3 seconds

        return () => clearInterval(scrollInterval); // Cleanup interval on unmount
    }, [carousel]);

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
                    data={carousel}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.carouselItem}>
                            <Image source={item.image} style={styles.carouselImage} />
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

export default Bienvennue__page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    box__marque: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        maxWidth: '100%',
        height: 30,
        backgroundColor: "#FF6A69",
        overflow: "hidden",
    },
    box__marque__deux: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        maxWidth: '100%',
        height: 30,
        backgroundColor: "#FF6A69",
        overflow: "hidden",
    },
    marquee: {
        flexDirection: 'row',
        width: '300%', // Ensure the text can scroll completely
    },
    text__marque__text: {
        color: "#fff",
        fontSize: 15,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    latestContainer: {
        top: 12,
        alignItems: 'start',
        marginHorizontal: 10,
        position: "relative",
    },
    latestText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#515C70', // Change as needed
    },
    card__menu: {
        top: 12,
        height: 220,
        marginHorizontal: 10,
        borderRadius: 10,
        position: "relative",
        overflow: 'hidden', // Ensure child elements respect rounded corners
    },
    carouselItem: {
        width: Dimensions.get('window').width, // Ensure each item takes full width
        height: '100%',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
