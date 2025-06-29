import { useLocalSearchParams, router } from 'expo-router';
import { Href } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import api from '@/services/api';
import { BookingDetail } from '@/types/api';
import TopAppBar from '@/components/ui/TopAppBar';
import StatusTag from '@/components/ui/StatusTag';
import Button from '@/components/ui/Button';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams();
  const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await api.get(`/user/bookings/${id}`);
          setBookingDetail(response.data.data);
        } else {
          setError('Booking ID is missing.');
        }
      } catch (err: any) {
        console.error('Error fetching booking details:', err);
        setError(err.response?.data?.msg || 'Failed to load booking details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

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
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-text-secondary">Loading booking details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-error text-lg">{error}</Text>
      </View>
    );
  }

  if (!bookingDetail) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-text-secondary text-lg">Booking not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <TopAppBar title="Booking Details" showBackButton={true} onBackPress={() => router.back()} />
      <View className="p-4">
        <View className="bg-surface rounded-md shadow-md p-4 mb-4">
          <Text className="text-2xl font-bold text-text-primary mb-2">{bookingDetail.package_data.name}</Text>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg text-text-secondary">Booking Date:</Text>
            <Text className="text-lg text-text-primary">{formatDate(bookingDetail.booking_date)}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg text-text-secondary">Number of Seats:</Text>
            <Text className="text-lg text-text-primary">{bookingDetail.number_of_seats}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg text-text-secondary">Total Price:</Text>
            <Text className="text-xl font-bold text-primary">{formatPrice(bookingDetail.total_price)}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg text-text-secondary">Payment Status:</Text>
            <StatusTag status={bookingDetail.payment_status} />
          </View>
          {bookingDetail.notes && (
            <View className="mt-2">
              <Text className="text-lg font-semibold text-text-secondary mb-1">Notes:</Text>
              <Text className="text-text-primary">{bookingDetail.notes}</Text>
            </View>
          )}
        </View>

        {/* Payment History Section (Placeholder) */}
        <View className="bg-surface rounded-md shadow-md p-4 mb-4">
          <Text className="text-xl font-bold text-text-primary mb-4">Payment History</Text>
          <Text className="text-text-secondary">No payment history available.</Text>
        </View>

        {bookingDetail.payment_status === 'pending' && (
          <Button
            title="Make Payment"
            onPress={() => router.push(`/payments/create?bookingId=${bookingDetail.id}` as Href)}
          />
        )}
      </View>
    </ScrollView>
  );
}
