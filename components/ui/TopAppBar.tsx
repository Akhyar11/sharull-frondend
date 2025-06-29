import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { IconSymbol } from './IconSymbol';

interface TopAppBarProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
}

export default function TopAppBar({
  title,
  showBackButton = false,
  onBackPress,
  rightContent,
}: TopAppBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-surface px-4 pb-3 flex-row items-center justify-between shadow-md"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} className="mr-2 p-2">
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        {title && <Text className="text-text-primary text-xl font-bold">{title}</Text>}
      </View>
      <View>{rightContent}</View>
    </View>
  );
}
