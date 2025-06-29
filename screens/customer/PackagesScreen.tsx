import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Package {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  availableSeats: number;
}

const mockPackages: Package[] = [
  {
    id: "1",
    name: "Bali Adventure",
    destination: "Bali, Indonesia",
    duration: "5 Days 4 Nights",
    price: 2500000,
    image: "🏝️",
    description:
      "Explore the beautiful island of Bali with amazing beaches and culture",
    rating: 4.8,
    availableSeats: 12,
  },
  {
    id: "2",
    name: "Yogyakarta Heritage",
    destination: "Yogyakarta, Indonesia",
    duration: "3 Days 2 Nights",
    price: 1500000,
    image: "🏛️",
    description: "Discover the rich heritage and culture of Yogyakarta",
    rating: 4.6,
    availableSeats: 8,
  },
  {
    id: "3",
    name: "Lombok Paradise",
    destination: "Lombok, Indonesia",
    duration: "4 Days 3 Nights",
    price: 1800000,
    image: "🏖️",
    description: "Experience the pristine beaches and natural beauty of Lombok",
    rating: 4.9,
    availableSeats: 15,
  },
];

export default function PackagesScreen() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "domestic", name: "Domestic" },
    { id: "international", name: "International" },
    { id: "adventure", name: "Adventure" },
    { id: "culture", name: "Culture" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderPackageCard = (pkg: Package) => (
    <TouchableOpacity
      key={pkg.id}
      className="bg-white rounded-lg shadow-lg mb-4 overflow-hidden"
    >
      <View className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 items-center justify-center">
        <Text className="text-6xl">{pkg.image}</Text>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">
            {pkg.name}
          </Text>
          <View className="bg-primary-500 rounded-full px-2 py-1">
            <Text className="text-white text-xs font-semibold">
              {pkg.rating} ⭐
            </Text>
          </View>
        </View>

        <Text className="text-gray-600 mb-2">{pkg.destination}</Text>
        <Text className="text-gray-500 text-sm mb-3">{pkg.duration}</Text>

        <Text className="text-gray-700 mb-3" numberOfLines={2}>
          {pkg.description}
        </Text>

        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-primary-600">
            {formatPrice(pkg.price)}
          </Text>
          <View className="bg-green-100 rounded-full px-3 py-1">
            <Text className="text-green-700 text-sm font-medium">
              {pkg.availableSeats} seats left
            </Text>
          </View>
        </View>

        <TouchableOpacity className="bg-primary-500 rounded-lg py-3 mt-4">
          <Text className="text-white font-semibold text-center">
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Travel Packages
          </Text>
          <Text className="text-gray-600">
            Discover amazing destinations and book your next adventure
          </Text>
        </View>

        {/* Search Bar */}
        <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <Text className="text-gray-500 text-center">
            🔍 Search packages...
          </Text>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className={`rounded-full px-4 py-2 mr-3 ${
                selectedCategory === category.id
                  ? "bg-primary-500"
                  : "bg-white border border-gray-300"
              }`}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === category.id
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Packages List */}
        <View>{mockPackages.map(renderPackageCard)}</View>

        {/* Empty State */}
        {mockPackages.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-6xl mb-4">📦</Text>
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              No packages available
            </Text>
            <Text className="text-gray-600 text-center">
              Check back later for new travel packages
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
