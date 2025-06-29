import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";



export default function SplashScreen() {
  const { checkAuthStatus } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Check authentication status
    const initializeApp = async () => {
      await checkAuthStatus();
    };

    initializeApp();
  }, [checkAuthStatus, fadeAnim, scaleAnim, slideAnim]);

  return (
    <View className="flex-1 bg-gradient-to-b from-primary-500 to-primary-700 justify-center items-center">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        }}
        className="items-center"
      >
        {/* Logo Container */}
        <View className="w-32 h-32 bg-white rounded-full items-center justify-center mb-6 shadow-lg">
          <Text className="text-4xl font-bold text-primary-600">🚌</Text>
        </View>

        {/* App Name */}
        <Text className="text-4xl font-bold text-white mb-2">KATS</Text>

        {/* Tagline */}
        <Text className="text-lg text-white/80 text-center px-8">
          Your Journey, Our Service
        </Text>
      </Animated.View>

      {/* Loading Indicator */}
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="absolute bottom-20"
      >
        <View className="flex-row space-x-2">
          <View className="w-3 h-3 bg-white/60 rounded-full animate-pulse" />
          <View
            className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <View
            className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </View>
      </Animated.View>

      {/* Version Info */}
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="absolute bottom-8"
      >
        <Text className="text-white/60 text-sm">Version 1.0.0</Text>
      </Animated.View>
    </View>
  );
}
