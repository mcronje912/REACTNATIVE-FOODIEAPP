import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favoriteRecipes = useSelector((state) => state.favorites.favoriterecipes);
  
  console.log('Favorite Recipes:', favoriteRecipes); // Debug log

  if (!favoriteRecipes || favoriteRecipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Text style={styles.goBackButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('RecipeDetail', item)}
    >
      <Image
        source={{ uri: item.recipeImage || item.image }}
        style={styles.recipeImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.recipeTitle} numberOfLines={1}>
          {item.recipeName || item.title}
        </Text>
        <Text style={styles.recipeDescription} numberOfLines={2}>
          {item.cookingDescription || item.instructions}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Favorite Recipes</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Text style={styles.goBackButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={favoriteRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.idFood || item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: wp(4),
  },
  header: {
    marginBottom: hp(3),
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: hp(2),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  emptyText: {
    fontSize: hp(2),
    color: "#6B7280",
    marginBottom: hp(2),
  },
  goBackButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: 8,
  },
  goBackButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
  listContainer: {
    paddingBottom: hp(4),
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: hp(2),
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    flexDirection: "row",
  },
  recipeImage: {
    width: wp(30),
    height: wp(30),
  },
  textContainer: {
    flex: 1,
    padding: wp(4),
    justifyContent: "center",
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: hp(1),
  },
  recipeDescription: {
    fontSize: hp(1.6),
    color: "#6B7280",
  },
});