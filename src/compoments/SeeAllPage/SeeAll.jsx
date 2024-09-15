import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SeeAll = ({cards}) => {
    const navigation = useNavigation();
    const [expandedCard, setExpandedCard] = useState(1);



    const toggleCard = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
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
                <Text style={styles.cardTitle}>{item.description}</Text>
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
        backgroundColor: '#F5F6F8',
        padding: 10,
        borderRadius: 12,
        height: 100
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
        paddingVertical: 4,
        height: 'auto'
    },
    cardLink: {
        fontSize: 14,
        color: '#515C70',
    },
    cardIcon: {
        backgroundColor: '#515C70',
        padding: 5,
        borderRadius: 50,
        height: 20,width: 20,
    }
});

export default SeeAll;
