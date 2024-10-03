import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const newRecipes = JSON.parse(event.data);
      setRecipes(newRecipes);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup WebSocket connection on unmount
    return () => ws.close();
  }, []);

  const renderRecipeCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending Recipes</Text>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}  // To display cards in a horizontal scroll
        />
      ) : (
        <Text>No trending recipes available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
});

export default TrendingRecipes;
