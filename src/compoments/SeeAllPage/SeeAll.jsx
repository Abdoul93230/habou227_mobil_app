import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SeeAll = ({cards}) => {
    const navigation = useNavigation();
    const [expandedCard, setExpandedCard] = useState(cards[0].id);

    // console.log(cards[0].id);


    const toggleCard = (id) => {
        setExpandedCard(expandedCard === id ? cards[0].id : id);
    };


    const renderCard = ({ item }) => (
        <TouchableOpacity style={styles.cardMain}  onPress={() => toggleCard(item.id)}>

        <View style={styles.cardMainHeader}>
            <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="cover"
            />

            {expandedCard === item.id && (
                <View style={styles.cardContent}>
                <Text style={styles.cardTitlee}>{item.description}</Text>
                {item.items.map((subItem, index) => (
                    <TouchableOpacity
                    key={index}
                    style={styles.cardLigne}
                    onPress={() => console.log(`Voir plus pressed for ${subItem}`)}
                    >
                        <Text style={styles.cardLink}>{subItem}</Text>
                        <View style={styles.cardIcon}>
                            <AntDesign name="right" size={10} color="white" />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            )}

        </View>
        <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
        </View>

        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Toutes les catégories</Text>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <EvilIcons name="close" size={32} fontWeight="bold" color="#B17236" />
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
        marginTop:Platform.OS==="android"?20:0
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#B17236"
    },
    closeButton: {
        padding: 5,
    },
    listContainer: {
        padding: 10,
    },
    cardMain: {
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
    cardMainHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 15,
        resizeMode: 'cover',
    },
    cardTitleContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 5,
    },
    cardContent: {
        flex: 1,
        backgroundColor: '#b28f5fb0',
        padding: 10,
        borderRadius: 12,
        height: 100
    },
    cardTitlee: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#30A08B",
        textTransform: "capitalize"
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#B17236",
        textTransform: "capitalize"
    },
    cardLigne: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: "#30A08B",
        borderBottomWidth: 1,
        paddingVertical: 4,
        height: 'auto'
    },
    cardLink: {
        fontSize: 14,
        color: '#fff',
    },
    cardIcon: {
        backgroundColor: '#30A08B',
        padding: 5,
        borderRadius: 50,
        height: 20,width: 20,
    }
});

export default SeeAll;
