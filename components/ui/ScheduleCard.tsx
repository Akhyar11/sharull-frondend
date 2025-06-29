import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ScheduleDetail } from '@/types/api';
import { Href, router } from 'expo-router';

interface ScheduleCardProps {
  schedule: ScheduleDetail;
  onPress?: () => void;
}

export default function ScheduleCard({ schedule, onPress }: ScheduleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <TouchableOpacity
      key={schedule.id}
      className="bg-surface rounded-md p-4 border border-surface"
      onPress={onPress || (() => router.push(`/bookings/create?scheduleId=${schedule.id}` as Href))}
    >
      <Text className="text-lg font-semibold text-text-primary">Departure: {schedule.departure_date}</Text>
      <Text className="text-text-secondary">Return: {schedule.return_date}</Text>
      <Text className="text-text-secondary">Time: {schedule.departure_time}</Text>
      <Text className="text-text-secondary">Available Seats: {schedule.available_seats}</Text>
      <Text className="text-primary font-bold mt-2">{formatPrice(schedule.package_data.price)}</Text>
    </TouchableOpacity>
  );
}
