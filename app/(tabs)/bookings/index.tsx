import { router, Href } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import api from '@/services/api';
import { BookingDetail } from '@/types/api';

import BookingSummaryCard from '@/components/ui/BookingSummaryCard';
import TopAppBar from '@/components/ui/TopAppBar';

export default function BookingsScreen() {
  
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user/bookings');
      if (response.data && response.data.list) {
        setBookings(response.data.list);
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.msg || 'Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  

  

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-text-secondary">Loading your bookings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-red-500 text-lg">{error}</Text>
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
      <TopAppBar title="My Bookings" />
      <View className="p-4">
        <Text className="text-2xl font-bold text-text-primary mb-4">My Bookings</Text>

        {bookings.length > 0 ? (
          <View className="space-y-4">
            {bookings.map((booking) => (
              <BookingSummaryCard
                key={booking.id}
                booking={booking}
                onPress={() => router.push(`/bookings/${booking.id}` as Href)}
              />
            ))}
          </View>
        ) : (
          <View className="bg-surface rounded-md shadow-md p-6 items-center">
            <Text className="text-text-secondary text-center mb-3">
              You haven&#39;t made any bookings yet.
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
    </ScrollView>
  );
}
