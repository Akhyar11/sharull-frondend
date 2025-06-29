import { Stack, useLocalSearchParams, router, Href } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import api from '@/services/api';
import { BookingDetail, PaymentMethod } from '@/types/api';
import TopAppBar from '@/components/ui/TopAppBar';
import Button from '@/components/ui/Button';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePaymentScreen() {
  const { bookingId } = useLocalSearchParams();
  const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentProof, setPaymentProof] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (bookingId) {
          const bookingResponse = await api.get(`/user/bookings/${bookingId}`);
          setBookingDetail(bookingResponse.data.data);

          const paymentMethodsResponse = await api.get('/user/payment-methods');
          setPaymentMethods(paymentMethodsResponse.data.list);
        } else {
          setError('Booking ID is missing.');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.msg || 'Failed to load payment data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPaymentProof(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handlePayment = async () => {
    if (!bookingDetail || !selectedPaymentMethod || !paymentProof) {
      Alert.alert('Error', 'Please select a payment method and upload proof.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/user/payments', {
        booking_id: bookingDetail.id,
        payment_method_id: selectedPaymentMethod,
        amount: bookingDetail.total_price,
        payment_proof: paymentProof,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Payment submitted successfully!');
        router.replace(`/bookings/${bookingDetail.id}` as Href); // Navigate back to booking detail
      } else {
        setError(response.data.msg || 'Failed to submit payment.');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.response?.data?.msg || 'Failed to submit payment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-text-secondary">Loading payment data...</Text>
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
    <ScrollView className="flex-1 bg-background p-4">
      <TopAppBar title="Make Payment" showBackButton={true} onBackPress={() => router.back()} />
      <View className="bg-surface rounded-md shadow-md p-4 mb-4">
        <Text className="text-2xl font-bold text-text-primary mb-2">Payment for: {bookingDetail.package_data.name}</Text>
        <Text className="text-lg text-text-secondary mb-1">Total Amount: {formatPrice(bookingDetail.total_price)}</Text>
      </View>

      <View className="bg-surface rounded-md shadow-md p-4 mb-4">
        <Text className="text-xl font-bold text-text-primary mb-4">Select Payment Method</Text>
        {paymentMethods.length > 0 ? (
          <View className="space-y-3">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`p-4 rounded-md border ${selectedPaymentMethod === method.id ? 'border-primary' : 'border-surface'}`}
                onPress={() => setSelectedPaymentMethod(method.id)}
              >
                <Text className="text-lg font-semibold text-text-primary">{method.name}</Text>
                <Text className="text-text-secondary">{method.account_name} ({method.account_number})</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text className="text-text-secondary">No payment methods available.</Text>
        )}
      </View>

      <View className="bg-surface rounded-md shadow-md p-4 mb-4">
        <Text className="text-xl font-bold text-text-primary mb-4">Upload Payment Proof</Text>
        <Button title="Choose Image" onPress={pickImage} />
        {paymentProof && (
          <Image source={{ uri: paymentProof }} className="w-full h-48 mt-4 rounded-md" resizeMode="contain" />
        )}
      </View>

      <Button
        title="Submit Payment"
        onPress={handlePayment}
        loading={submitting}
        disabled={submitting}
      />
    </ScrollView>
  );
}
