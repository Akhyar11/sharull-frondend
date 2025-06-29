import { View, Text, Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <View className="mb-4">
        <Button title="Login as Customer" onPress={() => login('customer')} />
      </View>
      <Button title="Login as Admin" onPress={() => login('admin')} />
    </View>
  );
}
