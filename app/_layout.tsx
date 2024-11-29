import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("RootLayout Loaded with ");
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
