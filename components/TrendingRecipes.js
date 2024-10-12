import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [port, setPort] = useState(8090); // Initial port

  useEffect(() => {
    const connectWebSocket = (currentPort) => {
      const ws = new WebSocket(`ws://192.168.1.9:${currentPort}`);
      
      ws.onopen = () => {
        console.log(`WebSocket connected on port ${currentPort}`);
      };

      ws.onmessage = (event) => {
        console.log('Received data:', event.data);
        const newRecipes = JSON.parse(event.data);
        setRecipes(newRecipes);
      };

      ws.onerror = (error) => {
        console.log('WebSocket error:', error);
        // If there's an error, try next port
        if (currentPort === 8090) {
          console.log('Trying port 8091...');
          setPort(8091); // Set next port and reconnect
        }
      };

      ws.onclose = () => {
        console.log(`WebSocket disconnected from port ${currentPort}`);
      };
    };

    connectWebSocket(port);
  }, [port]);

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
          horizontal={true}
        />
      ) : (
        <Text style={styles.nothing}>No trending recipes available</Text>
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
    color: 'black',
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
    color: 'black',
  },
  nothing: {
    padding: 10,
    fontSize: 12,
    color: 'black',
  },
});

export default TrendingRecipes;
