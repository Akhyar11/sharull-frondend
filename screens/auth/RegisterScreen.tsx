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

interface RegisterScreenProps {
  onBackToLogin: () => void;
}

export default function RegisterScreen({ onBackToLogin }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { register, error, clearError } = useAuth();

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, []);

  const validateName = (name: string) => {
    if (!name) {
      setNameError("Name is required");
      return false;
    } else if (name.length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

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

  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError("Phone number is required");
      return false;
    } else if (phone.length < 10) {
      setPhoneError("Please enter a valid phone number");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const handleRegister = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPhoneValid = validatePhone(phone);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isPhoneValid) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await register({ name, email, password, phone });
      if (result.success) {
        // Navigation will be handled by RoleBasedRouter
        Alert.alert("Success", result.message);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (nameError) validateName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) validatePassword(text);
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    if (phoneError) validatePhone(text);
  };

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
              Create Account
            </Text>
            <Text className="text-gray-600 text-center">
              Join us and start your journey
            </Text>
          </View>

          {/* Error Display */}
          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}

          {/* Register Form */}
          <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <View className="space-y-4">
              {/* Name Input */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">
                  Full Name
                </Text>
                <TextInput
                  className={`border rounded-lg px-4 py-3 text-gray-800 ${
                    nameError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={handleNameChange}
                  autoCapitalize="words"
                  editable={!isLoading}
                />
                {nameError ? (
                  <Text className="text-red-500 text-sm mt-1">{nameError}</Text>
                ) : null}
              </View>

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

              {/* Phone Input */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">
                  Phone Number
                </Text>
                <TextInput
                  className={`border rounded-lg px-4 py-3 text-gray-800 ${
                    phoneError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  editable={!isLoading}
                />
                {phoneError ? (
                  <Text className="text-red-500 text-sm mt-1">
                    {phoneError}
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

              {/* Register Button */}
              <TouchableOpacity
                className={`rounded-lg py-3 px-6 mt-4 ${
                  isLoading ? "bg-gray-400" : "bg-primary-500"
                }`}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text className="text-white font-semibold text-center text-lg">
                  {isLoading ? "Creating account..." : "Create Account"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Link */}
          <View className="bg-white rounded-lg shadow-sm p-6">
            <Text className="text-center text-gray-600">
              Already have an account?{" "}
              <Text
                className="text-primary-500 font-semibold"
                onPress={onBackToLogin}
              >
                Sign in here
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
