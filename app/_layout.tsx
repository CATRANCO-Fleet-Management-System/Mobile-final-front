import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/services/authentication/authContext";

export default function RootLayout() {
  console.log("RootLayout Loaded with");
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="index" />
      </Stack>
    </AuthProvider>
  );
}
