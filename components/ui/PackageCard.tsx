import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { PackageWithDestinations } from '@/types/api';
import { Href, router } from 'expo-router';

interface PackageCardProps {
  pkg: PackageWithDestinations;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <TouchableOpacity
      key={pkg.id}
      className="bg-surface rounded-md p-4 border border-surface"
      onPress={() => router.push(`/packages/${pkg.id}` as Href)}
    >
      <View className="flex-row space-x-4">
        {pkg.destinations.length > 0 &&
          pkg.destinations[0].image_id && (
            <Image
              source={{
                uri: `/file-proxy/${pkg.destinations[0].image_id}`,
              }}
              className="w-20 h-20 rounded-md"
              resizeMode="cover"
            />
          )}
        <View className="flex-1">
          <Text className="text-lg font-semibold text-text-primary mb-1">
            {pkg.name}
          </Text>
          <Text className="text-text-secondary text-sm mb-2">
            {pkg.destinations.map((d) => d.name).join(", ")}
          </Text>
          <Text className="text-primary font-bold">
            {formatPrice(pkg.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
