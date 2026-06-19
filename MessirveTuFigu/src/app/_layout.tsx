import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#131313' },
        }}
        initialRouteName="home"
      >
        {/* <Stack.Screen name="index" /> */}
        {/* <Stack.Screen name="deck" /> */}
        <Stack.Screen name="home" />
        <Stack.Screen name="upload" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="detail" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="loading" />
        <Stack.Screen name="empty" />
        <Stack.Screen name="success" />
      </Stack>
    </>
  );
}
