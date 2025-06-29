import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'error';
}

export default function Button({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) {
  const baseStyle = "rounded-md py-3 items-center";
  let variantStyle = "";

  switch (variant) {
    case 'primary':
      variantStyle = "bg-primary";
      break;
    case 'secondary':
      variantStyle = "bg-surface";
      break;
    case 'error':
      variantStyle = "bg-error";
      break;
  }

  return (
    <TouchableOpacity
      className={`${baseStyle} ${variantStyle} ${className}`}
      onPress={onPress}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-text-primary font-bold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
