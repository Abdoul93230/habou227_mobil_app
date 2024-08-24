import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SeeAll = () => {
    const navigation = useNavigation();

    const cards = [
        {
            id: '1',
            title: 'Homme',
            description: 'MacBook',
            items: ['Ordinateur', 'Ordinateur'],
            image: require("../../image/macbook profil.png")
        },
         {
            id: 1,
            title: 'Homme',
            description: 'MacBook',
            items: [
                'Ordinateur',
                'Ordinateur'
            ],
            image: require("../../image/macbook profil.png")
        },
        {
            id: 2,
            title: 'Homme',
            description: 'MacBook',
            items: [
                'Ordinateur',
                'Ordinateur'
            ],
            image: require("../../image/macbook profil.png")
        },
        {
            id: 3,
            title: 'Homme',
            description: 'MacBook',
            items: [
                'Ordinateur',
                'Ordinateur'
            ],
            image: require("../../image/macbook profil.png")
        },
        {
            id: 4,
            title: 'Tous',
            description: 'Tous',
            items: [],
            image: require("../../image/macbook profil.png")
        },
        {
            id: 5,
            title: 'Cuisine & ustensiles',
            description: 'Tous',
            items: [
                'Ordinateur'
            ],
            image: require("../../image/macbook profil.png")
        },
        {
            id: 6,
            title: 'Électroménager',
            description: 'Tous',
            items: [
                'Ordinateur'
            ],
            image: require("../../image/macbook profil.png")
        }
    ];

    const renderCard = ({ item }) => (
        <View style={styles.cardMain}>
            <View>
                <Image 
                    source={item.image} 
                    style={styles.cardImage}
                    resizeMode="cover"
                />
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.description}</Text>
                {item.items.map((subItem, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.cardLigne} 
                        onPress={() => console.log(`Voir plus pressed for ${subItem}`)}
                    >
                        <Text style={styles.cardLink}>{subItem}</Text>
                        <View style={styles.cardIcon}>
                            <AntDesign name="right" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Toutes les catégories</Text>
                <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={() => navigation.navigate('Home')}
                >
                    <EvilIcons name="close" size={30} color="#FF6969" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    listContainer: {
        padding: 10,
    },
    cardMain: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, 
        marginBottom: 15,
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15,
    },
    cardTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        marginTop: 5,
    },
    cardContent: {
        flex: 1,
        backgroundColor: '#F5F6F8',
        padding: 10,
        borderRadius: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardLigne: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    cardLink: {
        fontSize: 14,
        color: '#515C70',
    },
    cardIcon: {
        backgroundColor: '#515C70',
        padding: 5,
        borderRadius: 50,
    }
});

export default SeeAll;