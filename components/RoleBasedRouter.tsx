import { useAuth } from "@/context/AuthContext";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import AdminNavigator from "./AdminNavigator";
import AuthNavigator from "./AuthNavigator";
import CustomerNavigator from "./CustomerNavigator";

export default function RoleBasedRouter() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return <AuthNavigator />;
  }

  // Route based on user role
  switch (user.role) {
    case "customer":
      return <CustomerNavigator />;
    case "admin":
      return <AdminNavigator />;
    default:
      return <AuthNavigator />;
  }
}
