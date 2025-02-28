import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';  
import { useNavigation } from '@react-navigation/native';// Correct icon import

 const apiKey = '72aa38298bd743debc60064344b3045a';
 const NonVeg = () => {
    const [recipes, setRecipes] = useState([]);
    const [isPolling, setIsPolling] = useState(true);
    const navigation = useNavigation();
  
    const fetchRecipes = async () => {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=meat&diet=non-vegetarian&type=main course&apiKey=${apiKey}`;
        try {
          const response = await axios.get(url);
          setRecipes(response.data.results);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
    

    useEffect(() => {
        if (isPolling) {
        fetchRecipes();

        const interval = setInterval(() => {
            fetchRecipes();
        }, 60000);
        return () => clearInterval(interval); 
        }
    }, [isPolling]);

    const handlePress = (recipes) => {
        setIsPolling(false);
        navigation.navigate('Recipe', { query:recipes.title});
    };

    const renderRecipeCard = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image}/>
            <Text style={styles.title}>{item.title}</Text>
        </View>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
          <Text style={styles.header}>Best Of Non-Vegetarian Recipes</Text>
          {recipes.length > 0 ? (
            <FlatList
              data={recipes}
              renderItem={renderRecipeCard}
              keyExtractor={(item) => item.id.toString()}
              horizontal
            />
          ) : (
            <Text style={styles.nothing}>No non-vegetarian recipes available</Text>
          )}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
      },
      header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
      },
      card: {
        width: 200,
        marginRight: 15,
        borderRadius: 8,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 1,
        backgroundColor: '#fff',
      },
      image: {
        height: 120,
        width: '100%',
      },
      title: {
        padding: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      },
      nothing: {
        padding: 10,
        fontSize: 14,
        color: '#555',
      },
    });
    
export default NonVeg;