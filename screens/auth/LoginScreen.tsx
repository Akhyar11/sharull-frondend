import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RegisterScreen from "./RegisterScreen";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const { login, error, clearError } = useAuth();

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        // Navigation will be handled by RoleBasedRouter
        Alert.alert("Success", result.message);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    setShowRegister(true);
  };

  const goBackToLogin = () => {
    setShowRegister(false);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) validatePassword(text);
  };

  // Show register screen if showRegister is true
  if (showRegister) {
    return <RegisterScreen onBackToLogin={goBackToLogin} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gradient-to-b from-primary-50 to-white">
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-primary-500 rounded-full items-center justify-center mb-4">
              <Text className="text-3xl text-white font-bold">🚌</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-600 text-center">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Error Display */}
          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}

          {/* Login Form */}
          <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <View className="space-y-4">
              {/* Email Input */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">
                  Email Address
                </Text>
                <TextInput
                  className={`border rounded-lg px-4 py-3 text-gray-800 ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                {emailError ? (
                  <Text className="text-red-500 text-sm mt-1">
                    {emailError}
                  </Text>
                ) : null}
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Password</Text>
                <View className="relative">
                  <TextInput
                    className={`border rounded-lg px-4 py-3 text-gray-800 pr-12 ${
                      passwordError ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text className="text-gray-500">
                      {showPassword ? "🙈" : "👁️"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text className="text-red-500 text-sm mt-1">
                    {passwordError}
                  </Text>
                ) : null}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className={`rounded-lg py-3 px-6 mt-4 ${
                  isLoading ? "bg-gray-400" : "bg-primary-500"
                }`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white font-semibold text-center text-lg">
                  {isLoading ? "Signing in..." : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <View className="items-center mb-6">
            <TouchableOpacity>
              <Text className="text-primary-500 font-medium">
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className="bg-white rounded-lg shadow-sm p-6">
            <Text className="text-center text-gray-600">
              Don't have an account?{" "}
              <Text
                className="text-primary-500 font-semibold"
                onPress={goToRegister}
              >
                Create one here
              </Text>
            </Text>
          </View>

          {/* Demo Credentials */}
          <View className="mt-6 bg-gray-50 rounded-lg p-4">
            <Text className="text-gray-600 text-center text-sm mb-2">
              Demo Credentials:
            </Text>
            <Text className="text-gray-500 text-center text-xs">
              Email: demo@example.com{"\n"}
              Password: password123
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
