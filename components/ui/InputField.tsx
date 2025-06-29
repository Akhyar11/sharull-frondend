import React from 'react';
import { TextInput, View, Text, TextInputProps, ColorValue } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string | null;
  placeholderTextColor?: ColorValue;
}

export default function InputField({
  label,
  error,
  style,
  ...rest
}: InputFieldProps) {
  return (
    <View className="mb-4">
      {label && <Text className="text-text-secondary text-base mb-1">{label}:</Text>}
      <TextInput
        className="border border-surface rounded-md p-2 text-lg text-text-primary"
        placeholderTextColor="#B0B8C4"
        style={style}
        {...rest}
      />
      {error && <Text className="text-error text-sm mt-1">{error}</Text>}
    </View>
  );
}
