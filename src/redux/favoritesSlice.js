import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const recipeExists = state.favoriterecipes.some(
        item => item.idFood === recipe.idFood || item.id === recipe.id
      );
      
      if (recipeExists) {
        state.favoriterecipes = state.favoriterecipes.filter(
          item => (item.idFood !== recipe.idFood && item.id !== recipe.id)
        );
      } else {
        state.favoriterecipes.push({
          ...recipe,
          idFood: recipe.idFood || recipe.id, // Handle both custom and preset recipes
          recipeName: recipe.recipeName || recipe.title, // Handle both naming conventions
          recipeImage: recipe.recipeImage || recipe.image,
          cookingDescription: recipe.cookingDescription || recipe.instructions,
        });
      }
    }
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;