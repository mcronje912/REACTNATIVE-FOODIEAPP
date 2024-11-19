import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function RecipeDetailScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  
  // Get recipe data from navigation params
  const recipe = route.params;
  
  // Check if recipe is in favorites
  const favoriteRecipes = useSelector((state) => state.favorites.favoriterecipes);
  const isFavorite = favoriteRecipes.some(item => item.idFood === recipe.idFood);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Recipe Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
        />
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{recipe.recipeName}</Text>
        <Text style={styles.category}>{recipe.recipeCategory}</Text>

        {/* Recipe Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Origin:</Text>
            <Text style={styles.infoText}>{recipe.recipeOrigin}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Type:</Text>
            <Text style={styles.infoText}>{recipe.recipeTags}</Text>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients?.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.ingredientText}>• {ingredient.ingredientName}: {ingredient.measure}</Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>{recipe.recipeInstructions}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    width: '100%',
    height: hp(40),
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    position: 'absolute',
    top: hp(2),
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    padding: wp(3),
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontWeight: '600',
    color: '#374151',
  },
  favoriteButton: {
    backgroundColor: 'white',
    padding: wp(3),
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoriteButtonText: {
    fontSize: hp(2.5),
    color: '#EF4444',
  },
  detailsContainer: {
    padding: wp(4),
  },
  title: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: hp(1),
  },
  category: {
    fontSize: hp(2),
    color: '#6B7280',
    marginBottom: hp(2),
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(3),
    backgroundColor: '#F3F4F6',
    padding: wp(4),
    borderRadius: wp(2),
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: hp(1.8),
    color: '#6B7280',
    marginBottom: hp(0.5),
  },
  infoText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#374151',
  },
  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: hp(2),
  },
  ingredientItem: {
    marginBottom: hp(1),
  },
  ingredientText: {
    fontSize: hp(1.8),
    color: '#4B5563',
  },
  instructionsText: {
    fontSize: hp(1.8),
    color: '#4B5563',
    lineHeight: hp(2.8),
  },
});