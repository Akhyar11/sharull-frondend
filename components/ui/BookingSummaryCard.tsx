import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BookingDetail } from '@/types/api';
import StatusTag from './StatusTag';

interface BookingSummaryCardProps {
  booking: BookingDetail;
  onPress?: () => void;
}

export default function BookingSummaryCard({ booking, onPress }: BookingSummaryCardProps) {
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

  return (
    <TouchableOpacity
      key={booking.id}
      className="bg-surface rounded-md shadow-md p-4"
      onPress={onPress}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-semibold text-text-primary">
          {booking.package_data.name}
        </Text>
        <StatusTag status={booking.payment_status} />
      </View>
      <Text className="text-text-secondary text-sm mb-2">
        {formatDate(booking.booking_date)} •{" "}
        {booking.number_of_seats} people
      </Text>
      <Text className="text-primary font-bold">
        {formatPrice(booking.total_price)}
      </Text>
    </TouchableOpacity>
  );
}
