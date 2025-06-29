import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TailwindTest() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <View className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
          Tailwind CSS Test
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          If you can see this styled text, Tailwind CSS is working correctly!
        </Text>
        <TouchableOpacity className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 rounded-lg py-3 px-6">
          <Text className="text-white font-semibold text-center">
            Test Button
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
