import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch list of recipes
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (query) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=72aa38298bd743debc60064344b3045a`);
    const data = await response.json();
    return data.results; 
  }
);

// Fetch individual recipe details
export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (id) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=72aa38298bd743debc60064344b3045a`);
    const data = await response.json();
    return data; 
  }
);

// Redux slice
const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    food: [],           // List of recipes
    isLoading: false,
    error: null,
    selectedRecipe: null, // Add selectedRecipe to store detailed recipe
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.food = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedRecipe = null;  // Reset the previous selected recipe
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;  // Store the selected recipe details
        state.isLoading = false;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default recipeSlice.reducer;
