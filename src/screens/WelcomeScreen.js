import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();

  const startAnimation = useCallback(() => {
    try {
      // Reset values
      ring1padding.value = 0;
      ring2padding.value = 0;
      
      // Start animations
      setTimeout(() => {
        ring1padding.value = withSpring(ring1padding.value + hp(5), {
          damping: 15,
          stiffness: 90,
        });
      }, 100);
      
      setTimeout(() => {
        ring2padding.value = withSpring(ring2padding.value + hp(5.5), {
          damping: 15,
          stiffness: 90,
        });
      }, 300);

      // Navigate after animation
      const timer = setTimeout(() => {
        navigation.replace('Home');
      }, 2500);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Welcome Screen Error:", error);
      navigation.replace('Home');
    }
  }, [navigation, ring1padding, ring2padding]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View
        style={[styles.ring, { padding: ring2padding }]}
      >
        <Animated.View
          style={[styles.ring, { padding: ring1padding }]}
        >
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428926_1280.png' }}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBBF24",
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: hp(20),
    height: hp(20),
    borderRadius: hp(10),
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(4),
  },
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 3,
    opacity: 0.8,
    marginTop: hp(1),
  },
});