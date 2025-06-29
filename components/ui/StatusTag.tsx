import React from 'react';
import { Text, View } from 'react-native';

interface StatusTagProps {
  status: string;
}

export default function StatusTag({ status }: StatusTagProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-success text-text-primary";
      case "pending":
        return "bg-warning text-text-primary";
      case "cancelled":
        return "bg-error text-text-primary";
      default:
        return "bg-surface text-text-secondary";
    }
  };

  return (
    <View className={`px-2 py-1 rounded-full ${getStatusColor(status)}`}>
      <Text className="text-xs font-medium text-text-primary">
        {status}
      </Text>
    </View>
  );
}
