import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, logout, updateUserProfile } = useAuth();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handleChangePassword = () => {
    Alert.alert("Change Password", "Password change feature coming soon!");
  };

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "Support contact feature coming soon!");
  };

  const menuItems = [
    {
      id: "edit",
      title: "Edit Profile",
      icon: "✏️",
      onPress: handleEditProfile,
      color: "text-blue-600",
    },
    {
      id: "password",
      title: "Change Password",
      icon: "🔒",
      onPress: handleChangePassword,
      color: "text-blue-600",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: "🔔",
      onPress: () => setIsNotificationsEnabled(!isNotificationsEnabled),
      color: "text-gray-600",
      hasSwitch: true,
      switchValue: isNotificationsEnabled,
    },
    {
      id: "darkMode",
      title: "Dark Mode",
      icon: "🌙",
      onPress: () => setIsDarkMode(!isDarkMode),
      color: "text-gray-600",
      hasSwitch: true,
      switchValue: isDarkMode,
    },
    {
      id: "support",
      title: "Contact Support",
      icon: "💬",
      onPress: handleContactSupport,
      color: "text-blue-600",
    },
    {
      id: "about",
      title: "About App",
      icon: "ℹ️",
      onPress: () =>
        Alert.alert(
          "About",
          "KATS Travel App v1.0.0\nYour Journey, Our Service"
        ),
      color: "text-gray-600",
    },
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      className="bg-white rounded-lg shadow-sm p-4 mb-3"
      onPress={item.onPress}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <Text className="text-2xl mr-4">{item.icon}</Text>
          <Text className={`text-lg font-medium ${item.color}`}>
            {item.title}
          </Text>
        </View>
        {item.hasSwitch ? (
          <Switch
            value={item.switchValue}
            onValueChange={item.onPress}
            trackColor={{ false: "#767577", true: "#3b82f6" }}
            thumbColor={item.switchValue ? "#ffffff" : "#f4f3f4"}
          />
        ) : (
          <Text className="text-gray-400">›</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Profile Header */}
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-primary-500 rounded-full items-center justify-center mb-4">
              <Text className="text-4xl text-white font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-1">
              {user?.name || "User Name"}
            </Text>
            <Text className="text-gray-600 mb-2">{user?.email}</Text>
            <Text className="text-gray-500 text-sm">{user?.phone}</Text>
          </View>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 bg-primary-500 rounded-lg py-3"
              onPress={handleEditProfile}
            >
              <Text className="text-white font-semibold text-center">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-gray-500 rounded-lg py-3"
              onPress={handleChangePassword}
            >
              <Text className="text-white font-semibold text-center">
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Stats */}
        <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Account Statistics
          </Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary-600">3</Text>
              <Text className="text-gray-600 text-sm">Total Bookings</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">2</Text>
              <Text className="text-gray-600 text-sm">Completed</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-yellow-600">1</Text>
              <Text className="text-gray-600 text-sm">Pending</Text>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Settings
          </Text>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-500 rounded-lg py-4"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold text-center text-lg">
            Logout
          </Text>
        </TouchableOpacity>

        {/* App Version */}
        <View className="items-center mt-6">
          <Text className="text-gray-500 text-sm">KATS Travel App v1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}
