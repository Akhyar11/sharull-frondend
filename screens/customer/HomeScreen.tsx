import { useAuth } from "@/context/AuthContext";
import {
  apiService,
  BookingDetail,
  PackageWithDestinations,
} from "@/services/api";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomerHomeScreen() {
  const { user, logout } = useAuth();
  const [featuredPackages, setFeaturedPackages] = useState<
    PackageWithDestinations[]
  >([]);
  const [recentBookings, setRecentBookings] = useState<BookingDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [packageImages, setPackageImages] = useState<{ [key: string]: string }>(
    {}
  );

  const loadData = async () => {
    try {
      setLoading(true);

      // Load featured packages (limit to 3)
      const packagesResponse = await apiService.getPackages({
        limit: 3,
        orderBy: "created_at DESC",
      });

      if (packagesResponse.data) {
        setFeaturedPackages(packagesResponse.data.list);
      }

      // Load recent bookings (limit to 2)
      const bookingsResponse = await apiService.getBookings({
        limit: 2,
        orderBy: "created_at DESC",
      });

      if (bookingsResponse.data) {
        setRecentBookings(bookingsResponse.data.list);
      }
    } catch (error) {
      console.error("Error loading home data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6">
        {/* Welcome Section */}
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {user?.name}!
          </Text>
          <Text className="text-gray-600">
            Discover amazing travel packages and book your next adventure.
          </Text>
        </View>

        {/* Featured Packages Section */}
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">
              Featured Packages
            </Text>
            <TouchableOpacity onPress={() => router.push("/packages" as Href)}>
              <Text className="text-primary-500 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          {featuredPackages.length > 0 ? (
            <View className="space-y-4">
              {featuredPackages.map((pkg) => (
                <TouchableOpacity
                  key={pkg.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  onPress={() => router.push(`/packages/${pkg.id}` as Href)}
                >
                  <View className="flex-row space-x-4">
                    {pkg.destinations.length > 0 &&
                      pkg.destinations[0].image_id && (
                        <Image
                          source={{
                            uri: apiService.getImage(
                              pkg.destinations[0].image_id
                            ),
                          }}
                          className="w-20 h-20 rounded-lg"
                          resizeMode="cover"
                        />
                      )}
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-gray-800 mb-1">
                        {pkg.name}
                      </Text>
                      <Text className="text-gray-600 text-sm mb-2">
                        {pkg.destinations.map((d) => d.name).join(", ")}
                      </Text>
                      <Text className="text-primary-500 font-bold">
                        {formatPrice(pkg.price)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="bg-gray-50 rounded-lg p-6 items-center">
              <Text className="text-gray-500 text-center mb-3">
                No packages available at the moment
              </Text>
              <TouchableOpacity
                className="bg-primary-500 rounded-lg py-2 px-4"
                onPress={() => router.push("/packages" as Href)}
              >
                <Text className="text-white font-medium">Browse Packages</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Recent Bookings Section */}
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">
              Recent Bookings
            </Text>
            <TouchableOpacity onPress={() => router.push("/bookings" as Href)}>
              <Text className="text-primary-500 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          {recentBookings.length > 0 ? (
            <View className="space-y-4">
              {recentBookings.map((booking) => (
                <View
                  key={booking.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-lg font-semibold text-gray-800">
                      {booking.package_data.name}
                    </Text>
                    <View
                      className={`px-2 py-1 rounded-full ${getStatusColor(
                        booking.payment_status
                      )}`}
                    >
                      <Text className="text-xs font-medium">
                        {booking.payment_status}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-600 text-sm mb-2">
                    {formatDate(booking.booking_date)} •{" "}
                    {booking.number_of_seats} people
                  </Text>
                  <Text className="text-primary-500 font-bold">
                    {formatPrice(booking.total_price)}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-gray-50 rounded-lg p-6 items-center">
              <Text className="text-gray-500 text-center mb-3">
                No bookings yet. Start exploring packages!
              </Text>
              <TouchableOpacity
                className="bg-primary-500 rounded-lg py-2 px-4"
                onPress={() => router.push("/packages" as Href)}
              >
                <Text className="text-white font-medium">Explore Packages</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Actions Section */}
        <View className="bg-white rounded-lg shadow-lg p-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <TouchableOpacity
              className="bg-secondary-100 rounded-lg py-3 px-4"
              onPress={() => router.push("/bookings" as Href)}
            >
              <Text className="text-secondary-800 font-medium">
                View My Bookings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-secondary-100 rounded-lg py-3 px-4"
              onPress={() => router.push("/profile" as Href)}
            >
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
