import { useAuth } from "@/context/AuthContext";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CustomerHomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {user?.name}!
          </Text>
          <Text className="text-gray-600">
            Discover amazing travel packages and book your next adventure.
          </Text>
        </View>

        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Available Packages
          </Text>
          <Text className="text-gray-600 mb-4">
            No packages available at the moment. Check back later!
          </Text>
          <TouchableOpacity className="bg-primary-500 rounded-lg py-3 px-6">
            <Text className="text-white font-semibold text-center">
              Browse Packages
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-lg shadow-lg p-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-secondary-100 rounded-lg py-3 px-4">
              <Text className="text-secondary-800 font-medium">
                View My Bookings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-secondary-100 rounded-lg py-3 px-4">
              <Text className="text-secondary-800 font-medium">
                Update Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 rounded-lg py-3 px-4"
              onPress={handleLogout}
            >
              <Text className="text-white font-medium text-center">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
