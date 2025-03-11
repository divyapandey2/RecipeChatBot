import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList, Button, ScrollView ,Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchRecipeDetails } from './slice/recipeSlice';
import RenderHtml from 'react-native-render-html'; 
import { addToCart } from './slice/cartSlice';
import { addSearch } from './slice/historySlice';
                                                                                                                 
export default function Recipe({navigation}) { 
  const route = useRoute();
  const query = route?.params?.query || 'Choose your Food'; 
  const dispatch = useDispatch();
  
  const [selectedRecipeId, setSelectedRecipeId] = useState(null); 
  const { food, isLoading, error, selectedRecipe } = useSelector((state) => state.recipes);
 
  
  const handleSearch = (query) => {
    dispatch(addSearch(query));
  
  };

  const handleAddToCart = (ingredient) => {
    dispatch(addToCart(ingredient));  
  };

  useEffect(() => {
    handleSearch(query);
    dispatch(fetchRecipes(query));
  }, [dispatch, query]);

  const handleViewDetails = (id) => {
    if (selectedRecipeId === id) {
      setSelectedRecipeId(null);
    } else {
      setSelectedRecipeId(id);
      dispatch(fetchRecipeDetails(id));
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching recipes: {error}</Text>;
  }

  const renderRecipeDetails = ({ item: recipe }) => {
    const isSelected = selectedRecipeId === recipe.id;

    return (
      <View style={styles.recipeCard}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
          <View style={styles.headerContent}>
            <Text style={styles.recipeTitle} numberOfLines={2}>{recipe.title}</Text>
            <Button 
              title={isSelected ? "Hide Details" : "View Details"}
              onPress={() => handleViewDetails(recipe.id)}
              color="#4A90E2"
            />
          </View>
        </View>

        {isSelected && selectedRecipe && (
          <ScrollView style={styles.detailsContainer} nestedScrollEnabled={true}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {selectedRecipe.extendedIngredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>{ingredient.original}</Text>
                <Button 
                  title="Add to Cart"
                  onPress={() => handleAddToCart(ingredient)}
                  color="#2ECC71"
                />
              </View>
            ))}
            
            <Text style={styles.sectionTitle}>Instructions:</Text>
            <RenderHtml
              contentWidth={Dimensions.get('window').width - 40}
              source={{ html: selectedRecipe.instructions }}
              tagsStyles={{
                body: { color: 'black', fontSize: 16, lineHeight: 24 },
              }}
            />
          </ScrollView>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recipe}>Recipes for: {query}</Text>
      <FlatList
        data={food}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipeDetails}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingTop: 10,
  },
  listContainer: {
    padding: 16,
  },
  recipe: {
    fontSize: 24,
    color: '#2C3E50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontWeight: '600',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEF2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8EEF2',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  recipeImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#F0F3F7',
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
    height: 80,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1D1E',
    marginBottom: 8,
    lineHeight: 24,
  },
  detailsContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8EEF2',
    backgroundColor: '#FAFBFC',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
    marginTop: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEF2',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: '#4A5568',
    marginRight: 12,
    lineHeight: 20,
  },
  separator: {
    height: 20,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  cartButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  instructionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
});