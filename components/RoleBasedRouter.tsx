import { useAuth } from "@/context/AuthContext";
import React from "react";
import AdminNavigator from "./AdminNavigator";
import AuthNavigator from "./AuthNavigator";
import CustomerNavigator from "./CustomerNavigator";
import SplashScreen from "./SplashScreen";

export default function RoleBasedRouter() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
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
