import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import MyRecipeScreen from "../screens/MyRecipeScreen";
import CustomRecipesScreen from "../screens/CustomRecipesScreen";
import RecipesFormScreen from "../screens/RecipesFormScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="MyFood" component={MyRecipeScreen} />
      <Stack.Screen name="CustomRecipesScreen" component={CustomRecipesScreen} />
      <Stack.Screen name="RecipesFormScreen" component={RecipesFormScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}