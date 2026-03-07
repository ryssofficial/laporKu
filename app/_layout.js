import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Halaman Pertama (Login Siswa) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* Halaman Login Guru */}
      <Stack.Screen name="login-guru" options={{ title: 'Login Guru', headerShown: false }} />
      
      {/* Dashboard (Setelah Login) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}