import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      <Stack.Screen name="login-guru" options={{ title: 'Login Guru', headerShown: false }} />
      
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}