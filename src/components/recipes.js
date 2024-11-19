import { View, Text, Pressable, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.idFood}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No recipes found</Text>
          }
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      testID="articleDisplay"
      onPress={() => navigation.navigate('RecipeDetail', item)}
    >
      <Image 
        source={{ uri: item.recipeImage }}
        style={[
          styles.articleImage,
          { height: index % 3 === 0 ? hp(25) : hp(35) }
        ]}
      />
      <Text style={styles.articleText} numberOfLines={2}>
        {item.recipeName}
      </Text>
      <Text style={styles.articleDescription} numberOfLines={2}>
        {item.cookingDescription}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2),
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  emptyText: {
    textAlign: 'center',
    fontSize: hp(2),
    color: '#666',
    marginTop: hp(4),
  },
  cardContainer: {
    flex: 1,
    margin: wp(2),
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  articleImage: {
    width: '100%',
    height: hp(20),
    resizeMode: 'cover',
  },
  articleText: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#374151',
    padding: wp(2),
  },
  articleDescription: {
    fontSize: hp(1.6),
    color: '#6B7280',
    paddingHorizontal: wp(2),
    paddingBottom: wp(2),
  },
});