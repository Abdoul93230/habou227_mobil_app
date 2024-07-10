import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';

const InfiniteCarousel = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width } = Dimensions.get('window');

    useEffect(() => {
        const marqueeWidth = width * 2; // Ensure the marquee is wide enough
        const scrollDirection = direction === 'right' ? marqueeWidth : -marqueeWidth;

        Animated.loop(
            Animated.sequence([
                Animated.timing(scrollX, {
                    toValue: scrollDirection,
                    duration: 11000, // Adjust duration for smoother scrolling
                    useNativeDriver: true,
                }),
                Animated.timing(scrollX, {
                    toValue: 0,
                    duration: 0, // Instant jump back to start
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scrollX, width]);

    return (
        <View style={styles.carouselContainer}>
            <Animated.View
                style={[
                    styles.marquee,
                    { transform: [{ translateX: scrollX }] },
                ]}
            >
                <Text style={styles.text}>Bienvenue sur notre plateforme de commerce électronique locale ! Achetez des produits locaux de qualité.</Text>
                <Text style={styles.text}>Bienvenue sur notre plateforme de commerce électronique locale ! Achetez des produits locaux de qualité.</Text> {/* Duplicate text for continuous scroll */}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        backgroundColor: '#FF6969',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        overflow: 'hidden',
    },
    marquee: {
        flexDirection: 'row',
        width: '200%',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 10,
    },
});

export default InfiniteCarousel;
