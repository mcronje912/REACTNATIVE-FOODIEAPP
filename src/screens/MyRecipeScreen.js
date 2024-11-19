import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchRecipes = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem("customrecipes");
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchRecipes();
    }
  }, [isFocused]);

  const handleAddRecipe = () => {
    navigation.navigate("RecipesFormScreen", {
      onrecipeEdited: fetchRecipes
    });
  };

  const handleRecipeClick = (recipe) => {
    navigation.navigate("RecipeDetail", recipe);
  };

  const deleteRecipe = async (index) => {
    try {
      const updatedRecipes = [...recipes];
      updatedRecipes.splice(index, 1);
      await AsyncStorage.setItem("customrecipes", JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  const editRecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
      onrecipeEdited: fetchRecipes
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>My Recipes</Text>

      <TouchableOpacity onPress={handleAddRecipe} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {recipes.length === 0 ? (
            <Text style={styles.emptyText}>No recipes added yet.</Text>
          ) : (
            recipes.map((recipe, index) => (
              <View key={index} style={styles.recipeCard}>
                <TouchableOpacity onPress={() => handleRecipeClick(recipe)}>
                  {recipe.image && (
                    <Image 
                      source={{ uri: recipe.image }} 
                      style={styles.recipeImage}
                    />
                  )}
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <Text style={styles.recipeDescription} numberOfLines={2}>
                    {recipe.instructions}
                  </Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editRecipe(recipe, index)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteRecipe(index)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: wp(4),
  },
  backButton: {
    marginBottom: hp(2),
  },
  backButtonText: {
    fontSize: hp(2),
    color: "#2563EB",
    fontWeight: "500",
  },
  header: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: hp(3),
  },
  addButton: {
    backgroundColor: "#2563EB",
    padding: wp(4),
    borderRadius: 8,
    alignItems: "center",
    marginBottom: hp(3),
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: hp(2),
    fontWeight: "600",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: hp(4),
  },
  emptyText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(4),
  },
  recipeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: wp(4),
    marginBottom: hp(2),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  recipeImage: {
    width: "100%",
    height: hp(20),
    borderRadius: 8,
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: hp(1),
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(2),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#10B981",
    padding: wp(3),
    borderRadius: 6,
    flex: 1,
    marginRight: wp(2),
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: wp(3),
    borderRadius: 6,
    flex: 1,
    marginLeft: wp(2),
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});