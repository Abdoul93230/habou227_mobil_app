import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SeeAll from '../compoments/SeeAllPage/SeeAll'
import { useSelector } from 'react-redux';

const SeePage = () => {
    const DATA_Types = useSelector((state) => state.products.types);
    const DATA_Categories = useSelector((state) => state.products.categories);

    // Function to map categories to their respective items
    const mapCategoriesToItems = () => {
      return DATA_Categories
          .filter(category => category.name.toLowerCase() !== 'all') // Filtrer la catégorie "Tous"
          .map(category => {
              const filteredItems = DATA_Types
                  .filter(type => type.clefCategories === category._id)
                  .map(type => type.name);

              return {
                  id: category._id,
                  title: category.name,
                  description: category.name,
                  items: filteredItems,
                  image: { uri: category.image }
              };
          });
  };


    const cards = mapCategoriesToItems();


    return (
        <View style={styles.container}>
            <SeeAll cards={cards} />
        </View>
    )
}

export default SeePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 90,
    }
})
