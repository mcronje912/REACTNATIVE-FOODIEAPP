import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Add "My Food" category */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MyFood")}
          style={styles.categoryContainer}
        >
          <View style={[styles.imageContainer, styles.myFoodButton]}>
            <Image
              source={{uri: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1926&auto=format&fit=crop'}}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.categoryText}>My Food</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("FavoriteScreen")}
          style={styles.categoryContainer}
        >
          <View style={[styles.imageContainer, styles.myFoodButton]}>
            <Image
              source={{uri: 'https://images.unsplash.com/photo-1463740839922-2d3b7e426a56?q=80&w=1900&auto=format&fit=crop'}}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.categoryText}>My Favorites</Text>
        </TouchableOpacity>

        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonStyle = isActive ? styles.activeButton : styles.inactiveButton;
          
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={styles.categoryContainer}
            >
              <View style={[styles.imageContainer, activeButtonStyle]}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={styles.categoryText}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  categoryContainer: {
    marginRight: wp(4),
    alignItems: 'center',
  },
  imageContainer: {
    padding: wp(2),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  activeButton: {
    backgroundColor: "#F59E0B",
  },
  inactiveButton: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  categoryImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
  },
  categoryText: {
    fontSize: hp(1.6),
    marginTop: hp(1),
    color: '#374151',
  },
  myFoodButton: {
    backgroundColor: '#4ADE80',
  },
});