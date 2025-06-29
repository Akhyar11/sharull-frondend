import { useLocalSearchParams, router, Href } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import api from '@/services/api';
import { PackageWithDestinations, ScheduleDetail } from '@/types/api';
import ScheduleCard from '@/components/ui/ScheduleCard';
import TopAppBar from '@/components/ui/TopAppBar';

export default function PackageDetailScreen() {
  const { id } = useLocalSearchParams();
  const [packageDetail, setPackageDetail] = useState<PackageWithDestinations | null>(null);
  const [schedules, setSchedules] = useState<ScheduleDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        setLoading(true);
        const packageResponse = await api.get(`/user/packages/${id}`);
        setPackageDetail(packageResponse.data.data);

        const schedulesResponse = await api.get(`/user/packages/${id}/schedules`);
        setSchedules(schedulesResponse.data.list);
      } catch (err: any) {
        console.error('Error fetching package details:', err);
        setError(err.response?.data?.msg || 'Failed to load package details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPackageDetails();
    }
  }, [id]);

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
        <Text className="mt-4 text-text-secondary">Loading package details...</Text>
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

  if (!packageDetail) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-text-secondary text-lg">Package not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <TopAppBar title={packageDetail.name} showBackButton={true} onBackPress={() => router.back()} />
      <View className="p-4">
        {packageDetail.destinations.length > 0 && packageDetail.destinations[0].image_id && (
          <Image
            source={{ uri: `/file-proxy/${packageDetail.destinations[0].image_id}` }}
            className="w-full h-60 rounded-lg mb-4"
            resizeMode="cover"
          />
        )}

        <View className="bg-surface rounded-lg shadow-md p-4 mb-4">
          <Text className="text-3xl font-bold text-text-primary mb-2">{packageDetail.name}</Text>
          <Text className="text-xl font-semibold text-primary mb-4">{formatPrice(packageDetail.price)}</Text>
          
          <Text className="text-lg font-semibold text-text-primary mb-2">Destinations:</Text>
          <View className="flex-row flex-wrap mb-4">
            {packageDetail.destinations.map((dest) => (
              <View key={dest.id} className="bg-primary rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-text-primary text-sm">{dest.name}</Text>
              </View>
            ))}
          </View>

          <Text className="text-lg font-semibold text-text-primary mb-2">Description:</Text>
          {packageDetail.descriptions.map((desc, index) => (
            <Text key={index} className="text-text-secondary mb-2">{desc.text}</Text>
          ))}
        </View>

        <View className="bg-white rounded-lg shadow-md p-4">
          <Text className="text-2xl font-bold text-text-primary mb-4">Available Schedules</Text>
          {schedules.length > 0 ? (
            <View className="space-y-3">
              {schedules.map((schedule) => (
                <ScheduleCard key={schedule.id} schedule={schedule} />
              ))}
            </View>
          ) : (
            <Text className="text-text-secondary">No schedules available for this package.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
