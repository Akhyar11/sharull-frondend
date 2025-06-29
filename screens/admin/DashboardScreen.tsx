import { useAuth } from "@/context/AuthContext";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AdminDashboardScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const stats = [
    { title: "Total Users", value: "1,234", color: "bg-blue-500" },
    { title: "Total Bookings", value: "567", color: "bg-green-500" },
    { title: "Pending Payments", value: "89", color: "bg-yellow-500" },
    { title: "Active Packages", value: "45", color: "bg-purple-500" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </Text>
          <Text className="text-gray-600">
            Welcome back, {user?.name}! Here's an overview of your system.
          </Text>
        </View>

        <View className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <View key={index} className="bg-white rounded-lg shadow-lg p-4">
              <View className={`w-12 h-12 rounded-lg ${stat.color} mb-3`} />
              <Text className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </Text>
              <Text className="text-gray-600 text-sm">{stat.title}</Text>
            </View>
          ))}
        </View>

        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-primary-500 rounded-lg py-3 px-4">
              <Text className="text-white font-medium text-center">
                Manage Users
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-primary-500 rounded-lg py-3 px-4">
              <Text className="text-white font-medium text-center">
                Manage Packages
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-primary-500 rounded-lg py-3 px-4">
              <Text className="text-white font-medium text-center">
                View Bookings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-primary-500 rounded-lg py-3 px-4">
              <Text className="text-white font-medium text-center">
                Process Payments
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-lg shadow-lg p-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            System Status
          </Text>
          <View className="space-y-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">System Status</Text>
              <View className="bg-green-500 rounded-full w-3 h-3" />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Database</Text>
              <View className="bg-green-500 rounded-full w-3 h-3" />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">API Services</Text>
              <View className="bg-green-500 rounded-full w-3 h-3" />
            </View>
          </View>

          <TouchableOpacity
            className="bg-red-500 rounded-lg py-3 px-4 mt-4"
            onPress={handleLogout}
          >
            <Text className="text-white font-medium text-center">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
