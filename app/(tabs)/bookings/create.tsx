import { useLocalSearchParams, router, Href } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, ScrollView } from 'react-native';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import TopAppBar from '@/components/ui/TopAppBar';
import api from '@/services/api';
import { ScheduleDetail } from '@/types/api';
import { useAuth } from '@/context/AuthContext';

export default function CreateBookingScreen() {
  const { scheduleId } = useLocalSearchParams();
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<ScheduleDetail | null>(null);
  const [numberOfSeats, setNumberOfSeats] = useState<string>('1');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        setLoading(true);
        if (scheduleId) {
          const response = await api.get(`/user/schedules/${scheduleId}`);
          setSchedule(response.data.data);
        } else {
          setError('Schedule ID is missing.');
        }
      } catch (err: any) {
        console.error('Error fetching schedule details:', err);
        setError(err.response?.data?.msg || 'Failed to load schedule details.');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDetails();
  }, [scheduleId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBooking = async () => {
    if (!schedule || !user) {
      Alert.alert('Error', 'Schedule or user data is missing.');
      return;
    }

    const seats = parseInt(numberOfSeats, 10);
    if (isNaN(seats) || seats <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of seats.');
      return;
    }

    if (seats > schedule.available_seats) {
      Alert.alert('Not Enough Seats', `Only ${schedule.available_seats} seats available.`);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/user/bookings', {
        schedule_id: schedule.id,
        number_of_seats: seats,
        notes: notes,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Booking created successfully!');
        router.replace(`/bookings/${response.data.data.id}` as Href); // Navigate to booking detail
      } else {
        setError(response.data.msg || 'Failed to create booking.');
      }
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.response?.data?.msg || 'Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-text-secondary">Loading schedule details...</Text>
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

  if (!schedule) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-text-secondary text-lg">Schedule not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <TopAppBar title="Create Booking" showBackButton={true} onBackPress={() => router.back()} />
      <View className="bg-surface rounded-md shadow-md p-4 mb-4">
        <Text className="text-2xl font-bold text-text-primary mb-2">{schedule.package_data.name}</Text>
        <Text className="text-lg text-text-secondary mb-1">Departure: {schedule.departure_date} at {schedule.departure_time}</Text>
        <Text className="text-lg text-text-secondary mb-1">Return: {schedule.return_date}</Text>
        <Text className="text-lg text-text-secondary mb-1">Available Seats: {schedule.available_seats}</Text>
        <Text className="text-xl font-bold text-primary mt-2">Price per person: {formatPrice(schedule.package_data.price)}</Text>
      </View>

      <View className="bg-white rounded-lg shadow-md p-4">
        <Text className="text-xl font-bold text-text-primary mb-4">Booking Details</Text>

        <InputField
          label="Number of Seats"
          keyboardType="numeric"
          value={numberOfSeats}
          onChangeText={setNumberOfSeats}
          placeholder="e.g., 2"
          error={error}
        />

        <InputField
          label="Notes (optional)"
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any special requests or notes?"
        />

        <Button
          title="Confirm Booking"
          onPress={handleBooking}
          loading={submitting}
          disabled={submitting}
        />
      </View>
    </ScrollView>
  );
}
