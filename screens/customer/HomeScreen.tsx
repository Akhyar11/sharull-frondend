import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { BookingDetail, PackageWithDestinations, Destination } from "@/types/api";
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
import StatusTag from "@/components/ui/StatusTag";
import PackageCard from "@/components/ui/PackageCard";
import BookingSummaryCard from "@/components/ui/BookingSummaryCard";
import TopAppBar from "@/components/ui/TopAppBar";

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
      const packagesResponse = await api.get('/user/packages', {
        params: {
          limit: 3,
          orderBy: "created_at DESC",
        },
      });

      if (packagesResponse.data && packagesResponse.data.list) {
        setFeaturedPackages(packagesResponse.data.list);
      }

      // Load recent bookings (limit to 2)
      const bookingsResponse = await api.get('/user/bookings', {
        params: {
          limit: 2,
          orderBy: "created_at DESC",
        },
      });

      if (bookingsResponse.data && bookingsResponse.data.list) {
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

  

  if (loading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-text-secondary mt-4">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TopAppBar title="Home" />
      <View className="p-6">
        {/* Welcome Section */}
        <View className="bg-surface rounded-lg shadow-md p-6 mb-6">
          <Text className="text-2xl font-bold text-text-primary mb-2">
            Welcome, {user?.name}!
          </Text>
          <Text className="text-text-secondary">
            Discover amazing travel packages and book your next adventure.
          </Text>
        </View>

        {/* Featured Packages Section */}
        <View className="bg-surface rounded-lg shadow-md p-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-text-primary">
              Featured Packages
            </Text>
            <TouchableOpacity onPress={() => router.push("/packages" as Href)}>
              <Text className="text-primary font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          {featuredPackages.length > 0 ? (
            <View className="space-y-4">
              {featuredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </View>
          ) : (
            <View className="bg-surface rounded-lg p-6 items-center">
              <Text className="text-text-secondary text-center mb-3">
                No packages available at the moment
              </Text>
              <TouchableOpacity
                className="bg-primary rounded-lg py-2 px-4"
                onPress={() => router.push("/packages" as Href)}
              >
                <Text className="text-text-primary font-medium">Browse Packages</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Recent Bookings Section */}
        <View className="bg-surface rounded-lg shadow-md p-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-text-primary">
              Recent Bookings
            </Text>
            <TouchableOpacity onPress={() => router.push("/bookings" as Href)}>
              <Text className="text-primary font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          {recentBookings.length > 0 ? (
            <View className="space-y-4">
              {recentBookings.map((booking) => (
                <BookingSummaryCard key={booking.id} booking={booking} />
              ))}
            </View>
          ) : (
            <View className="bg-surface rounded-lg p-6 items-center">
              <Text className="text-text-secondary text-center mb-3">
                No bookings yet. Start exploring packages!
              </Text>
              <TouchableOpacity
                className="bg-primary rounded-lg py-2 px-4"
                onPress={() => router.push("/packages" as Href)}
              >
                <Text className="text-text-primary font-medium">Explore Packages</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Actions Section */}
        <View className="bg-surface rounded-lg shadow-lg p-6">
          <Text className="text-xl font-semibold text-text-primary mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <TouchableOpacity
              className="bg-primary rounded-lg py-3 px-4"
              onPress={() => router.push("/bookings" as Href)}
            >
              <Text className="text-text-primary font-medium">
                View My Bookings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-primary rounded-lg py-3 px-4"
              onPress={() => router.push("/profile" as Href)}
            >
              <Text className="text-text-primary font-medium">
                Update Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-error rounded-lg py-3 px-4"
              onPress={handleLogout}
            >
              <Text className="text-text-primary font-medium text-center">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
