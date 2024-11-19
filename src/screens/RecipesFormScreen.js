import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function RecipesFormScreen({ route }) {
  const navigation = useNavigation();
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route?.params || {};

  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [ingredients, setIngredients] = useState(recipeToEdit ? recipeToEdit.ingredients : "");
  const [instructions, setInstructions] = useState(recipeToEdit ? recipeToEdit.instructions : "");
  const [prepTime, setPrepTime] = useState(recipeToEdit ? recipeToEdit.prepTime : "");
  const [servings, setServings] = useState(recipeToEdit ? recipeToEdit.servings : "");
  const [calories, setCalories] = useState(recipeToEdit ? recipeToEdit.calories : "");
  const [difficulty, setDifficulty] = useState(recipeToEdit ? recipeToEdit.difficulty : "");

  const saverecipe = async () => {
    try {
      if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
        alert("Please fill in all required fields");
        return;
      }

      const newrecipe = {
        id: recipeToEdit ? recipeToEdit.id : Date.now().toString(),
        title,
        image,
        ingredients,
        instructions,
        prepTime,
        servings,
        calories,
        difficulty,
        createdAt: recipeToEdit ? recipeToEdit.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let recipes = [];
      const storedRecipes = await AsyncStorage.getItem("customrecipes");
      
      if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
      }

      if (recipeToEdit) {
        // Update existing recipe
        recipes[recipeIndex] = {
          ...recipes[recipeIndex],
          ...newrecipe
        };
      } else {
        // Add new recipe
        recipes.push(newrecipe);
      }

      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
      
      if (onrecipeEdited) {
        onrecipeEdited();
      }
      
      navigation.goBack();
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>
        {recipeToEdit ? "Edit Recipe" : "Add New Recipe"}
      </Text>

      <TextInput
        placeholder="Recipe Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>
          Enter an image URL above to preview
        </Text>
      )}

      <TextInput
        placeholder="Ingredients (one per line)"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Instructions (step by step)"
        value={instructions}
        onChangeText={setInstructions}
        multiline
        numberOfLines={6}
        style={[styles.input, styles.textArea]}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Preparation Time (e.g., 30 minutes)"
        value={prepTime}
        onChangeText={setPrepTime}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Number of Servings"
        value={servings}
        onChangeText={setServings}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Calories per Serving"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Difficulty Level (Easy, Medium, Hard)"
        value={difficulty}
        onChangeText={setDifficulty}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>
          {recipeToEdit ? "Update Recipe" : "Save Recipe"}
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: wp(4),
    marginBottom: hp(2),
    fontSize: hp(1.8),
    color: "#1F2937",
  },
  textArea: {
    height: hp(15),
    textAlignVertical: "top",
  },
  image: {
    width: "100%",
    height: hp(20),
    borderRadius: 8,
    marginBottom: hp(2),
  },
  imagePlaceholder: {
    width: "100%",
    height: hp(20),
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginBottom: hp(2),
    textAlign: "center",
    textAlignVertical: "center",
    color: "#6B7280",
  },
  saveButton: {
    backgroundColor: "#2563EB",
    padding: wp(4),
    borderRadius: 8,
    alignItems: "center",
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: hp(2),
    fontWeight: "600",
  },
  bottomPadding: {
    height: hp(4),
  },
});