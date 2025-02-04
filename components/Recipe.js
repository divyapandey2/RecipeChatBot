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
    setSelectedRecipeId(id);  
    dispatch(fetchRecipeDetails(id)); 
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching recipes: {error}</Text>;
  }

  const renderRecipeDetails = ({ item: recipe }) => {
    return (
      <View style={styles.recipeContainer}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Image source={{ uri: recipe.image }} style={{ width: 100, height: 100,borderRadius:50 }} />
        <View style={styles.button}>
        <Button title="View Details" onPress={() => handleViewDetails(recipe.id)} />
        </View>
        {selectedRecipeId === recipe.id && selectedRecipe && (
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.recipeDetailsContainer}>
              <Text style={styles.ingredientsTitle}>Ingredients:</Text>
              {selectedRecipe.extendedIngredients.map((ingredient, index) => (
               <View key={index} style={styles.ingredientItem}>
               <Text style={styles.ingredientText}>{ingredient.original}</Text>
               <Button title="Add to Cart"
                 onPress={() => handleAddToCart(ingredient)}/>
             </View>
              ))}
              <Text style={styles.instructionsTitle}>Instructions:</Text>
              <RenderHtml
                contentWidth={Dimensions.get('window').width}
                source={{ html: selectedRecipe.instructions }}
                tagsStyles={{
                  body: { color: 'black', fontSize: 14 },  
                }}
              />
              
            </View>
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
      />
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   width: Dimensions.get('window').width
  // },
  recipe: {
    fontSize: 18,
    color: 'black',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    fontWeight: 'bold',
    marginLeft: 10,
    backgroundColor: 'lavender',
    alignItems: 'center',
    // alignContent: 'center',
  
  },
  recipeContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  button: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    
  },
  recipeTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeDetailsContainer: {
    padding: 10,
  },
  scrollViewContainer: {
    flex: 1,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },

});
