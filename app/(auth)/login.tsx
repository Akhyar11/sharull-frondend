import { View, Text } from 'react-native';
import Button from '@/components/ui/Button';
import TopAppBar from '@/components/ui/TopAppBar';
import { useAuth } from '@/context/AuthContext';


export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <TopAppBar title="Login" />
      <Text className="text-2xl font-bold mt-4 mb-4 text-text-primary">Login</Text>
      <View className="mb-4">
        <Button
          title="Login as Customer"
          onPress={() => login('customer@example.com', 'password123')}
        />
      </View>
      <Button
        title="Login as Admin"
        onPress={() => login('admin@example.com', 'adminpassword')}
      />
    </View>
  );
}
